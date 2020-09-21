import { url, apiPrefix } from './config'

const apiUrl = url + apiPrefix

const endpoints = {
  user: apiUrl + '/user',
  passwordReset: apiUrl + '/user/password/send-reset-email',
  
  getUserVotingStage: apiUrl + '/user/activity',

  login: url + '/api/auth/login',
  refreshToken: url + '/api/auth/token/refresh',
  userFields: apiUrl + '/user/fields',
  userPhotoUpload: apiUrl + '/userpic/upload',
  emailConfirmation: url + '/email/confirmation',
  resetPasswordRequest: apiUrl + '/user/password/send-reset-email',
  resetPassword: apiUrl + '/user/password/reset',
  userPreferences: apiUrl + '/user/preferences',

  challengesMainPage: apiUrl + '/challenges/main-page',
  challengeEntry: apiUrl + '/photo',
  challengeEntries: apiUrl + '/challenges/entries',
  challengesMeta: apiUrl + '/challenges/meta',
  challengeEntryVotingBreakdown: apiUrl + '/photo/voting/breakdown',
  challengeVote: apiUrl + '/challenge/vote',
  challengePhoto: apiUrl + '/challenge/photo',
  photoUpload: apiUrl + '/photo/upload',
  photoRemove: apiUrl + '/photo/remove',
  subbmitedEntry: apiUrl + '/challenge/submission',

  forumThreads: apiUrl + '/forum/threads',
  forumThread: apiUrl + '/forum/thread',
  forumCategories: apiUrl + '/forum/categories',
  forumSections: apiUrl + '/forum/sections',
  forumPosts: apiUrl + '/forum/posts',
  post: apiUrl + '/post',
  messageThreads: apiUrl + '/message/threads',
  messageThread: apiUrl + '/message/thread',
  messageThreadUsers: apiUrl + '/message/thread/users',

  getCameras: apiUrl + '/vendors',
  getDataEquipment: apiUrl + '/equipments',
  getCurEquipmentForCard: apiUrl + '/equipment',
  users: apiUrl + '/usernames',
  searchCams: apiUrl + `/equipments/search`,

  portfolioPhoto: apiUrl + `/photo`,
  portfolioFolder: apiUrl + `/portfolio/folder`,
  getListFolder: apiUrl + `/folder/folders`,
  getUserSizeMemory: apiUrl + `/user/quota`,
  getContentFolder: apiUrl + `/folder/content`,

  getPortfolioPhoto: apiUrl + `/folder/photos`,
  updateHideFolder: apiUrl + `/folder/hide`,
  updateHideImage: apiUrl + `/photo/hide`,

  deletePhoto: apiUrl + `/photos`,
  getAllFolderAndImagePortfolio: apiUrl + '/folder/content',
  updatePathImage: apiUrl + '/photo/move',
  updatePathFolder: apiUrl + '/folder/move',
  updateNamePhoto: apiUrl + '/photo',

  patchWatermark: apiUrl + '/photos/watermark',
  getUserWatermark: apiUrl + '/user/watermark',
  getUnredMessage: apiUrl + '/messages/unread',
  getPhotoUploadForRedactor: apiUrl + '/photo',

  addPhotoToFavorite: apiUrl + '/photo/favorite',
  getUserFavoritePhoto: apiUrl + '/photos/favorite/user',

  addPhotographerToFavorite: apiUrl + '/user/favorite',
  getPhotographFavorite: apiUrl + '/user/favorites',

  getTreeFolder: apiUrl + '/folder/tree',
  updateImage: apiUrl + '/photo/image'
}

export {
  endpoints
}
