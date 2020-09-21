const cookieparser = process.server ? require('cookieparser') : undefined
// import Cookie from 'js-cookie'

const actions = {
  /**
   * gets tokens from cookies on server-side
   */
  nuxtServerInit ({ commit }, { req }) {
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        commit('user/setAccessToken', parsed.dpc_token || '')
        commit('user/setRefreshToken', parsed['dpc_refresh-token'] || '')
        commit('user/setUserId', parsed.id || '')
        commit('user/setAvatar', parsed.user_image || '')
        commit('user/setUserName', parsed['username'] || '')
      } catch (err) {
        // No valid cookie found
        throw err
      }
    }
  }
}

const getters = {
  isAuthorized: state => !!state.user.accessToken && state.user.accessToken !== 'undefined',
  userId: state => state.user.userId
}

export {
  actions,
  getters
}
