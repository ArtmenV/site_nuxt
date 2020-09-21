<template>
  <div>
    <div
      class="voting-breakdown"
      v-loading="loading"
      v-if="voting"
    >
      <div
        v-for="(vote, index) in votes"
        :key="index"
        class="vote"
      >
        <span class="vote__mark">
          {{ index + 1 }}
        </span>

        <div
          :style="{ width: getPercentageWidth(maxVote, vote), background: getHSLColor(index) }"
          class="vote__bar"
        />

        <div class="vote__count">
          {{ vote }}
        </div>
      </div>
    </div>
    <div  v-else>
      This image has no votes
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      votes: [],
      voting: true,
      loading: false
    }
  },

  computed: {
    maxVote () {
      return Math.max(...this.votes)
    }
  },

  mounted () {
    this.getVotingBreakdown()
  },

  methods: {
    getPercentageWidth (max, val) {
      const min = 2

      const percents = Math.floor(val / max * (87 - min))

      return `${percents + min}%`
    },

    getHSLColor (index) {
      const multiplicator = 5
      const minPer = 20

      const percents = 75 - index * multiplicator

      return `hsl(207, 58%, ${percents}%);`
    },

    getVotingBreakdown () {
      this.loading = true
      this.$api
        .getChallengeEntryVotingBreakdown(this.$route.query.id)
        .then(({ data: { result } }) => {

          if ( result !== undefined ) {
            this.voting = true
          } else {
            this.voting = false
          }
          
          this.votes.length = 0

          for (const prop in result.breakdown) {
            this.votes.push(result.breakdown[prop])
          }
        })
        .catch(e => {
          this.voting = false
        })
        .finally(_ => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.voting-breakdown {
  width: 100%;

  // for loading spinner visibility
  min-height: 200px;

  .vote {
    display: flex;
    align-items: center;

    &__mark {
      width: 25px;
    }

    &__bar {
      height: 10px;
      background: hsl(207, 58%, 47%);
    }

    &__count {
      padding-left: 10px;
    }
  }
}
</style>
