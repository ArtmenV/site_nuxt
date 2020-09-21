<template>
  <div class="thread-page" v-loading="loading">
      <div class="dpc-breadcrumb">
        <nuxt-link
          class="link link--bold"
          to="/forums"
        >
          DPChallenge Forums
        </nuxt-link>

        >>

        <nuxt-link
          class="link link--bold"
          :to="'/threads?section_id=' + section.id"
        >
          {{ section.name }}
        </nuxt-link>

        >>

        <span class="text--bold">
          {{ title }}
        </span>
      </div>

    <thread
      :posts="posts"
      :thread-id="threadId || -1"
      :pagination="pagination"
      @new-post="getPosts(pagination ? pagination.page : 1)"
      @post-changed="handlePostChanged"
      @remove-quote="handleQuoteRemove"
      @page-change="page => getPosts(page, 'gotop')"
    />
  </div>
</template>

<script>
import Thread from '@/components/custom/Forum/Thread'
export default {
  components: {
    Thread
  },
  data () {
    return {
      posts: [],
      title: 'Loading...',
      threadId: null,
      loading: false,
      pagination: undefined,
      section: {}
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    getPosts (page, gotop) {
      this.loading = true
      
      this.$api
        .getThreadPosts(this.$route.query.id, page || 1)
        .then(({ data: { result } }) => {
          this.posts.length = 0

          this.section = result.section

          const { posts } = result
          
          posts.items.forEach(el => {
            this.posts.push(el)
          })

          this.threadId = result.thread_id

          this.title = result.thread_title

          this.pagination = {
            perPage: posts.items_per_page,
            page: posts.page,
            total_pages: posts.total_pages,
            totalResults: posts.total_results
          }

          if (gotop) {
            window.scrollTo(0, 0)
          }
        })
        .finally(_ => {
          this.loading = false
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
.thread-page {
  width: 600px;
  margin: 0 auto;

  padding-bottom: 30px;

  .header {
    margin-top: 20px;
    margin-bottom: 15px;
    font-size: 18px;
  }
}

@media (max-width: 680px) {
  .thread-page {
    width: 100% 
  }
}
</style>

<style lang="scss" scoped>
.thread-page {
  .dpc-breadcrumb {
    margin-bottom: 1.5rem;
    .link {
      font-size: 16px;
    }
  }
}
</style>
