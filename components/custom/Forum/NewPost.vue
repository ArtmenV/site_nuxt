<template>
  <div
    class="new-post"
    :class="{'new-post--pm': type === 'pm'}"
  >
    <h6
      class="new-post__header"
      v-if="!editing"
    >
      {{ headerText }}   
    </h6>
    <div class="add_comment--error">
      <strong>{{ errorPost }}</strong>
    </div>

    <!-- quoted component -->
    <div
      v-if="quotedPostId"
      class="new-post__quote"
    >
      <quote
        :post-id="quotedPostId"
        deleteable
        @remove-quote="$emit('remove-quote')"
      />
    </div>
    
    <!-- tiptop extension -->
    <TipTopEditor
      :key="keyData"
      :clearFieldEditor="clearEditor"
      @newPost="DataPost"
      :editingPost="editing"
      :editValue="editValue"
      :lastActivePostText="lastActivePostText"
    />
    <div 
      class="new-post__submit"
      v-if="$route.path !== '/voting'"
    >
      <el-button
        plain
        type="primary"
        @click="handleSubmitClick"
        :loading="loading"
      >
        {{ buttonText }}
      </el-button>
    </div>
  </div>
</template>

<script>
import Quote from './Qoute'

export default {
  props: {
    threadId: {
      type: [String, Number],
      required: false
    },
    quotedPostId: {
      type: [String, Number],
      required: false
    },
    type: {
      type: String,
      required: false,
      default: 'forum'
    },
    editing: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: Object,
      required: false
    },
    editValue: {
      type: String,
      requred: true
    },
    lastActivePostText: {
      type: String,
      required: false
    },
    makeVotePostForEditor: {
      type: Boolean,
      required: false
    },
    dataInEditorForPagination: {
      type: Boolean,
      required: false
    },
    entry: {
      type: Number,
      required: false
    },
    posts: {
      type: Array,
      required: false
    },
    photo_id: {
      type: Number,
      required: false,
    }
  },

  computed: {
    buttonText () {
      if (this.editing) {
        return 'Update Post'
      } else {
        switch (this.type) {
          case 'challenge-entry': return 'Post'
          case 'pm': return 'Send Reply'
          default: return 'Post Reply'
        }
      }
    },

    headerText () {
      switch (this.type) {
        case 'challenge-entry': return 'Add your comment!'
        case 'pm': return 'Reply Message'
        default: return 'Post Reply'
      }
    },
    sendEditData () {
      return this.value
    }
  },

  data () {
    return {
      keyData: 1,
      clearEditor: false,
      newPost: '',
      editor: null,
      linkUrl: null,
      linkMenuIsActive: false, 
      loading: false,
      errorPost: '',
        text: '',
      idPostForVoting: null,
    }
  },

  components: {
    Quote,
    TipTopEditor: () => import(`../TipTopEditor`)
  },

  mounted () {
    if (this.editing) {
      this.newPost = this.value.text
    }
  },


  methods: {
    makePost () {
      this.loading = true
      const payload = this.makePayload()
      this.$api
        .makeForumPost(payload)
        .then(({ data: { result } }) => {
          this.newPost = ''
          this.content = ''
          this.keyData++
          this.$emit('new-post')
          this.$emit('newPost')
          this.$emit('remove-quote')
        })
        .catch(e => {
          // this.errorPost = "You can't leave a comment on Preview image page"
          throw e
        })
        .finally(_ => {
          this.loading = false
        })
    },

    makePayload () {
      let text
      if (this.quotedPostId) {
        text = `\${${this.quotedPostId}}${this.newPost}`
      } else {
        text = this.newPost
      }

      if (this.editing) {
        return {
          id: this.value.postId || this.entry,
          text: text
        }
      }

      const place = {}

      if (this.threadId) {
        place.thread_id = this.threadId
      } else if (this.type === 'challenge-entry' || this.type === 'image-page') {
        place.photo_id = this.$route.query.id
      }
      return {
        ...place,
        text: text
      }
    },

    handleKeyboardSending (event) {
      if (event.ctrlKey) {
        this.handleSubmitClick()
      }
    },

    updatePost () {
      this.loading = true
      const payload = this.makePayload()

      this.$api
        .updatePost(payload)
        .then(({ data: { result } }) => {
          this.$emit('post-changed', payload)
        })
        .finally(_ => {
          this.loading = false
        })
    },

    handleSubmitClick () {
      if (!this.editing) {
        this.makePost()
        this.clearEditor = true
      } else {
        this.updatePost()
        this.clearEditor = true
      }
    },

    updatePostVoting () {
      this.loading = true
      const payload = {
        id: this.idPostForVoting,
        text: this.newPost
      }
      this.$api
        .updatePost(payload)
        .then(({ data: { result } }) => {
          this.$emit('post-changed', payload)
          this.newPost = ''
          this.content = ''
          this.keyData++
        })
        .finally(_ => {
          this.loading = false
        })
    },

    DataPost (data) {
      this.newPost = data
    },
  },

  watch: {
    makeVotePostForEditor (val) {
      if ( val === true && !this.posts.length ) {
        this.makePost()
      } 
      if ( val === true 
        && this.posts.length 
        && this.newPost !== ''
        ) {
        this.updatePostVoting()
      } else {
        return false
      }
    },

    posts (val) {
      if ( val.length ) {
        this.idPostForVoting = val[val.length - 1].id
      }
    },
  }
}
</script>

//css for tiptop
<style lang="scss">
  .ProseMirror {
    height: 100%;
    width: 100%;

    p {
      margin-bottom: 0px;
    }

    a {
      cursor: pointer
    }
  }

blockquote {
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 5px 15px;
  background-color: #f7f8fa;
  position: relative;
  border-radius: 3px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  overflow: hidden;
  border-left: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background: #2172cd;
  }
}
</style>

<style lang="scss" scoped>
.page {
  display: none;
  width: 1200px;
}
.new-post {

  &--pm {
    .new-post__submit,
    .new-post__quote,
    .new-post__header {
      margin-left: 10px;
    }
  }

  &__submit {
    margin-top: 10px;
  }

  &__quote {
    margin-bottom: 10px;
  }
  .add_comment--error {
    color: #c1020f;
    margin-bottom: .25rem;
  }
}

//tiptop -------
.editor {
  background-color: #fff;
  border: 1px solid silver;

  .menubar {
    background-color: rgb(233, 233, 233);
    padding: 4px;
    border-bottom: 1px solid silver;

    .is-active {
      color: #2172cd
    }

    .menubar__button_image {
      width: 25px;
      height: 25px;
      background-color: #fff;
      padding: 3px;
      border: none;
      cursor: pointer;
      margin-left: 10px;

      .icon_button {
        margin: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .menubar__button {
      width: 25px;
      height: 25px;
      background-color: #fff;
      padding: 3px;
      border: none;
      cursor: pointer;
      margin-top: 2px;

      .icon_button {
        margin: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  
  .editor__container {
    height: 180px;
    display: block;
    box-sizing: border-box;
    overflow: auto;
  }

    .input__link {
      display: flex;
      margin-top: 4px;
      margin-bottom: 2px;

    .menububble__input {
      border-radius: 2px;
      border: 1px solid silver;
      padding: 3px;
      padding-left: 8px;
      height: 25px;
    }

    .menubar__button-check {
      background-color: #ebebeb !important;
      border: none;
      margin-left: 7px;
      cursor: pointer;
    }

    .icon_button-check {
      color: green;
    }

    .icon_button-times {
      color: red
    }

    .menubar__button-times {
      width: 27px;
      background-color: #ebebeb !important;
      border: none;
      cursor: pointer;
    }
  }
}
</style>