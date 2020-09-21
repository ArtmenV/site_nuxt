<template>
  <div
    class="thread"
    :class="{'thread--pm': type === 'pm'}"
  >
    <no-ssr>
      <!-- <div
        v-if="!posts || $route.path === '/voting'"
        class="thread__posts"
      >
        <post
          v-for="n in 3"
          :key="n"
        />
      </div> -->
      <!--  -->
      <div
        v-if="$route.path !== '/voting'"
        class="thread__posts"
      >
        <real-post
          v-for="post in posts"
          :private-message="type === 'pm'"
          :key="post.id"
          :post="post"
          @quote="quote"
          @post-changed="post => $emit('post-changed', post)"
          @remove-quote="$emit('remove-quote', post.id)"
        />
      </div>

      <el-pagination
        v-if="pagination"
        layout="prev, pager, next"
        background
        hide-on-single-page
        :page-count="pagination.total_pages"
        @current-change="page => $emit('page-change', page)"
        class="thread__pagination"
      />   
        
      <div
        v-if="type === 'challenge-entry' || (isAuthorized && threadId) || 'image-page'"
        class="thread__new-comment"
      >
      
        <new-post
          :thread-id="threadId"
          :photo_id="photo_id"
          :quoted-post-id="quotedPostId"
          :type="type"
          @new-post="$emit('new-post')"
          @newPost="$emit('newComment')"
          @remove-quote="quotedPostId = undefined"
          :posts="posts"
          :makeVotePostForEditor="makeVotePostForEditor"
          :lastActivePostText="lastActivePostText"
          :dataInEditorForPagination="dataInEditorForPagination"
          :entry="entry"
        />
      
      </div>
    </no-ssr>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css';
import Post from './Post'
import RealPost from './_Post'
import NewPost from './NewPost'
import { mapGetters } from 'vuex'
export default {
  props: {
    threadId: {
      type: [String, Number],
      required: false
    },
    posts: {
      type: Array,
      required: false,
      default: () => []
    },
    pagination: {
      type: Object,
      required: false
    },
    type: {
      type: String,
      required: false,
      default: 'forum'
    },
    lastActivePostText: {
      type: String,
      required: false,
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
    photo_id: {
      type: Number,
      required: false
    }
  },
  components: {
    Post,
    RealPost,
    NewPost
  },
  data () {
    return {
      quotedPostId: undefined,
    }
  },
  computed: {
    ...mapGetters([ 'isAuthorized' ]),

    showPost () {
      if ( this.$route.query.id === '/voting' ) {
        return true
      }
    }
  },
  methods: {
    quote (id) {
      this.quotedPostId = undefined
      setTimeout(() => {
        this.quotedPostId = id
  
        window.scrollTo(0, document.body.scrollHeight)
      }, 10)
    }
  },
}
</script>

<style lang="scss" scoped>
.thread {
  display: grid;
  width: 600px;
  // width: 600px;
  &--pm {
    .thread__posts {
      grid-row-gap: 0;
    }

    .thread__new-comment {
      margin-bottom: 10px;
      // padding-left: 10px;
    }
  }
}
.thread__posts {
  display: grid;
  grid-row-gap: 10px;
}

.thread__new-comment {
  margin-top: 30px;
}

.thread__pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  margin-top: 20px;
}

img {
  width: 220px !important;
  height: auto;
}

@media screen and (max-width: 680px) {
  .thread {
    width: 100%;
  }
}
</style>
