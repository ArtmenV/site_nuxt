<template>
  <div class="category">
    <div class="category__name">
      {{ category.title }}
    </div>

    <div
      class="category__sections"
      v-loading="loading"
    >
      <forum-section
        v-for="section in sections"
        :key="section.id"
        :section="section"
      />
    </div>
  </div>
</template>

<script>
import ForumSection from './ForumSection'
export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  components: {
    ForumSection
  },
  data () {
    return {
      sections: [],
      loading: false
    }
  },
  mounted () {
    this.getSections()
  },
  methods: {
    getSections () {
      this.loading = true

      this.$api
        .getForumSections(this.category.id)
        .then(({ data: { result } }) => {
          const { items } = result

          items.forEach(el => {
            this.sections.push(el)
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
.category {
  &__name {
    background-color: #63748F;
    color: white;
    font-weight: bold;
    padding: 5px 10px;
  }
}
</style>
