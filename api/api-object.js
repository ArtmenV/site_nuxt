import axios from 'axios'
import { requestConfig, buildRequestConfigAuth, buildRequestConfigAuthOnly, buildRequestConfigOptionalAuth } from './config'
import { endpoints } from './endpoints'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import Cookie from 'js-cookie'

const tokenNow = _ => {
  return Cookie.get('dpc_token')
}

const refreshToken = _ => {
  return Cookie.get('dpc_refresh-token')
}

let config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

// Refresh token
const refreshAuthLogic = failedRequest => axios.post(endpoints.refreshToken, 
  {
    refresh_token: Cookie.get('dpc_refresh-token'),
  },
  // config
).then(tokenRefreshResponse => {

  const refreshToken = tokenRefreshResponse.data.refresh_token
  const token = tokenRefreshResponse.data.token
  // 0.0003
  Cookie.set('dpc_token', token, { expires: 60 }) 
  Cookie.set('dpc_refresh-token', refreshToken, { expires: 365 })

  // context.app.$store.state.commit('user/setAccessToken', token)

  failedRequest.response.config.headers['Authorization'] = 'Bearer ' + token
  return Promise.resolve()
  })
  .catch((err) => {
    const { response: { status } } = err
    
    if (
        status === 401 
        && location.pathname !== '/login' 
        && location.pathname !== '/'
      ) {
        location.href = '/logout'
      }
      throw err
  })
  
axios.interceptors.request.use(request => {

  const token = Cookie.get('dpc_token')

  if (process.server) {
    return
  }

  if (token){
    request.headers['Authorization'] = 'Bearer ' + token
  }
  return request
}, (error) => {
  return Promise.reject(error);
})

createAuthRefreshInterceptor(axios, refreshAuthLogic)

///////////////////////////////////////

function isObjectEmpty (obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object
}

function serializeParams (params) {
  if (isObjectEmpty(params)) {
    return ''
  } else {
    let serializedQueryParams = '?'

    for (const prop in params) {
      serializedQueryParams += `${prop}=${encodeURIComponent(params[prop])}&`
    }

    return serializedQueryParams.slice(0, -1)
  }
}

function serializeObjToFormData (obj) {
  if (isObjectEmpty(obj)) {
    throw 'Error: can\'t serialize empty object'
  } else {
    const formData = new FormData()

    for (const prop in obj) {
      formData.append(prop, obj[prop])
    }

    return formData
  }
}

function convertUrl (url, params) {
  return url + serializeParams(params)
}

const postRequest = (endpoint, payload) =>
  axios.post(endpoint, JSON.stringify(payload), requestConfig)

const postRequestAuth = (endpoint, payload) =>
  axios.post(endpoint, JSON.stringify(payload), buildRequestConfigAuth())

const deleteRequestAuth = (endpoint, payload) =>
  axios.delete(endpoint, {data: payload, ...buildRequestConfigAuth()})

const patchRequest = (endpoint, payload) =>
  axios.patch(endpoint, JSON.stringify(payload), requestConfig)

const patchRequestAuth = (endpoint, payload) =>
  axios.patch(endpoint, JSON.stringify(payload), buildRequestConfigAuth())

const postRequestFormDataAuth = (endpoint, payload) =>
  axios.post(endpoint, serializeObjToFormData(payload), buildRequestConfigAuthOnly())

const getRequest = endpoint =>
  axios.get(endpoint, requestConfig)

const getRequestAuth = endpoint =>
  axios.get(endpoint, buildRequestConfigAuth())

const getRequestAuthParams = (endpoint, params) =>
  axios.get(convertUrl(endpoint, params), buildRequestConfigAuth())

const getRequestOptionalAuth = endpoint =>
  axios.get(endpoint, buildRequestConfigOptionalAuth())

const getRequestOptionalAuthParams = (endpoint, params) =>
  axios.get(convertUrl(endpoint, params), buildRequestConfigOptionalAuth())

const getRequestParams = (endpoint, params) =>
  getRequest(convertUrl(endpoint, params))

const api = {
  replaceImage: (data) =>
    postRequestFormDataAuth(endpoints.updateImage, data),
  
  updateImageData: (data) => 
    patchRequestAuth(endpoints.portfolioPhoto, data),  

  getUserTreeFolder: (data) =>
    getRequestAuthParams(endpoints.getTreeFolder, data),
  
  addPhotographFavorite: data =>
    postRequestAuth(endpoints.addPhotographerToFavorite, data),

  getPhotographFavorite: data =>
    getRequestAuthParams(endpoints.getPhotographFavorite, data),

  getUserFavoritePhoto: data =>
    getRequestAuthParams(endpoints.getUserFavoritePhoto, data),

  daletePhotoToFavorite: data =>
    deleteRequestAuth(endpoints.addPhotoToFavorite, data),

  addPhotoToFave: data =>
    postRequestAuth(endpoints.addPhotoToFavorite, data),

  getUserData: data =>
    getRequestOptionalAuthParams(endpoints.user, data),

  getPhotoForRedactor: data =>
    getRequestAuthParams(endpoints.getPhotoUploadForRedactor, data),

  getUserVotingStage: ( data ) =>
    getRequestAuthParams(endpoints.getUserVotingStage, data),

  getUnredMessage: _ => 
    getRequestAuth(endpoints.getUnredMessage),

  patchUserWatermark: (data) =>
    patchRequestAuth(endpoints.getUserWatermark, data),

  getUserWatermark: _ =>
    getRequestOptionalAuth(endpoints.getUserWatermark),

  setWatermark: (data) => 
    patchRequestAuth(endpoints.patchWatermark, data),

  renameImage: (data) =>
    patchRequestAuth(endpoints.updateNamePhoto, data),

  hideImage: (data) =>
    patchRequestAuth(endpoints.updateHideImage, data),
  
  deletePortfolioFolder: (data) =>
    deleteRequestAuth(endpoints.portfolioFolder, data),

  updatePathFolder: (data) => 
    patchRequestAuth(endpoints.updatePathFolder, data),

  updatePathImage: (data) =>
    patchRequestAuth(endpoints.updatePathImage, data),

  getAllFoldersImage: (data) =>
    getRequestAuthParams(endpoints.getAllFolderAndImagePortfolio, data),

  deletePhoto: (data) =>
    deleteRequestAuth(endpoints.deletePhoto, data),

  updateHideFolder: ( data ) =>
    patchRequestAuth(endpoints.updateHideFolder, data),

  getUserPhoto: ( data ) =>
    getRequestParams(endpoints.getPortfolioPhoto, data),

  getUserMemory: _ =>
    getRequestAuth(endpoints.getUserSizeMemory),

  getFolder: (data) =>
    getRequestAuthParams(endpoints.getContentFolder, data),

  getAllFolders: (data) =>
    getRequestParams(endpoints.getListFolder, data),

  createPortfolioFolder: (body) =>
    postRequestAuth(endpoints.portfolioFolder, body),

  updatePortfolioFolder: (body) => 
    patchRequestAuth(endpoints.portfolioFolder, body),

  createPhotoPortfolio: ({ photo, path, rescale_resolution }) =>
    postRequestFormDataAuth(endpoints.portfolioPhoto, { photo, path, rescale_resolution }),

  getAllCameras: _ => 
    getRequest(endpoints.getCameras),

  getDataEquipment: (vendor_id, type) =>
    getRequestParams(endpoints.getDataEquipment, { vendor_id: vendor_id, type: type }),

  getCurEquipmentForCard: (id) =>
    getRequestParams(endpoints.getCurEquipmentForCard, { id: id }),

  getFilterCamers: (vendors, type, order, model, page, limit) =>
    getRequestParams(endpoints.searchCams, {vendors, type, order, model, page, limit}),

  requestSignUp: payload =>
    postRequest(endpoints.user, payload),

  login: payload =>
    postRequest(endpoints.login, payload),

  getUserFields: _ =>
    getRequest(endpoints.userFields),

  emailConfirmation: uid =>
    getRequest(endpoints.emailConfirmation + '/' + uid),

  getUserInfo: id =>
    getRequestOptionalAuthParams(endpoints.user, {id: id}),

  getUserActivity: id =>
    getRequestOptionalAuthParams(endpoints.user + '/activity', {id: id}),

  getMyUserInfo: _ =>
    getRequestAuth(endpoints.user),

  uploadUserPhoto: payload =>
    postRequestFormDataAuth(endpoints.userPhotoUpload, payload),

  updateUserInfo: payload =>
    patchRequestAuth(endpoints.user, payload),

  resetPassword: payload =>
    patchRequest(endpoints.resetPassword, payload),
  
  resetPasswordRequest: payload =>
    postRequest(endpoints.resetPasswordRequest, payload),

  updateUserPreferences: payload =>
    patchRequestAuth(endpoints.userPreferences, payload),

  getUserPreferences: _ =>
    getRequestAuth(endpoints.userPreferences),

  getRecentChallengesResult: _ =>
    getRequestOptionalAuthParams(endpoints.challengesMainPage, {state: 'result'}),

  getOpenForSubmissionChallengesResult: _ =>
    getRequestOptionalAuthParams(endpoints.challengesMainPage, {state: 'submission'}),

  getOpenForVotingChallengesResult: _ =>
    getRequestOptionalAuthParams(endpoints.challengesMainPage, {state: 'voting'}),

  getChallengeEntry: id =>
    getRequestOptionalAuthParams(endpoints.challengeEntry, {id: id}),

  getChallengeEntries: (id, page) =>
    getRequestOptionalAuthParams(endpoints.challengeEntries, {id: id, page: page || 1}),
  
  getChallengeMeta: id =>
    getRequestOptionalAuthParams(endpoints.challengesMeta, {ids: id}),
  
  getChallengeEntryVotingBreakdown: id =>
    getRequestOptionalAuthParams(endpoints.challengeEntryVotingBreakdown, {id: id}),

  makeVote: payload =>
    postRequestAuth(endpoints.challengeVote, payload),
  
  uploadPhoto: payload =>
    postRequestFormDataAuth(endpoints.photoUpload, payload),
  
  setChallengeMeta: payload =>
    postRequestAuth(endpoints.challengePhoto, payload),

  updateChallengeMeta: payload =>
    patchRequestAuth(endpoints.challengePhoto, payload),

  getSubmittedEntry: id =>
    getRequestAuthParams(endpoints.subbmitedEntry, {challenge_id: id}),
  
  getLatestForumThreads: _ =>
    getRequestOptionalAuthParams(endpoints.forumThreads, {limit: 10}),
  
  getThreadPosts: (id, page) =>
    getRequestOptionalAuthParams(endpoints.forumPosts, {
      thread_id: id,
      page: page || 1,
      limit: 10
    }),
  
  deleteChallengeSubmission: id =>
    deleteRequestAuth(endpoints.photoRemove, {id: id}),
  
  makeForumPost: payload => 
    postRequestAuth(endpoints.post, payload),

  getPost: id =>
    getRequestOptionalAuthParams(endpoints.post, {id: id}),

  updatePost: payload =>
    patchRequestAuth(endpoints.post, payload),

  getMessageThreads: (type, page) =>
    getRequestAuthParams(endpoints.messageThreads, {type, page}),

  getForumCategories: _ =>
    getRequestOptionalAuth(endpoints.forumCategories),

  getForumSections: id =>
    getRequestOptionalAuthParams(endpoints.forumSections, {category_id: id}),
  
  getForumThreads: id =>
    getRequestOptionalAuthParams(endpoints.forumThreads, {section_id: id}),

  createPMThread: payload =>
    postRequestAuth(endpoints.messageThread, payload),
  
  searchUsers: username =>
    getRequestAuthParams(endpoints.users, { username }),
  
  addUsersToPM: payload =>
    patchRequestAuth(endpoints.messageThreadUsers, payload),

  makeForumThread: payload =>
    postRequestAuth(endpoints.forumThread, payload),

    // getNewToken: 
}

export default api
