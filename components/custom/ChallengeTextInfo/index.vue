<template>
  <div class="challenge-text-info-container">
    <div class="label">Challenge</div>
    <div class="value">
      {{ challenge.title }}
    </div>

    <div class="label">Type</div>
    <div class="value">
      {{ decodeChallengeType(challenge.type) }}
    </div>

    <div class="label">Rules</div>
    <div class="value link">
      {{ decodeChallengeRules(challenge.ruleset) }}
    </div>
    
    <div class="label br">Submission Deadline</div>
    <div class="value br">
      {{ prettyDate(challenge.submission_end_date) }}
    </div>

    <div class="label br">Description</div>
    <div class="value br">
      {{ challenge.description || 'N/A' }}
    </div>

    <div v-if="challenge.user_submission && !submissionDeleted" class="label br">Your submission</div>
    <div v-if="challenge.user_submission && !submissionDeleted" class="value br">
      <img
        :src="$api.resolveImageUrl(challenge.user_submission.thumbnail)"
        alt="your submission photo thumbnail"
      >

    </div>

    <!-- <div class="label">Submissions</div>
    <div class="value">22</div> -->

    <nuxt-link :to="getChallengeLink">
      <el-button
        class="action"
        type="primary"
        size="mini"
        plain
      >
        {{ getChallengeButtonText }}
      </el-button>
    </nuxt-link>
  </div>
</template>

<script>
import {
  ISOToReadableString,
  decodeChallengeType,
  decodeChallengeRules
} from "~/helpers"

export default {
  props: {
    type: {
      type: String,
      required: true
    },

    challenge: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      submissionDeleted: false,
    }
  },

  computed: {
    getChallengeLink () {
      const { id } = this.challenge

      switch (this.type) {
        case 'voting':
          return '/voting-entries?id=' + id

        case 'completed':
          return '/challenge-results?id=' + id

        case 'submission':
          return '/challenge-submission?id=' + id
        
        default:
          return '/'
      }
    },

    getChallengeButtonText () {
      switch (this.type) {
        case 'voting':
          return 'Begin voting'

        case 'completed':
          return 'View challenge results'

        case 'submission':
          if (this.challenge.user_submission && !this.submissionDeleted) {
            return 'View your submission'
          } else {
            return 'Submit to this challenge'
          }
        
        default:
          return '/'
      }
    }
  },

  methods: {
    decodeChallengeType,
    decodeChallengeRules,
    prettyDate: date => ISOToReadableString(date, {year: true})
  }
}
</script>

<style lang="scss" scoped>
.challenge-text-info-container {
  margin-bottom: auto;

  display: grid;
  grid-template-columns: 160px 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  padding-bottom: 20px;

  .label {
    font-weight: bold;
  }

  .action {
    grid-column: 1 / 3;
    margin-top: 10px;
  }
}

@media (max-width: 375px) {
  .label.br,
  .value.br {
    grid-column: 1 / 3;
  }
}

@media (min-width: 376px) {
  .label {
    text-align: right;
  }

  .action {
    margin-left: 160px;
    margin-right: auto;
  }
}
</style>