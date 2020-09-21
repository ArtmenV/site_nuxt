<template>
  <div class="challenge-list">
    <div 
      v-for="(challenge, index) in list"
      :key="challenge.id"
      class="challenge"
    >
      <nuxt-link
        class="challenge__title silent-link"
        :to="'/challenge-results?id=' + challenge.id"
      >
        <span class="text--bold">
          {{ challenge.title }}
        </span>

        &nbsp;-&nbsp;

        {{ decodeChallengeType(challenge.type) }}

        &nbsp;-&nbsp;

        Winning Entries ({{ ISOToReadableString(challenge.submission_start_date) + ' - ' + ISOToReadableString(challenge.submission_end_date) }})
      </nuxt-link>

      <no-ssr>
        <!-- Setting what to render on `vw` more then 1300px -->
        <div v-if="screenType === 'desktop'" class="challenge__entries">
          <entry-card
            v-for="entry in challenge.entries.items"
            :key="entry.photo_id"
            :src="$api.resolveImageUrl(entry.thumbnail)"
            class="card"
            :photoId="entry.photo_id"
          >
            <div class="card__body">
              <div class="place">
                <PlaceImage :place="entry.place" />
              </div>

              <nuxt-link
                class="image-title text--bold silent-link"
                :to="'/entry?id=' + entry.photo_id"
              >
                {{ entry.title }}
              </nuxt-link>

              <nuxt-link
                class="username silent-link"
                :to="'/profile?id=' + entry.user_id"
              >
                {{ entry.username }}
              </nuxt-link>
            </div>
          </entry-card>
        </div>

        <!-- Setting what to render on `vw` less then 1300px -->
        <div v-if="screenType === 'tablet'" class="challenge__entries tablet">
          <el-carousel 
            height="340px" 
            style="width: 630px; margin: 0 auto;"
            type="card"
            indicator-position="outside"
            arrow="always"
            :autoplay="false"
            v-touch:swipe="dir => swipeHandler(dir, index)"
            ref="carouselBig"
          >
            <el-carousel-item
              v-for="entry in challenge.entries.items"
              :key="entry.photo_id"
            >
              <div>
                <entry-card
                  :src="$api.resolveImageUrl(entry.thumbnail)"
                  :photoId="entry.photo_id"
                >
                  <img
                    class="card__image"
                    slot="image"
                    :src="$api.resolveImageUrl(entry.thumbnail)" :alt="entry.title"
                    @click="$router.push('/entry?id=' + entry.photo_id)"
                  >

                  <div class="card__body">
                    <div class="place">
                      <PlaceImage :place="entry.place" />
                    </div>
                    
                    <nuxt-link
                      class="image-title text--bold silent-link"
                      :to="'/entry?id=' + entry.photo_id"
                    >
                      {{ entry.title }}
                    </nuxt-link>

                    <nuxt-link
                      class="username silent-link"
                      :to="'/profile?id=' + entry.user_id"
                    >
                      {{ entry.username }}
                    </nuxt-link>
                  </div>
                </entry-card>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>

        <div v-if="screenType === 'mobile'" class="challenge__entries mobile">
          <el-carousel 
            height="340px"
            style="width: 310px; margin: 0 auto;"
            indicator-position="outside"
            arrow="always"
            :autoplay="false"
            v-touch:swipe="dir => swipeHandler(dir, index)"
            ref="carouselSmall"
          >
            <el-carousel-item
              v-for="entry in challenge.entries.items"
              :key="entry.photo_id"
            >
              <div>
                <entry-card
                  :src="$api.resolveImageUrl(entry.thumbnail)"
                  class="card"
                  :photoId="entry.photo_id"
                >
                  <img
                    class="card__image"
                    slot="image"
                    :src="$api.resolveImageUrl(entry.thumbnail)"
                    :alt="entry.title"
                    @click="$router.push('/entry?id=' + entry.photo_id)"
                  >

                  <div class="card__body">
                    <div class="place">
                      <PlaceImage
                        :place="entry.place"
                      />
                    </div>

                    <nuxt-link
                      class="image-title text--bold silent-link"
                      :to="'/entry?id=' + entry.photo_id"
                    >
                      {{ entry.title }}
                    </nuxt-link>

                    <nuxt-link
                      class="username silent-link"
                      :to="'/profile?id=' + entry.user_id"
                    >
                      {{ entry.username }}
                    </nuxt-link>
                  </div>
                </entry-card>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </no-ssr>
    </div>
  </div>
</template>

<script>
/* component for showing proper image for certain place */
import PlaceImage from '~/pages/_components/PlaceImage.vue'

/* for listening touch events (used for swipes in carousel) */
import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'
 
Vue.use(Vue2TouchEvents)

/* element ui carousel */
import { Carousel, CarouselItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { decodeChallengeType, ISOToReadableString } from '~/helpers'

import { EntryCard } from '~/components/custom/EntryCard'

Vue.use(Carousel)
Vue.use(CarouselItem)

export default {
  components: {
    Card: () => import('~/components/Cards/Card'),
    PlaceImage,
    EntryCard
  },
  computed: {
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
  data () {
    return {
      // FIXME
      list: [],

      windowWidth: 0,

      loading: false
    }
  },
  mounted () {
    this.$nextTick(_ => {
      this.windowWidth = window.innerWidth
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    })

    this.updateList()
  },
  methods: {
    decodeChallengeType,
    ISOToReadableString,

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
    updateList () {
      this.loading = true

      this.$api
        .getRecentChallengesResult()
        .then(({ data: { result } }) => {
          this.list = result.items
        })
        .finally(_ => {
          this.loading = false
        })
    }
  },

  // watch: {
  //   list () {
  //     if ( this.list)
  //   }
  // }
}
</script>

<style lang="scss">
.challenge {
  .tablet {
    .card-image {
      width: 320px;
      height: 250px;
    }
  } 
  .mobile {
    .card-image {
      width: 300px;
      height: 250px;
    }
  }

  .card-body {
    height: 82px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    background-color: #fff;
  }

  .card {
    margin-bottom: 0px;
    background-color: #F5F5F5;
  }
}
</style>

<style lang="scss" scoped>
.challenge-list {
  max-width: 1300px;
  margin: 0 auto;
  // padding: 0 20px;
  // padding-top: 20px;

  .challenge {
    display: grid;

    margin-bottom: 45px;
  }

  .challenge__title {
    padding-top: 20px;
    padding-bottom: 15px;

    font-size: 18px;

    color: #2c2c2c;
  }

  .challenge__entries {
    width: 100%;
  
    display: flex;
    flex-wrap: wrap;

    justify-content: space-between;
    
    &.tablet,
    &.mobile {
      justify-content: center;

      .card {
        width: 300px;

        &__image {
          height: 250px;
        }
      }
    }
  
    .card {
      width: 170px;
      margin: 0 5px;
      margin-bottom: auto;
    }

    .card__image {
      height: 200px;

      margin: 0 auto;

      z-index: 2;

      &:hover {
        cursor: pointer;
      }
    }
  
    .card__body {
      display: grid;
      grid-template-columns: 32px 1fr;
      grid-column-gap: 10px;

      .place {
        grid-row: 1 / 3;

        display: flex;
        justify-content: center;
        // align-items: center;

        padding-top: 3px;
      }

      .image-title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}

@media screen and (min-width: 1128px) {
  .challenge-list {
    .challenge__entries {
      .card {
        width: 200px;
      }
    }
  }
}

@media screen and (min-width: 1328px) {
  .challenge-list {
    .challenge__entries {
      .card {
        width: 240px;
      }
    }
  }
}


</style>
