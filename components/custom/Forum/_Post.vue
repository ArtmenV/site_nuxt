<template>
  <div
    class="post"
    :class="{'post--pm': privateMessage}"
  >
    <div class="post__header">
      <div class="header">
        <div
          v-if="post.creator_thumbnail"
          class="header__avatar"
          :style="{'--ava': `url(${$api.resolveImageUrl(post.creator_thumbnail)})`}"
        ></div>

        <i
          v-else
          class="el-icon-user header__avatar-placeholder"
        />

        <nuxt-link
          class="header__author link"
          :to="'/profile?id=' + post.creator_id"
        >
          {{ post.creator_username }} 
        </nuxt-link> 

        <div class="header__date">
          <div class="post__time">
            <div>
              &nbsp; {{ prettyDate(post.created_at) }}
            </div> 
            <div class="post__time-item"> 
              &nbsp; {{ prettyTime(post.created_at) }} 
            </div>
          </div>
          <div
            v-if="isAuthorized && post.creator_id == userId" 
            @click="editing = true"
          >

            <!-- <font-awesome-icon 
              :icon="['fas', 'edit']" 
              class="edit"
            /> -->

            <el-button 
              class="edit"
              type="text" 
              icon="el-icon-edit" 
            /> 
            <!-- <i class="el-icon-edit edit" /> -->
          </div>
        </div>
      </div>
    </div>

    <quote
      class="post__body"
      v-if="quotedPostId && !editing"
      :post-id="quotedPostId"
    />

    <div
      v-if="!editing"
      class="post__body"
      v-html="postText"
    />

    <edit-post
      v-else
      class="post__body"
      editing
      :value="{text: postText, postId: post.id}"
      :editValue="postText"
      :quoted-post-id="quotedPostId"
      @post-changed="handlePostChanged"
      @remove-quote="$emit('remove-quote')"
    />

    <div class="post__footer" v-if="!editing">
      <div class="footer">
        <div class="footer__helpful" v-if="markable">
          <span class="marked">
            Photographer found comment helpful.&nbsp;
          </span>

          <span class="marking">
            (unmark)
          </span>
        </div>

        <div class="footer__actions">
          <div class="actions">
            <!-- <div class="actions__spam">
              Spam
            </div> -->

            <!-- <div class="actions__report-post">
              Report post
            </div> -->

            <div
              class="actions__quote"
              @click="$emit('quote', post.id)"
            >
              Quote
            </div>

            <a
              v-if="privateMessage && post.creator_id !== userId && !isPrivateConversation"
              class="actions__reply-private"
              :href="replyInPrivateLink"
              target="_blank"
            >
              Reply In Private
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Quote from './Qoute'
import EditPost from './NewPost'
import { ISOToReadableString, formatAMPM } from '~/helpers'
import { mapGetters } from 'vuex'

import { Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(Button)
// import { IconEdit } from 'element-ui'


// Vue.use(IconEdit)

export default {
  props: {
    post: {
      type: Object,
      required: true
    },
    markable: {
      type: Boolean,
      required: false,
      default: false
    },
    privateMessage: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    Quote,
    EditPost
  },
  computed: {
    ...mapGetters([ 'userId', 'isAuthorized' ]),
    postText () {
      return this.post.text
        .replace(/^\${\d+}/, '')
    },
    quotedPostId () {
      const { text } = this.post

      if (text.match(/^\${\d+}/)) {
        return text
          .match(/^\${\d+}/)[0]
          .slice(2, -1)
      } else {
        return undefined
      }
    },
    replyInPrivateLink () {
      if (this.privateMessage) {
        const { creator_message_thread_id } = this.post
        if (creator_message_thread_id) {
          return '/messaging?thread_id=' + creator_message_thread_id
        } else {
          return '/messaging?user_ids=' + this.post.creator_id
        }
      } else {
        return ''
      }
    },
    isPrivateConversation () {
      if (this.privateMessage) {
        const { creator_message_thread_id } = this.post
        const { thread_id } = this.$route.query

        if (creator_message_thread_id == thread_id) {
          return true
        }
      }

      return false
    }
  },

  data () {
    return {
      editing: false,
      showEditButton: '',
    }
  },
  methods: {
    prettyDate: date => ISOToReadableString(date, {year: true, shortMonth: true}),
    prettyTime: date => formatAMPM(date),

    handlePostChanged (post) {
      this.$emit('post-changed', post)

      this.editing = false
    }
  }
}
</script>

<style lang="scss">
.post {
  p {
    margin-bottom: 0;
    max-width: 100%;
    word-break: break-all;

    img {
      max-width: 180px ;
      height: auto;
      margin: 10px 10px 10px 0;
    }
  }
}
</style>

<style lang="scss" scoped>
.post {
  display: grid;
  grid-row-gap: 10px;
  max-width: 600px;

  padding: 10px;

  background: #ffffff;
  border: 1px solid #c4c4c4;
  border-radius: 3px;

  &--pm {
    border-top: none;
    border-right: none;
    border-left: none;
    border-radius: 0;
  }

  &__header {
    .header {
      display: grid;
      grid-template-columns: 60px auto auto;
      word-break: break-all;

      .post__time {
        display: flex;
        max-width: 180px;
      }

      // .post__time-item {
      //   padding-left: .5rem;
      // }

      &__avatar {
        padding: 10px;
        border-radius: 100%;

        background: hsl(216, 38%, 47%);
        background: var(--ava);
        background-position: center center;
        background-size: cover;

        width: 40px;
        height: 40px;

        display: flex;
        align-items: center;
        justify-content: center;

        color: #ffffff;
        font-size: 20px;
        font-weight: bold;
      }

      &__avatar-placeholder {
        font-size: 24px;
        padding-left:7px;
        padding-top:2px;
      }

      &__date {
        justify-content: flex-end;
        font-size: 13px;

        .edit {
          color:#63738c;
          margin-left: 5px;
          font-size: 14px;

          cursor: pointer;
        }
      }

      &__date,
      &__author {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        word-break: break-all;
      }
    }
  }

  &__body {
    max-width: 580px;
  }

  &__footer {
    .footer {
      display: flex;
      justify-content: space-between;
      padding: 3px 0;

      &::after {
        display: none;
      }

      &__actions {
        .actions {
          display: flex;

          > * {
            padding: 3px 9px;

            border-radius: 3px;

            font-size: 11px;
            font-weight: bold;

            text-transform: uppercase;
            user-select: none;

            color: white;

            &:hover {
              cursor: pointer;
            }
          }

          &__spam {
            background: hsl(358, 59%, 47%);
          }

          &__report-post {
            background: hsl(207, 58%, 47%);

            margin-left: 10px;
          }

          &__quote {
            background: hsl(217, 17%, 47%);

            margin-left: auto;
          }

          &__reply-private {
            background: hsl(207, 58%, 47%);

            margin-left: 10px;
          }
        }
      }

      &__helpful {
        font-size: 13px;

        display: flex;
        align-items: center;

        .marking {
          text-decoration: underline;

          cursor: pointer;
        }
      }
    }
  }
}

@media (max-width: 620px) {
  .footer {
    flex-direction: column;

    &__actions {
      margin-top: 10px;
    }
  }
}

@media ( max-width: 480px ) {
  .post {
    .header {
      grid-template-columns: 60px auto auto;
      .post__time {
        display: flex;
        flex-direction: column;
        margin-right: 1rem;
      }
    }
  }
}

@media ( max-width: 380px ) {
  .post {
    .header {
      display: flex;
      justify-content: space-between;
      &__author {
        font-size: 16px;
        word-break: break-all;
      }

      &__date {
        font-size: 12px;
      }
      .post__time {
        display: flex;
        flex-direction: column;
        margin-right: 1rem;
      }
    }
  }
}

img {
  width: 220px !important;
  height: auto;
}
</style>
