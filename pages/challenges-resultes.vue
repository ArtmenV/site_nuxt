<template>
  <div class="challenges-container">
    <h3 class="header">
      Recently Completed Challenges
    </h3>

    <div
      class="list"
      v-loading="loading.completed"
    >
      <challenge-text-info 
        v-for="challenge in completed"
        :key="challenge.id"
        :challenge="challenge"
        type="completed"
        class="list__item"
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ChallengeTextInfo: () => import('~/components/custom/ChallengeTextInfo')
  },

  data () {
    return {

      completed: [],

      loading: {
        completed: false
      }
    }
  },

  mounted () {
    this.getLists()
  },

  methods: {
    getLists () {
      this.loading.completed = true
      this.$api
        .getRecentChallengesResult()
        .then(({ data: { result } }) => {
          const { items } = result

          items.forEach(el => {
            this.completed.push(el)
          })
        })
        .catch(({ response }) => {
        })
        .finally(_ => {
          this.loading.completed = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.challenges-container {
  margin: 0 auto;
  max-width: 1160px;

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &__item {
      max-width: 550px;
    }
  }
}

@media (min-width: 1200px) {
  .list__item {
    margin-right: 30px;
  }
}
</style>
