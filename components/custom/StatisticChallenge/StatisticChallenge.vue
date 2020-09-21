<template>
  <div
    class="thread"
    :class="{'thread--pm': type === 'pm'}"
  >
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
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css';
import Post from '~/components/custom/Forum/Post.vue'
import RealPost from '~/components/custom/Forum/_Post.vue'
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
    }
  },
  components: {
    Post,
    RealPost,
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
  max-width: 600px;
  &--pm {
    .thread__posts {
      grid-row-gap: 0;
    }

    .thread__new-comment {
      margin-bottom: 10px;
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
    max-width: 100%;
  }
}
</style>
