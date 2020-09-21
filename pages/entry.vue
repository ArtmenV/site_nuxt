<template>
  <div
    class="entry-page"
    v-loading="loading"
  >
    <entry
      pagination
      :entry="entry"
      v-if="gotEntry"
      @page-change="getEntryInfo"
    />

    <!-- entry details -->
    <div class="entry-page__entry-details">
      <entry-details
        member
        :entry="entry"
        v-if="gotEntry"
      />
    </div>

    <!-- <add-to-favorites /> -->

    <div class="posts-container">
      <thread
        type="challenge-entry"
        :posts="posts"
        :thread-id="entry.thread_id"
        :pagination="pagination"
        @new-post="entry.thread_id ? getThreadPosts() : getEntryInfo()"
        @post-changed="handlePostChanged"
        @remove-quote="handleQuoteRemove"
        @page-change="page => getThreadPosts(page)"
        v-loading="loadingThread"
      />
    </div>
  </div>
</template>

<script>
import { Thread } from '~/components/custom/Forum'
import EntryDetails from '~/components/custom/EntryDetails'
import Entry from '~/components/custom/Entry'
import Comment from '~/components/custom/Comment'
import AddToFavorites from '~/components/custom/AddToFavorites'
import { mapGetters } from 'vuex'

export default {
  components: {
    Entry,
    Comment,
    AddToFavorites,
    Thread,
    EntryDetails
  },

  computed: {
    entryId () {
      return this.$route.query.id
    },

    ...mapGetters([ 'isAuthorized' ])
  },

  data () {
    return {
      entry: {},
      threadId: {},
      posts: [],
      pagination: {},
      gotEntry: false,
      loading: false,
      loadingThread: false
    }
  },

  mounted () {
    this.getEntryInfo()
  },

  methods: {
    getEntryInfo () {
      this.loading = true

      this.gotEntry = false
      this.$api
        .getChallengeEntry(this.entryId)
        .then(({ data: { result } }) => {
          this.entry = {}

          for (const prop in result) {
            this.$set(this.entry, prop, result[prop])
          }

          this.gotEntry = true
        })
        .catch(({ response }) => {
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

<style lang="scss" scoped>
.entry-page {
  max-width: 1200px;
  margin: 0 auto;

  padding-bottom: 30px;

  &__entry-details {
    max-width: 600px;
    margin: 20px auto;
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
