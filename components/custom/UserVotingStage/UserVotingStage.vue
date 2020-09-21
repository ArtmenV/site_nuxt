<template>
  <div
    class="user__voting"
    v-loading="isLoading"
  >
  <!-- <button @click="getUserEntry">asdasdasd</button> -->
    <div
      class="user__voting-title text--bold"
      v-if="showComponent"
    >
      My submissions
    </div>
    <div
      class="user__voting-container"
      v-if="screenType === 'desktop'" 
    >
      <div
        v-for="userVoting of userVotingEntries"
        :key="userVoting.id"
        class="user__voting-items"
      >

        <div class="image__container">
          <nuxt-link
            class="title-center"
            :to="'/challenge-stats?id=' + userVoting.id"
          >
            <img :src="$api.resolveImageUrl(userVoting.thumbnail)">
          </nuxt-link>
        </div>

        <div class="image__container-image">
          <span class="image__title">
            {{ userVoting.title || "Image title" }}
          </span>
          <nuxt-link
            class="title-center"
            :to="'/voting-entries?id=' + userVoting.challenge.id"
          >
            {{ userVoting.challenge.title || "Title challenge" }}
          </nuxt-link>

          <div class="result">
            <div class="result__item">
              Votes:
            </div>
            <strong class="result__item">
              {{ userVoting.votes_count || '-' }}
            </strong>
            <div class="result__item">
              Views:
            </div>
            <strong class="result__item">
              {{ userVoting.views_count || '-' }}
            </strong>
            <div class="result__item">
              Avg Vote:
            </div>
            <strong class="result__item">
              {{ userVoting.avg_score || '-' }}
            </strong>
            <div class="result__item">
              Comments:
            </div>
            <strong>
              <nuxt-link
                class="title-center link-comment"
                :to="'/challenge-stats?id=' + userVoting.id"
              >
                {{ userVoting.comments_count || '-' }}
              </nuxt-link>
            </strong>
            <div class="result__item">
              Favorites:
            </div>
            <strong class="result__item">
              {{ userVoting.in_favorites_count || '-' }}
            </strong>
            <div class="result__item">
              Updated:
            </div>
            <strong class="result__item">
              {{ prettyDate(userVoting.updated_at) }}
              {{ prettyTime(userVoting.updated_at) }}
            </strong>
          </div>
          <div class="button__update">
            <div
              @click="getUserEntry()"
              class="button__update"
            >
              Update
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="screenType === 'tablet' && showComponent" class="challenge__entries tablet">
      <el-carousel
        height="340px"
        style="width: 630px; margin: 0 auto;"
        type="card"
        indicator-position="outside"
        arrow="always"
        :autoplay="false"
        :swipe="dir => swipeHandler(dir, index)"
      >
        <el-carousel-item
          v-for="userVoting in userVotingEntries"
          :key="userVoting.id"
        >
          <div class="carusel__voting">
            <div
              :src="$api.resolveImageUrl(userVoting.thumbnail)"
              class="carusel__voting"
            >
              <div class="image__container">
                <div class="image__item">
                  <nuxt-link
                    class="title-center"
                    :to="'/challenge-stats?id=' + userVoting.id"
                  >
                    <img
                      class="card__image"
                      :src="$api.resolveImageUrl(userVoting.thumbnail)"
                      @click="$router.push('/entry?id=' + userVoting.id)"
                    >
                  </nuxt-link>
                </div>
              </div>

              <div class="card__body">
                <div class="result">
                  <div class="image__title">
                    {{ userVoting.title || "Image title" }}
                  </div>
                  <nuxt-link
                    class="row-item silent-link highlighted text--bold item--desktop title-center"
                    :to="'/voting-entries?id=' + userVoting.challenge.id"
                  >
                    {{ userVoting.challenge.title || "Title challenge" }}
                  </nuxt-link>
                    <div class="result__item">
                      Votes:
                    </div>
                    <strong class="result__item">
                      {{ userVoting.votes_count || '-' }}
                    </strong>
                    <div class="result__item">
                      Views:
                    </div>
                    <strong class="result__item">
                      {{ userVoting.views_count || '-' }}
                    </strong>
                    <div class="result__item">
                      <!-- Updated:  -->
                    </div>
                    <strong class="result__item">
                      {{ prettyDate(userVoting.updated_at) }}
                      {{ prettyTime(userVoting.updated_at) }}
                    </strong>
                    <div class="button__update-desktop">
                      <div
                        @click="getUserEntry()"
                      >
                        Update
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div v-if="screenType === 'mobile' && showComponent" class="voting__card-mobile">
      <el-carousel
        height="340px"
        style="width: 320px; margin: 0 auto;"
        indicator-position="outside"
        arrow="always"
        :autoplay="false"
      >
      <!-- :swipe="dir => swipeHandler(dir, index)" -->
        <el-carousel-item
          v-for="userVoting in userVotingEntries"
          :key="userVoting.id"
        >
          <div class="container__card">
            <div class="image__container">
              <nuxt-link
                class="title-center"
                :to="'/challenge-stats?id=' + userVoting.id"
              >
                <img
                  class="card__image"
                  :src="$api.resolveImageUrl(userVoting.thumbnail)"
                  @click="$router.push('/entry?id=' + userVoting.id)"
                >
              </nuxt-link>
            </div>
            <div class="card__body">
              <div class="card__body-container">
                <div class="image__title">
                {{ userVoting.title || "Image title" }}
              </div>
              <nuxt-link
                class="row-item silent-link highlighted text--bold item--desktop title-center"
                :to="'/voting-entries?id=' + userVoting.challenge.id"
              >
                {{ userVoting.challenge.title || "Title challenge" }}
              </nuxt-link>
              </div>
              <div class="button__update-mobile">
                <div
                  @click="getUserEntry()"
                >
                  Update
                </div>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookie from 'js-cookie'
import { formatAMPMForVotes, ISOToReadableString } from '~/helpers'

import { Carousel, CarouselItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'



export default {

  data () {
    return {
      userId: this.$store.state.user.userId || '',
      isLoading: false,
      userVotingEntries: null,
      windowWidth: 0,
      showComponent: false,
      updateComponent: Cookie.get('dpc_token') || null
    }
  },

  methods: {
    getUserEntry () {
      this.isLoading = true
      let data = {
        collections: 'voting',
      }

      this.$api.getUserVotingStage( data )
        .then(( { data: { result }}) => {
          console.log('res', result)
          this.userVotingEntries = result.voting_entries.items
          this.isLoading = false
        })
        .catch((e) => {
        })
        .finally( _ => {
          this.isLoading = false
        })
      },

      swipeHandler (direction, elIndex) {
        const carousel = this.screenType === 'mobile'
          ? this.$refs.carouselSmall
          : this.$refs.carouselBig

        if (direction === 'left') {
          carousel[elIndex].next()
        } else if (direction === 'right') {
          carousel[elIndex].prev()
        }
      },

      prettyTime: date => formatAMPMForVotes(date),
      prettyDate: date => ISOToReadableString(date, {year: true, shortMonth: true}),
    },

  computed: {
    ...mapGetters([ 'isAuthorized' ]),
    screenType () {
      const vw = this.windowWidth

      if (vw < 960 && vw > 768) {
        return 'tablet'
      } else if (vw < 768) {
        return 'mobile'
      } else {
        return 'desktop'
      }
    }
  },

  watch: {
    userVotingEntries () {
      if (this.userVotingEntries.length) {
        return  this.showComponent = true
      } else {
        return this.showComponent = false
      }
    },
  },

  mounted () {
    if ( this.isAuthorized ) {
      this.getUserEntry()
    }

    this.$nextTick(_ => {
      this.windowWidth = window.innerWidth
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    })
  },
}
</script>

<style lang="scss">
  .user__voting {
    .el-carousel  {
      width: 310px;
    }
    .el-carousel__item {
      .card-image {
        max-height: 120px;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .user__voting {
    max-width: 1300px;
    margin: 0 auto;
    margin-top: 2rem;

    &-container {
      margin-bottom: 2rem;

      .user__voting-items {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 170px;
        display: inline-block;
        margin: 1.5rem 1rem 0 .2rem;
        box-shadow: 1px 2px 15px 9px rgba(161, 161, 161, 0.4);
      }
    }

    .image__title {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: .7rem 0 .3rem 0;
      color: #444;
    }

    &-title {
      font-size: 18px;
      color: #2c2c2c;
      margin-top: 2.5rem;
    }

    .image__container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 170px;
      height: 200px;

      strong {
        margin: .5rem 0;
      }
    }

    .image__container-image {
      padding: 0 10px 10px 10px;
      background: #fff;

        .button__update {
          display: flex;
          justify-content: flex-end;
          justify-self: flex-end;
          color: #003664;
          cursor: pointer;
        }

      .title-center {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: .25rem 0;
        font-size: 13px;
        font-weight: bold;
        color: #444 !important;
      }
    }

    .result {
      display: grid;
      grid-template-columns: 1fr 2fr;
      margin-bottom: .7rem;

      .link-comment {
        margin-left: .2rem;
      }

      strong {
        justify-self: start;
      }

      &__item {
        justify-self: right;
        margin-right: .3rem;
        font-size: 12px;
        margin: .2rem 0;
        padding: 0 .2rem;
        color: #444 !important;
      }
    }
  }

@media screen and (max-width: 960px) {
  .user__voting {
    .carusel__voting {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #F5F5F5;
      height: 300px;
    }

    .card__body {
      background: #fff;
      width: 310px;
    }

    .result {
      height: 150px;
      margin: 0;
      padding: .1rem 0 .1rem 1rem;
      border-bottom: 9px solid rgba(199, 199, 199, 0.5);

      .button__update-desktop {
        grid-column: 1 / 3;
        display: flex;
        justify-content: flex-end;
        justify-self: flex-end;
        margin-right: .8rem;
        color: #003664;
        font-size: 14px;
      }
    }

    .image__title {
      padding-bottom: 0;
      padding-top: 0;
      margin-top: 0;
      grid-column: 1 / 3;
    }

    .image__container {
      background-color: #F5F5F5;
      width: 320px;
      height: 250px;

      .image__item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 230px !important;

        .card__image {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
        }
      }

      img {
        max-width: 240px;
      }
    }
  }
  .title-center {
    grid-column: 1 / 3;
    justify-self: center;
    // margin-bottom: .3rem;
    color: #444 !important;
  }

  .user__voting .result__item{
    margin: 0;
  }
}

@media screen and (max-width: 768px) {
  .container__card {
    // box-shadow: 12px 12px 2px 15px rgba(144, 144, 144, 0.4);
    margin: 0 auto;
  }

  .button__update-mobile {
    display: flex;
    justify-content: flex-end;
    justify-self: flex-end;
    margin-right: .8rem;
    color: #003664;
    cursor: pointer;
    font-size: 14px;
  }
  .voting__card-mobile {
    margin-top: 1.5rem;

    .highlighted {
      color: #444 !important;
    }

    .container__card {
      width: 500px;
      // box-shadow: 12px 12px 2px 15px rgba(144, 144, 144, 0.4);
    }

    .card__body {
      background: #fff;
      width: 308px;
      height: 83px;
      margin-left: .4rem;
      box-shadow: 8px 41px 3px 15px rgba(144, 144, 144, 0.4);

      .card__body-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: .2rem;
      }
    }

    .image__container {
      margin-left: .4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 308px;
      box-shadow: 8px 12px 2px 15px rgba(144, 144, 144, 0.4);
    }

    .image__title {
      margin: .5rem 0 .2rem 0;
    }

    .title-center {
      grid-column: 1 / 3;
      justify-self: center;
      margin-top: .5rem 0;
    }
  }
}

@media screen and (min-width: 1128px) {
  .user__voting {
    &-container {
      .image__container {
        width: 200px;
      }
      .user__voting-items {
        width: 200px;
      }
    }
  }
}

@media screen and (min-width: 1328px) {
  .user__voting {
    &-container {
      .title-center {
        font-size: 16px;
      }
      .image__container {
        width: 240px;
      }
      .user__voting-items {
        width: 240px;
      }
    }
  }
}
</style>