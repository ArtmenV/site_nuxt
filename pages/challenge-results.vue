<template>
  <div class="challenge-results-container">
    <h3 class="header">
      Challenge Results for {{ title }}
    </h3>

    <challenge-details
      @loaded="v => title = v"
    />

    <div class="list" v-loading="loading">
      <card 
        v-for="entry in list"
        :key="entry.id"
        class="list__item card"
      > 
        <nuxt-link
          :to="'/entry?id=' + entry.id"
          class="card__image" 
          slot="image"
        >
          <img
            class="card__image"             
            :src="$api.resolveImageUrl(entry.path)" 
            :alt="entry.title"
          >
        </nuxt-link>

        <div class="card__body entry">
          <nuxt-link
            class="entry__place"
            :to="'/entry?id=' + entry.id"
          >
            <place-image :place="entry.place" />
          </nuxt-link>

          <div class="entry__info">
            <nuxt-link
              class="text--bold silent-link"
              :to="'/entry?id=' + entry.id"
            >
              {{ entry.title }}
            </nuxt-link><br>

            <nuxt-link
              class="link"
              :to="'/profile?id=' + entry.user_id"
            >
              by {{ entry.username }}
            </nuxt-link>

            <div class="average">
              <span class="text--bold">{{ toPlaceStr(entry.place) }}</span> place with an
              average vote of <span class="text--bold">{{ entry.avg_score }}</span>
            </div>

            <div class="hide-on-mobile">
              <div class="your-vote">Your Vote: 
                <span class="text--bold">
                  {{ entry.user_vote || 'N/A' }}
                </span>
              </div>

              <!-- <div class="your-comment">Your Comment: 
                <span class="text--bold">
                  N/A
                </span>
              </div> -->

              <div class="your-comment">
                Average Vote (Participants): 
                <span class="text--bold">
                  {{ entry.avg_score_participants || 'N/A' }}
                </span>
              </div>

              <div class="your-comment">Average Vote (Non-Participants): 
                <span class="text--bold">
                  {{ entry.avg_score_non_participants || 'N/A' }}
                </span>
              </div>
            </div>
          </div>

          <div class="entry__footer">
            <div class="item">
              <i class="el-icon-view" /> {{ entry.views_total || 'no views' }}
            </div>

            <div class="item">
              Votes: {{ entry.votes_count }}
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
import { EntryCard } from '~/components/custom/EntryCard'
import { toPlaceStr } from "~/helpers"

export default {
  components: {
    Card: () => import('~/components/Cards/Card'),
    ChallengeDetails: () => import('~/components/custom/ChallengeDetails/index.vue'),
    PlaceImage,
    EntryCard
  },

  data () {
    return {
      list: [],

      total: 0,

      loading: false,

      title: 'Loading...'
    }
  },

  mounted () {
    this.getChallengeEntries()
  },

  methods: {
    toPlaceStr,

    getChallengeEntries (page) {
      this.loading = true

      this.$api
        .getChallengeEntries(this.$route.query.id, page || 1)
        .then(({ data: { result } }) => {
          this.list.length = 0

          this.list = result.entries.items.filter(el => el.place !== null)

          this.list.sort((a, b) => a.place - b.place)

          this.total = result.total_results
        })
        .finally(_ => {
          this.loading = false
        })
    }
  },
}
</script>

<style lang="scss">
.challenge-results-container {
  .card {
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
    
    &__item {
      max-width: 350px;
      // margin: 10px 10px;
      margin-bottom: 20px;

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
