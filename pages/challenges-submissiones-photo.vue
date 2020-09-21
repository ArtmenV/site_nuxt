<template>
  <div class="challenges-container">
    <h3 class="header">
      Challenges Currently Open for Submissions
    </h3>

    <div
      class="list"
      v-loading="loading.submission"
    >
      <challenge-text-info 
        v-for="challenge in submission"
        :key="challenge.id"
        :challenge="challenge"
        class="list__item"
        type="submission"
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
      submission: [],

      loading: {
        submission: false,
      }
    }
  },

  mounted () {
    this.getLists()
  },

  methods: {
    getLists () {
      this.loading.completed = true
      this.loading.voting = true
      this.loading.submission = true

      this.$api
        .getOpenForSubmissionChallengesResult()
        .then(({ data: { result } }) => {
          const { items } = result

          items.forEach(el => {
            this.submission.push(el)
          })
        })
        .catch(({ response }) => {
        })
        .finally(_ => {
          this.loading.submission = false
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
