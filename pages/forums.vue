<template>
  <div class="page page--forums">
    <div class="page__header">
      Welcome to the DPChallenge Forums
    </div>

    <div class="categories">
      <div class="categories__header">
        <span class="text--bold forum-column">
          Forum Section
        </span>

        <!-- No backend support -->
        <span class="text--bold mob--hide center">
          Threads
        </span>

        <span class="text--bold mob--hide center">
          Posts
        </span>

        <span class="text--bold mob--hide">
          Last Post
        </span>
      </div>

      <forum-category
        v-for="category in categories"
        :key="category.id"
        :category="category"
        v-loading="loading"
      />
    </div>
  </div>
</template>

<script>
import { ForumCategory } from '~/components/custom/Forum'
export default {
  components: {
    ForumCategory
  },
  data () {
    return {
      categories: [],
      loading: true
    }
  },
  mounted () {
    this.getForums()
  },
  methods: {
    getForums () {
      this.loading = true

      this.$api
        .getForumCategories()
        .then(({ data: { result } }) => {
          const { items } = result

          items.forEach(el => {
            this.categories.push(el)
          })
        })
        .finally(_ => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.page.page--forums {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;

  .page__header {
    font-size: 18px;
    font-weight: bold;
  }

  .categories {
    &__header {
      display: grid;
      grid-template-columns: 1fr 80px 80px 215px;

      padding: 5px 10px;

      background-color: #003664;

      span {
        display: flex;
        align-items: center;

        color: white;

        &.center {
          justify-content: center;
        }
      }
    }
  }
}

@media screen and (max-width: 680px) {
  .categories__header {
    grid-template-columns: 1fr !important;
    .mob--hide {
      display: none !important;
    }
    .forum-column {
      grid-column: 1 / 5;
    }
  }
}
</style>
