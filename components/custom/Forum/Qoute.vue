<template>
  <div class="quote" v-loading="loading">
    <div class="quote__from">
      Quoted from 

      <nuxt-link
        class="link link--bold"
        :to="'/profile?id=' + post.authorId"
      >
        {{ post.author }}
      </nuxt-link>
    </div>

    <div class="quote__date">
      {{ post.date }}

      <div
        class="delete-btn"
        v-if="deleteable"
        @click="$emit('remove-quote')"
      >
        <i class="el-icon-close" />
      </div>
    </div>

    <quote
      class="quote__text"
      v-if="quotedPostId"
      :post-id="quotedPostId"
    />

    <div
      class="quote__text"
      v-html="postText"
    ></div>
  </div>
</template>

<script>
import { ISOToReadableString, formatAMPM } from '~/helpers'
export default {
  name: 'quote',
  props: {
    postId: {
      type: [String, Number],
      required: true
    },
    deleteable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      post: {
        text: '',
        author: '',
        authorId: '',
        date: ''
      }
    }
  },
  computed: {
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
    }
  },
  mounted () {
    this.getPost()
  },
  methods: {
    getPost () {
      this.loading = true
      
      this.$api
        .getPost(this.postId)
        .then(({ data: { result } }) => {
          this.post.text = result.text
          this.post.author = result.creator.username
          this.post.authorId = result.creator.user_id

          let createDay = ISOToReadableString(
            result.creator.created_at, 
            {year: true, shortMonth: true}
          )

          let createTime = formatAMPM(result.creator.created_at)
          this.post.date = createDay + ' ' + createTime
          
        })
        .finally(_ => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
.quote {
  p {
    margin-bottom: 0;
  }

  .quote {
    margin: 5px 0;
  }
}
</style>

<style lang="scss" scoped>
.quote {
  display: grid;
  grid-template-columns: 2fr 1fr;

  padding: 5px 15px;

  // background-color: hsl(214, 61%, 92%);
  background-color: #f7f8fa;

  position: relative;

  border-radius: 3px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  overflow: hidden;

  // border: 1px solid hsl(212, 42%, 82%);
  border-left: none;
  
  &__date {
    margin-left: auto;
    font-size: 13px;

    .delete-btn {
      display: inline-block;

      cursor: pointer;
    }
  }

  &__from {
    font-size: 12px;
    font-weight: bold;
  }

  &__text {
    grid-column: 1 / 3;

    margin-top: 10px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    width: 2px;
    height: 100%;

    // background: hsl(213, 35%, 69%);
    background: #2172cd;
  }
}
</style>
