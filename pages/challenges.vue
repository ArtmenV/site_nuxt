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

    <h3 class="header">
      Challenges Currently Awaiting Your Votes
    </h3>

    <div
      class="list"
      v-loading="loading.voting"
    >
      <challenge-text-info 
        v-for="challenge in voting"
        :key="challenge.id"
        :challenge="challenge"
        type="voting"
        class="list__item"
      />
    </div>

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
      submission: [],

      voting: [],

      completed: [],

      loading: {
        submission: false,
        voting: false,
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

      this.$api
        .getOpenForVotingChallengesResult()
        .then(({ data: { result } }) => {
          const { items } = result

          items.forEach(el => {
            this.voting.push(el)
          })
        })
        .catch(({ response }) => {
        })
        .finally(_ => {
          this.loading.voting = false
        })

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
