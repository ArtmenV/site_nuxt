<template>
  <div class="challenge-results-container">
    <h3 class="header">
      Rate Submissions for {{ title }}
    </h3>

    <challenge-details
      no-scoring
      @loaded="v => title = v"
    />

    <div
      class="list"
      v-loading="loading"
      :class="{'list--short': list.length < 3}"
    >
      <card 
        v-for="entry in list"
        :key="entry.id"
        class="list__item card"
      >
        <nuxt-link
          :to="'/voting?id=' + entry.id"
          slot="image"
        >
          <img 
            class="card__image"            
            :src="$api.resolveImageUrl(entry.path)" 
            :alt="entry.title"
          >
        </nuxt-link>

        <div class="card__body entry">
          <div></div>

          <div class="entry__info">
            <nuxt-link
              class="text--bold silent-link"
              :to="'/voting?id=' + entry.id"
            >
              {{ entry.title }}
            </nuxt-link>

            <!-- <div>
              by 
              <nuxt-link
                :to="'/profile?id=' + entry.user_id"
                class="silent-link"
              >
                {{ entry.username }}
              </nuxt-link>
            </div> -->

            <!-- <div class="average">
              <span class="text--bold">{{ 1 }}{{ 1 === 1 ? 'st' : 'th' }}</span> place with an
              average vote of <span class="text--bold">{{ entry.avg_score }}</span>
            </div> -->

            <div class="hide-on-mobile">
              <div class="your-vote">Your Vote: <span class="text--bold">
                {{ entry.user_vote || 'N/A' }}
              </span></div>
              <!-- <div class="your-comment">Your Comment: <span class="text--bold">N/A</span></div>

              <div class="your-comment">Average Vote (Participants): <span class="text--bold">N/A</span></div>
              <div class="your-comment">Average Vote (Non-Participants): <span class="text--bold">N/A</span></div> -->
            </div>
          </div>

          <div class="entry__footer">
            <div class="item">
              <i class="el-icon-view" /> {{ entry.views_total || 'no views' }}
            </div>

            <div class="item">
              Votes: {{ entry.votes_count || 'no votes' }}
            </div>
          </div>
        </div>
      </card>
    </div>

    <div
      class="pagination"
      v-if="total > 10"
    >
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        small
        @current-change="page => getChallengeEntries(page)"
      />
    </div>
  </div>
</template>

<script>
/* component for showing proper image for certain place */
import PlaceImage from '~/pages/_components/PlaceImage.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Card: () => import('~/components/Cards/Card'),
    ChallengeDetails: () => import('~/components/custom/ChallengeDetails/index.vue'),
    PlaceImage,
  },

  data () {
    return {
      list: [],

      total: 0,

      title: 'Loading...',

      loading: false
    }
  },

  mounted () {
    this.getChallengeEntries()
  },

  methods: {
    //   ...mapActions({

    //   checkUnreadMessage: 'messaging/checkUnreadMessage'
    // }),
    getChallengeEntries (page) {
      this.loading = true

      this.$api
        .getChallengeEntries(this.$route.query.id, page || 1)
        .then(({ data: { result } }) => {
          this.list.length = 0
          
          const userVoting = result.entries.items
            .filter(item => item.user_vote !== null)
            .sort(() => Math.random() - 0.5);

          const userNotVoting = result.entries.items
            .filter(item => item.user_vote === null)
              .sort(() => Math.random() - 0.5);

          this.list = [...userNotVoting, ...userVoting]

          localStorage.setItem('data', JSON.stringify(this.list))

          // this.$store.commit('voting/votingList', this.list)
          // debugger

          this.total = result.total_results
        })
        .catch(e => {
          this.loading = false
        })
        .finally(_ => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="scss">
.challenge-results-container {
  .card {
    margin-bottom: 20px;
    .card-image {
      background-color: #F5F5F5;
      height: 300px !important;
      width: 350px !important;
      display: table !important;

      a {
        text-align: center !important;
        vertical-align: middle !important;
        display: table-cell !important;

        img {
          max-width: 350px !important;
          max-height: 300px !important;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.challenge-results-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 30px;

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &--short {
      max-width: 750px;
    }
    
    &__item {
      max-width: 350px;
      // margin: 10px 10px;

      .entry {
        display: grid;
        grid-template-columns: 30px 1fr;
        grid-row-gap: 10px;

        &__footer {
          grid-column: 1 / 3;

          display: flex;
          justify-content: space-between;

          font-size: 16px;
          color: grey;
        }

        .average {
          margin: 5px 0;
        }

        .hide-on-mobile {
          margin: 5px 0;
        }
      }
    }
  }

  .pagination {
    margin: 0 auto;
    padding-top: 10px;

    display: flex;
    justify-content: center;
  }
}

@media (max-width: 375px) {
  .hide-on-mobile {
    display: none;
  }
}
</style>
