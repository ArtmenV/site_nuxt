<template>
  <div
    class="messaging-page"
    v-loading="loading"
  >
    <div class="header">
      Private messaging
    </div>

    <div class="messaging">
      <div class="messaging__header">
        <info-block label="Subject:">
          {{ subject }}
        </info-block>

        <info-block label="Originally From:">
          <nuxt-link
            class="link"
            :to="'/profile?id=' + creatorId"
          >
            {{ creator }}
          </nuxt-link>
        </info-block>

        <info-block label="To:">
          <span
            v-for="(user, index) in participants"
            :key="user.user_id"
          >{{ index ? ', ' : '' }}
            <nuxt-link
              class="link"
              :to="'/profile?id=' + user.user_id"
            >{{ user.username }}</nuxt-link>            
          </span>
          
          <add-user
            @user-added="user => participants.push(user)"
          />
        </info-block>
      </div>

      <thread
        v-if="typeof threadId !== 'object'"
        type="pm"
        :posts="posts"
        :thread-id="threadId"
        :pagination="pagination"
        @new-post="getThread()"
        @post-changed="handlePostChanged"
        @remove-quote="handleQuoteRemove"
        @page-change="page => getThread(page)"
        v-loading="loading"
      />
    </div>
  </div>
</template>

<script>
import InfoBlock from '~/components/custom/InfoBlock.vue'
import { Thread } from '@/components/custom/Forum'
import { AddUser } from '~/components/custom/Messages'
export default {
  components: {
    InfoBlock,
    Thread,
    AddUser
  },
  data () {
    return {
      loading: false,
      loadingSending: false,
      newMessage: '',
      posts: [],
      pagination: {},
      threadId: {},
      subject: 'Loading...',
      creator: 'Loading...',
      participants: [],
      creatorId: null
    }
  },
  mounted () {
    if (this.$route.query.user_ids) {
      const ids = this.$route.query.user_ids
        .split(',')
        .map(el => +el)

      this.createThread(ids)
    } else if (this.$route.query.thread_id) {
      this.threadId = this.$route.query.thread_id
      this.getThread()
    }
  },
  methods: {
    getThread (page) {
      this.loading = true

      const thread_id = this.$route.query.thread_id || this.threadId

      this.$api
        .getThreadPosts(thread_id, page || 1)
        .then(({ data: { result } }) => {
          this.posts = []

          const { posts } = result
          
          result.posts.items.forEach(el => {
            this.posts.push(el)
          })

          this.pagination = {
            perPage: posts.items_per_page,
            page: posts.page,
            total_pages: posts.total_pages,
            totalResults: posts.total_results
          }
          
          this.participants = [...result.participants]

          this.subject = result.thread_title
          this.creator = result.thread_creator_username
          this.creatorId = result.thread_creator_id
        })
        .finally(_ => {
          this.loading = false
        })
    },
    createThread (ids) {
      this.$prompt('Please enter thread\'s subject', 'Subject')
        .then(({ value }) => {
          this.$api
            .createPMThread({
              user_ids: ids,
              title: value
            })
            .then(({ data: { result } }) => {
              this.$router.push('/messaging?thread_id=' + result.thread_id)
              this.threadId = result.thread_id
              this.getThread()
            })
        })
        .catch(({ response }) => {
          this.$router.go(-1)
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
.messaging-page {
  .ck.ck-toolbar,
  .ck-blurred.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline {
    border-left: none;
    border-right: none;
  }
}
</style>

<style lang="scss" scoped>
.messaging-page {
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 30px;

  .header {
    margin-top: 20px;
    margin-bottom: 15px;
    font-size: 18px;
  }

  .messaging {
    background: #ffffff;
    border: 1px solid #c4c4c4;
    border-radius: 3px;
    max-width: 100%;
    overflow: hidden;

    &__header {
      padding: 10px;
      padding-top: 10px;
      border-bottom: 1px solid #c4c4c4;

      display: grid;
      grid-row-gap: 5px;
    }

    &__table {
      .message {
        display: grid;
        grid-row-gap: 5px;

        padding: 10px;

        border-bottom: 1px solid #c4c4c4;

        &__top {
          display: flex;
          justify-content: space-between;
          
          .user {
            display: grid;
            grid-template-columns: 40px 1fr;
            grid-column-gap: 10px;

            &__avatar {
              grid-row: 1 / 3;

              border-radius: 100%;

              background: hsl(216, 38%, 47%);
              background: var(--ava);
              background-position: center center;
              background-size: cover;
              
              width: 40px;
              height: 40px;
            }
          }

          .actions {
            display: flex;

            &__quote {
              margin-right: 10px;
            }
          }
        }
      }
    }

    &__new-message {
      padding-top: 10px;

      .new-message {
        padding: 0 10px;
      }

      .actions {
        padding: 10px;
      }
    }
  }
}

@media (max-width: 650px) {
  .actions {
    padding: 10px;
    padding-top: 0;
    flex-wrap: wrap;
    // align-items: flex-start;
    justify-content: flex-end;

    &__reply-pr {
      text-align: right;
    }
  }
}
</style>
