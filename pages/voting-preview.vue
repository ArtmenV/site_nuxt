<template>
  <div
    class="voting-container"
    v-loading="loading"
  >
    <entry
      v-if="entry.thumbnail"
      :entry="entry"
      @page-change="getEntry"
    />

    <el-rate
      class="rate"
      :max="10"
      v-model="vote"
      v-loading="voteLoading"
      @change="makeVote"
    />
    <div class="preview_voiting--error_star">
      <span><strong>{{ errorStar }}</strong></span>
    </div>

    <!-- <div 
      class="comment-container"
    >
      <comment
        v-if="isAuthorized"
      />

      <add-to-favorites />
    </div> -->

    <div class="posts-container">
      <!-- <TipTopEditor
      
      /> -->
      <!-- <thread
        type="challenge-entry"
        :posts="posts"
        :thread-id="entry.thread_id"
        :pagination="pagination"
        @new-post="entry.thread_id ? getThreadPosts() : getEntry()"
        @post-changed="handlePostChanged"
        @remove-quote="handleQuoteRemove"
        @page-change="page => getThreadPosts(page)"
        v-loading="loadingThread"
      /> -->
      <!-- <el-button
        plain
        type="primary"
        @click="handleSubmitClick"
        :loading="loading"
      >
        {{ buttonText }}
      </el-button> -->
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
    TipTopEditor: () => import(`~/components/custom/TipTopEditor`),
    Thread
  },

  computed: {
    ...mapGetters([ 'isAuthorized' ])
  },

  data () {
    return {
      vote: 0,
      oldVote: 0,
      voteLoading: false,
      posts: [],
      entry: {},
      threadId: {},
      pagination: {},
      loading: false,
      loadingThread: false,
      errorStar: '',
    }
  },

  mounted () {
    this.getEntry()
  },

  methods: {
    getEntry (id) {
      this.loading = true

      const photo_id = id || this.$route.query.id

      this.$api
        .getChallengeEntry(photo_id)
        .then(({ data: { result } }) => {
          this.entry = {}

          this.entry = result

          for (const prop in result) {
            this.$set(this.entry, prop, result[prop])
          }

          this.vote = result.user_vote || 0
        })
        .finally(_ => {
          this.loading = false

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

      this.$api
        .makeVote({
          photo_id: this.$route.query.id,
          score: this.vote
        })
        .then(({ data }) => {
          if (this.entry.next_entry) {
            this.$router.push('/voting?id=' + this.entry.next_entry.photo_id)
            this.getEntry(this.entry.next_entry.photo_id)
          }
        })
        .catch(e => {
          this.errorStar = "You can't vote on Preview image page"

          this.vote = this.oldVote
        })
        .finally(_ => {
          this.voteLoading = false
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
    }
  }
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

  .preview_voiting--error_star {
    color: #c1020f;
    display: flex;
    justify-content: center;
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
