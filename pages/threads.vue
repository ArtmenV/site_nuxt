<template>
  <div
    class="page page--threads"
    v-loading="loading"
  >
    <div class="page__header">
      <div class="dpc-breadcrumb">
        <nuxt-link
          class="link link--bold"
          to="/forums"
        >
          DPChallenge Forums
        </nuxt-link>

        >>

        <span class="text--bold">
          {{ title }}
        </span>
      </div>

      <nuxt-link
        v-if="newPostAvailable"
        class="new-thread"
        :to="'/new-thread?section_id=' + $route.query.section_id"
      >
        <el-button
          class="new-thread-btn"
        >
          + New topic
        </el-button>
      </nuxt-link>
    </div>

    <div class="threads">
      <div class="thread thread--header">
        <div class="thread__subject">
          Subject
        </div>

        <div class="thread__creator mob--hide">
          Creator
        </div>

        <div class="thread__views mob--hide">
          Views
        </div>

        <div class="thread__last-post mob--hide">
          Last Post
        </div>
      </div>

      <div
        class="thread"
        v-for="thread in threads"
        :key="thread.id"
      >
        <nuxt-link
          class="thread__subject link"
          :to="'/thread?id=' + thread.id"
        >
          {{ thread.title }}
        </nuxt-link>

        <nuxt-link
          class="thread__creator link mob--hide"
          :to="'/profile?id=' + thread.creator_id"
        >
          {{ thread.creator_username }}
        </nuxt-link>

        <div class="thread__views mob--hide">
          {{ thread.views_count }}
        </div>

        <div class="thread__last-post mob--hide" v-if="thread.last_post">
          {{ ISOToReadableString(thread.last_post.created_at, {year: true}) }}
          by
          <nuxt-link
            class="link"
            :to="'/profile?id=' + thread.last_post.creator_id"
          >
            {{ thread.last_post.creator_username }}
          </nuxt-link>
        </div>
      </div>

      <div 
        class="no-threads"
        v-if="!threads.length"
      >
        There are no threads added yet.
      </div>
    </div>
  </div>
</template>

<script>
import { ISOToReadableString } from '~/helpers'
export default {
  data () {
    return {
      threads: [],
      title: 'Loading...',
      newPostAvailable: false,
      loading: false
    }
  },
  mounted () {
    this.getThreads()
  },
  methods: {
    ISOToReadableString,    
    getThreads () {
      this.loading = true

      this.$api
        .getForumThreads(this.$route.query.section_id)
        .then(({ data: { result } }) => {
          const { items } = result.threads

          items.forEach(el => {
            this.threads.push(el)
          })

          this.title = result.section_name
          this.newPostAvailable = result.can_create_thread
        })
        .finally(_ => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  // display: none;

  &__header {
    font-size: 18px;

    display: flex;
    justify-content: space-between;
  }

  .threads {
    margin-top: 30px;

    .thread {
      display: grid;

      &--header {
        background: #63748F;
        font-weight: bold;
        color: white;
      }

      * {
        padding: 5px 10px;
      }
    }
  }

  .no-threads {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }
}

@media (min-width: 600px) {
  .thread {
    grid-template-columns: 2fr 160px 100px 1fr;
  }
}

@media (max-width: 599px) {
  .mob--hide {
    display: none;
  }

  .page__header {
    flex-direction: column;

    .new-thread {
      margin-top: 10px;

      min-width: 100%;
      .new-thread-btn {
        min-width: 100%;
      }
    }
  }
}
</style>
