import { $api } from '~/api/api'

export const state = () => ({
  allInboxMessagesSelected: false,
  allSentMessagesSelected: false,
  unreadMessage: false,
  checkUnreadMessageHomePage: null,

  inbox: [],
  sentbox: [],

  inboxPage: 1,
  sentboxPage: 1,

  inboxPageCount: 1,
  sentboxPageCount: 1,
})

export const mutations = {
  selectInboxMessages (state, payload) {
    state.allInboxMessagesSelected = payload
  },

  selectSentMessages (state, payload) {
    state.allSentMessagesSelected = payload
  },

  CHANGE_STATUS_UNREAD_MESSAGE (state, payload) {
    state.unreadMessage = payload
  },

  SET_INBOX: (state, payload) => state.inbox = payload,
  SET_SENTBOX: (state, payload) => state.sentbox = payload,
  SET_INBOX_PAGE: (state, payload) => state.inboxPage = payload,
  SET_SENTBOX_PAGE: (state, payload) => state.sentboxPage = payload,
  SET_INBOX_PAGECOUNT: (state, payload) => state.inboxPageCount = payload,
  SET_SENTBOX_PAGECOUNT: (state, payload) => state.sentboxPageCount = payload,
  CHECK_UNREAD_MESSAGE: (state, payload) => state.checkUnreadMessageHomePage = payload
}

export const actions = {
  fetchInbox ({ commit }, page) {
    $api
      .getMessageThreads('inbox', page || 1)
      .then(({ data: { result } }) => {
        commit('SET_INBOX', result.items)
        commit('SET_INBOX_PAGECOUNT', result.total_pages)

        if (page) {
          commit('SET_INBOX_PAGE', page)
        }
      })
  },

  fetchSentbox ({ commit }, page) {
    $api
      .getMessageThreads('sentbox', page || 1)
      .then(({ data: { result } }) => {
        commit('SET_SENTBOX', result.items)
        commit('SET_SENTBOX_PAGECOUNT', result.total_pages)

        if (page) {
          commit('SET_INBOX_PAGE', page)
        }
      })
  },

  checkUnreadMessage ({ commit }) {
    $api.getUnredMessage()
      .then(({ data: { result } }) => {
        commit('CHECK_UNREAD_MESSAGE', result.total_results)
      })
      .catch(e => {
        throw e
      })
      .finally(_ => {
      })
  }
}

export const getters = {
  inbox: state => state.inbox.filter(el => !!el.last_post),
  sentbox: state => state.sentbox.filter(el => !!el.last_post),
  inboxPage: state => state.inboxPage,
  sentboxPage: state => state.sentboxPage,
  inboxPageCount: state => state.inboxPageCount,
  sentboxPageCount: state => state.sentboxPageCount,
  setUnreadMessageStatus: state => state.inbox.every(el => el.is_read === false),
  getCountUnreadMessage: state => state.checkUnreadMessageHomePage
}
