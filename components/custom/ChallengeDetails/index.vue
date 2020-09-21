<template>
  <div
    class="challenge-details-container"
    :class="{'short': !showFullDetails}"
    v-loading="loading"
  >
    <div
      v-if="info"
      class="block block--main"
    >
      <div class="block__item">
        <span class="text--bold">Description: </span>
        {{ info.description }}
      </div>
      
      <div class="block__item">
        <span class="text--bold">Type: </span>
        {{ decodeChallengeType(info.type) }} 
        using the 
        
        <span class="link">
          {{ decodeChallengeRules(info.ruleset) }}
        </span>
      </div>

      <div class="block__item">
        <span class="text--bold text--red">Extra Rules: </span>
        {{ info.extra_rules }}
      </div>
    </div>

    <div
      v-if="info"
      class="block"
    >
      <div class="block__item">
        <span class="text--bold">Submission Dates: </span>
        {{ ISOToReadableString(info.submission_start_date, {year: true}) }}
        -
        {{ ISOToReadableString(info.submission_end_date, {year: true}) }}
      </div>

      <div class="block__item">
        <span class="text--bold">Voting Dates: </span>
        {{ ISOToReadableString(info.vote_start_date, {year: true}) }}
        -
        {{ ISOToReadableString(info.vote_end_date, {year: true}) }}
      </div>

      <div class="block__item">
        <span class="text--bold">Submissions: </span>
        {{ info.entries_count || 'No submissions' }}
      </div>

      <div class="block__item">
        <span class="text--bold">Votes: </span>
        {{ info.votes_count }}
      </div>

      <div class="block__item">
        <span class="text--bold">Comments: </span>
        {{ info.comment || 'N/A' }}
      </div>

      <div v-if="!noScoring" class="block__item">
        <span class="text--bold">Average Score: </span>
        {{ info.avg_score || 'N/A' }}
      </div>

      <div v-if="!noScoring" class="block__item">
        <span class="text--bold">Highest Score: </span>
        {{ info.highest_avg_score || 'N/A' }}
      </div>

      <div v-if="!noScoring" class="block__item">
        <span class="text--bold">Median Score: </span>
        {{ info.median_score || 'N/A' }}
      </div>

      <div v-if="!noScoring" class="block__item">
        <span class="text--bold">Lowest Score: </span>
        {{ info.lowest_avg_score || 'N/A' }}
      </div>
    </div>

    <div 
      class="view-more" 
      :class="{'hidden': screenType === 'desktop', 'view-less': showFullDetails }"
      @click="showFullDetails = !showFullDetails"
    >
      <i class="el-icon-arrow-down" />
      <h6>{{ showFullDetails ? 'View less' : 'View more' }}</h6>
    </div>
  </div>
</template>

<script>
import { ISOToReadableString, decodeChallengeType, decodeChallengeRules } from '~/helpers'
export default {
  props: {
    noScoring: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      windowWidth: 0,

      info: null,

      loading: false,

      showFullDetails: true
    }
  },
  mounted () {
    this.$nextTick(_ => {
      this.windowWidth = window.innerWidth
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    })

    this.getChallengeInfo()
  },
  watch: {
    screenType (val) {
      if (val === 'desktop') {
        this.showAllItems = true
      }
    }
  },
  computed: {
    screenType () {
      const vw = this.windowWidth

      if (vw < 1300 && vw > 768) {
        return 'tablet'
      } else if (vw < 768) {
        return 'mobile'
      } else {
        return 'desktop'
      }
    }
  },
  methods: {
    getChallengeInfo () {
      this.loading = true

      this.$api
        .getChallengeMeta(this.$route.query.id)
        .then(({ data: { result } }) => {
          this.info = result.items[0]

          this.$emit('loaded', result.items[0].title)
        })
        .finally(_ => {
          this.loading = false
        })
    },
    ISOToReadableString,
    decodeChallengeType,
    decodeChallengeRules
  }
}
</script>

<style lang="scss" scoped>
.challenge-details-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  margin-bottom: 15px;

  position: relative;

  transition: all .2s ease-in;

  &.short {
    // padding: 30px;
    height: 100px;
    overflow: hidden;
  }

  .block {
    max-width: 65%;

    &__item {
      margin-bottom: 7px;
    }

    &.block--main {
      width: 65%;
    }

    margin-bottom: 10px;
  }
}

@media (max-width: 768px) {
  .block.block--main, .block {
    max-width: 100% !important;
    width: 100% !important;
  }

  .challenge-details-container {
    flex-direction: column;
  }
}

@media (max-width: 1200px) {
  .block.block--main {
    max-width: 100% !important;
    width: 100% !important;
  }
}

.view-more {
  position: absolute;
  bottom: -10px;
  width: 100%;
  // left: 50%;
  // transform: translateX(-50%);

  background: #f5f5f5;

  display: flex;
  padding-bottom: 10px;
  padding-top: 5px;
  margin-bottom: 10px;
  justify-content: center;
  user-select: none;

  &:hover {
    cursor: pointer;
  }

  &.view-less {
    i {
      transform: rotate(180deg);
    }
  }

  i {
    margin-right: 5px;
    margin-top: 1px;
    height: 14px;

    transition: all .2s ease-in;
  }
  
  &.hidden {
    display: none;
  }
}
</style>