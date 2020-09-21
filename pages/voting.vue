<template>
  <div
    class="voting-container"
    v-loading="loading"
  >
    <entry
      v-if="entry.thumbnail"
      :entry="entry"
      @page-change="getEntry"
      @dataEditor="dataEditor(true)"
    />

    <el-rate
      class="rate"
      :max="10"
      v-model="vote"
      v-loading="voteLoading"
      @change="makeVote"
    />

    <!-- <div 
      class="comment-container"
    >
      <comment
        v-if="isAuthorized"
      />

      <add-to-favorites />
    </div> -->

    <div class="posts-container">
      <thread
        :key="keyData"
        type="challenge-entry"
        :posts="posts"
        :thread-id="entry.thread_id"
        :pagination="pagination"
        @new-post="entry.thread_id ? getThreadPosts() : getEntry()"
        @post-changed="handlePostChanged"
        @remove-quote="handleQuoteRemove"
        @page-change="page => getThreadPosts(page)"
        v-loading="loadingThread"
        :lastActivePostText="lastActivePostText"
        :makeVotePostForEditor="makeVotePostForEditor"
        :dataInEditorForPagination="dataInEditorForPagination"
        :entry="entry.id"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import { Rate, Button } from 'element-ui'

import { Thread } from '@/components/custom/Forum'

import { mapGetters } from 'vuex'

Vue.use(Rate)
Vue.use(Button)

export default {
  meta: {
    authRequired: true
  },
  
  components: {
    Entry: () => import('~/components/custom/Entry'),
    Comment: () => import('~/components/custom/Comment'),
    AddToFavorites: () => import('~/components/custom/AddToFavorites'),
    Thread
  },

  computed: {
    ...mapGetters([ 'isAuthorized' ])
  },

  data () {
    return {
      keyData: 1,
      vote: 0,
      oldVote: 0,
      voteLoading: false,
      posts: [],
      entry: {},
      threadId: {},
      pagination: {},
      loading: false,
      loadingThread: false,
      lastActivePostText: '',
      makeVotePostForEditor: false,
      dataInEditorForPagination: false,

      listVoting: null,
    }
  },

  mounted () {
    this.getEntry()
    this.listVoting =  JSON.parse(localStorage.getItem('data'))
  },

  beforeDestroy () {
    this.lastActivePostText = ''
    this.posts = null
  },

  methods: {
    getEntry (id) {
      this.loading = true
      this.lastActivePostText = ''

      const photo_id = id || this.$route.query.id
      this.$api
        .getChallengeEntry(photo_id)
        .then(({ data: { result } }) => {
          this.entry = {}

          if (!result.is_photo_in_voting) {
            this.$router.push('/entry?id=' + photo_id)
          }

          this.entry = result
          console.log(' this.entry', result)

          for (const prop in result) {
            this.$set(this.entry, prop, result[prop])
          }

          this.vote = result.user_vote || 0
        })
        .finally(_ => {
          this.loading = false
          this.lastActivePostText = '',
          this.makeVotePostForEditor = false

          if (this.entry.thread_id) {
            this.getThreadPosts()
          } else {
            this.posts = []
          }
        })
    },
    getThreadPosts (page) {
      this.loadingThread = true

      this.$api
        .getThreadPosts(this.entry.thread_id, page || 1)
        .then(({ data: { result } }) => {
          this.posts.length = 0

          const { posts } = result

          posts.items.forEach(el => {
            this.posts.push(el)
          })

          this.pagination = {
            perPage: posts.items_per_page,
            page: posts.page,
            totalPages: posts.total_pages,
            totalResults: posts.total_results
          }
        })
        .finally(_ => {
          this.loadingThread = false
        })
    },
    makeVote () {
      this.voteLoading = true
      this.lastActivePostText = ''

      this.$api
        .makeVote({
          photo_id: this.$route.query.id,
          score: this.vote
        })
        .then(({ data }) => {
          
          this.makeVotePostForEditor = true
          // if (this.entry.next_entry) {
          //   // debugger
            // this.$router.push('/voting?id=' + this.getNextImage.id)
            // this.getEntry(this.getNextImage.id)
          // } else {
            // debugger
            // this.getThreadPosts()
            this.$router.push('/voting?id=' + this.getNextImage.id)
            this.getEntry(this.getNextImage.id)
          // }
        })
        .catch(e => {
          throw e
          this.vote = this.oldVote
        })
        .finally(_ => {
          this.voteLoading = false
          this.makeVotePostForEditor = false
          this.lastActivePostText = ''
          this.posts = []
          // this.getThreadPosts()
        })
    },
    handlePostChanged (post) {
      this.posts
        .filter(el => el.id == post.id)[0]
        .text = post.text
    },
    handleQuoteRemove (postId) {
      const post = this.posts.filter(el => el.id == postId)[0]

      post.text = post.text.replace(/^\${\d+}/, '')
    },

    dataEditor (data) {
      // debugger
      this.makeVotePostForEditor = data
    }
  },

  computed: {
    getArrayWithIndex () {
      return this.listVoting.map((item, index) => {
          return {
            ...item,
            id_pagination: index + 1,
          }     
        })
    },

    getCurrentImageObject () {
      return this.getArrayWithIndex.find(item => item.id == this.id)
    },

    getNextImage () {
      if (this.getArrayWithIndex.length == this.getCurrentImageObject.id_pagination) {
        return this.getArrayWithIndex.find(item => item.id_pagination == 1)
      } else {
        return this.getArrayWithIndex.find(item => item.id_pagination == this.getCurrentImageObject.id_pagination + 1)
      }
    },

    id () {
      return this.$route.query.id
    },

    // getPrevImage () {
    //   const lengthArray = (this.getArrayWithIndex.length)
    //   if (this.getCurrentImageObject.id_pagination == 1) {
    //     return this.getArrayWithIndex.find(item => item.id_pagination == lengthArray)
    //   } else {
    //     return this.getArrayWithIndex.find(item => item.id_pagination == (this.getCurrentImageObject.id_pagination - 1))
    //   }
    // },
  },

  watch: {
    posts: {
    handler: function (val) {
      if ( val.length !== 0 ) {
        const data =  val[val.length - 1]
        this.lastActivePostText = data.text
      } else {
        this.keyData++
        this.lastActivePostText = ""
      }
    },
    deep: true
    }
  },
  
}
</script>

<style lang="scss">
.voting-container {
  .el-rate {
    span:nth-of-type(5) {
      position: relative;
      margin-right: 10px;

      &::before {
        content: '';
        position: absolute;
        width: 1px;
        top: -2px;
        height: 22px;
        right: -3px;
        background: #2c2c2c6e;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.voting-container {
  max-width: 1200px;
  margin: 0 auto;

  padding-bottom: 30px;

  .rate {
    text-align: center;
    margin: 20px 0;
  }

  .posts-container,
  .comment-container {
    max-width: 600px;
    margin: 0 auto;
  }

  .posts-container {
    margin-top: 10px;
  }
}
</style>
