import Cookie from 'js-cookie'

const state = () => ({
  accessToken: Cookie.get('dpc_token') || '',
  refreshToken: Cookie.get('dpc_refresh-token') || '',

  username: '',
  roles: [],
  userAvatarLink: '',
  userId: ''
})

export const getters = {
  userIdStore: state => state.userId,
  isAuthorizedStore: state => !!state.accessToken && state.accessToken !== 'undefined',
}

const mutations = {
  setAccessToken (state, payload) {
    state.accessToken = payload
  },

  setRefreshToken (state, payload) {
    state.refreshToken = payload
  },

  setAvatar (state, payload) {
    state.userAvatarLink = payload
  },

  setUserId (state, payload) {
    state.userId = payload
  },

  setUserName (state, payload) {
    state.username = payload
  },

  loginSave (state, payload) {
    state.refreshToken = payload.refresh_token
    state.accessToken = payload.token

    state.username = payload.result.username
    state.userId = payload.result.id
    state.userAvatarLink = payload.result.user_image

    state.roles = payload.result.roles
    
    Cookie.set('dpc_token', payload.token, {expires: 60})
    Cookie.set('dpc_refresh-token', payload.refresh_token, {expires: 60})

    Cookie.set('username', payload.result.username, {expires: 60})
    Cookie.set('user_image', payload.result.user_image, {expires: 60})
    Cookie.set('id', payload.result.id, {expires: 60})
    // debugger
    // location.reload()
  },


  login (state, payload) {
    state.refreshToken = payload.refresh_token
    state.accessToken = payload.token

    state.username = payload.result.username
    state.userId = payload.result.id
    state.userAvatarLink = payload.result.user_image

    state.roles = payload.result.roles
    
    Cookie.set('dpc_token', payload.token)
    Cookie.set('dpc_refresh-token', payload.refresh_token)

    Cookie.set('username', payload.result.username)
    Cookie.set('user_image', payload.result.user_image)
    Cookie.set('id', payload.result.id)
    // location.reload()
  },

  // userData (state, payload) {
  //   // state.refreshToken = payload.refresh_token
  //   // state.accessToken = payload.token

  //   state.username = payload.username
  //   state.userId = payload.id
  //   state.userAvatarLink = payload.user_image
  //   debugger
  //   state.roles = payload.roles
  // },

  logout (state) {

    state.refreshToken = null
    state.accessToken = null

    state.username = null
    state.userId = null
    state.userAvatarLink = null

    state.roles = null


    Cookie.remove('dpc_token')
    Cookie.remove('dpc_refresh-token')

    Cookie.remove('username', { path: '' })
    Cookie.remove('user_image', { path: '' })
    Cookie.remove('id', { path: '' })



    
    // localStorage.removeItem('user')

    // location.reload()
  },

  logoutSilent (state) {
    state.refreshToken = null
    state.accessToken = null

    Cookie.remove('dpc_token')
    Cookie.remove('dpc_refresh-token')

    Cookie.remove('username')
    Cookie.remove('user_image')
    Cookie.remove('id')

    state.username = null
    state.userId = null
    state.userAvatarLink = null

    state.roles = null
  }
}

export {
  state,
  mutations
}

