<template>
  <div 
    class="details"
    v-loading="isLoading"
  >
    <div 
      class="details__comment"
      v-loading="user.view"
    >
      <details-block class="header">
        <div
          slot="header"
        >
          Photographer's Comments
        </div>
        <div
          v-if="entry.description"
          class="body"
          v-html="entry.description"
        >
        </div>
        <div v-else class="body" style="padding: 10px 0;">
          N/A
        </div>
      </details-block>

      <div 
        class="details__info"
        :class="{ onlyinfo__fotograph : entry.challenge && entry.is_photo_in_submission || !entry.challenge}"
      >
        <details-block>
          <div
            slot="header"
            class="header"
          >
            Photograph Information
          </div>

          <div class="body">

            <info-block
              label="Challenge:"
              v-if="entry.challenge"
            >
              <span>
                {{ entry.challenge.title }}
              </span>
            </info-block>

            <info-block
              label="Collection:"
            > 
              <span>
                <nuxt-link
                  class="row-item silent-link highlighted"
                  :to="`/portfolio/user?user_id=${ entry.user.id }&path=` + `${ entry.collection.name === null ? 'portfolio' : entry.collection.path }`"
                  style="margin-bottom: .4rem"
                >
                  {{ entry.collection.name === null ? 'portfolio' : entry.collection.name }}
                </nuxt-link>
              </span>

              <!-- <not-specified v-else /> -->
            </info-block>

            <info-block
              label="Camera:"
            > 
              <span v-if="entry.camera">
                {{ entry.camera.model }}
              </span>
              <not-specified v-else />
            </info-block>

            <info-block
              label="Lens:"
            > 
              <span v-if="entry.lens">
                {{ entry.lens.model }}
              </span>
              <not-specified v-else />
            </info-block>

            <info-block
              label="Date:"
            > 
              <span v-if="entry.taken_date">
                {{ ISOToDateOfBirth(entry.taken_date) }}
              </span>
              <not-specified v-else />
            </info-block>

            <info-block
              label="Aperture:"
            >
              <span v-if="entry.aperture">
                {{ entry.aperture }}
              </span>

              <not-specified v-else />
            </info-block>

            <info-block
              label="ISO:"
            >
              <span v-if="entry.iso">
                {{ entry.iso }}
              </span>

              <not-specified v-else />
            </info-block>

            <info-block
              label="Shutter:"
            >
              <span v-if="entry.speed">
                {{ entry.speed }}
              </span>

              <not-specified v-else />
            </info-block>

            <info-block
              label="Date Uploaded:" 
            > 
              <span v-if="entry.uploaded_at">
                {{ ISOToDateOfBirth(entry.uploaded_at) }}
              </span>
              <not-specified v-else /> 
            </info-block>
            <br>
            <info-block
              v-if="!entry.challenge"
              label="Viewed:"
            > 
              <span v-if="entry.views">
                {{ entry.views || 0 }}
              </span>
            </info-block>
            <info-block
              v-if="!entry.challenge"
              label="Comments:"
            > 
              <span>
                {{ entry.comments_count || 0 }}
              </span>
              <!-- <not-specified v-else />  -->
            </info-block>

            <info-block
              label="Favorites:"
              v-if="!entry.challenge"
            > 
              <span>
                {{ entry.in_favorites_count || 0 }}
              </span>
              <!-- <not-specified v-else />  -->
            </info-block>

            <div 
              style="display: flex; 
              flex-direction: column; 
              margin-left: .1rem; 
              margin-top: .8rem
            ">
              <span 
                class="row-item silent-link highlighted text--bold"
                v-if="!entry.is_owner && !checkFavPhoto"
                @click="addPhotoToFavorite"
              >
                <svg 
                  class="profile__links_item"
                  width="27" height="16" viewBox="0 0 27 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H27V9.75H14V0ZM14.8125 0.8125V8.9375H26.1875V0.8125H14.8125ZM15.63 8.14662C15.63 8.14662 16.475 2.44048 17.7296 2.44048C18.9843 2.44048 19.5339 6.46548 20.5432 6.46548C21.5526 6.46548 21.4765 4.89275 22.2155 4.89275C22.9544 4.89275 25.4978 8.14662 25.4978 8.14662H15.63ZM24.1562 4.0625C23.4832 4.0625 22.9375 3.51685 22.9375 2.84375C22.9375 2.17065 23.4832 1.625 24.1562 1.625C24.8293 1.625 25.375 2.17065 25.375 2.84375C25.375 3.51685 24.8293 4.0625 24.1562 4.0625Z" fill="#155885"/>
                  <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="#155885"/>
                  <path d="M8 10C1.9 10 0 14 0 14V16H16V14C16 14 14.1 10 8 10Z" fill="#155885"/>
                </svg>
                Add photograph to your favorites
              </span>

              <span 
                class="row-item silent-link highlighted text--bold"
                v-if="!entry.is_owner && checkFavPhoto"
                @click="removePhotoToFavorite"
              >
                <svg 
                  class="profile__links_item"
                  width="27" height="16" viewBox="0 0 27 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H27V9.75H14V0ZM14.8125 0.8125V8.9375H26.1875V0.8125H14.8125ZM15.63 8.14662C15.63 8.14662 16.475 2.44048 17.7296 2.44048C18.9843 2.44048 19.5339 6.46548 20.5432 6.46548C21.5526 6.46548 21.4765 4.89275 22.2155 4.89275C22.9544 4.89275 25.4978 8.14662 25.4978 8.14662H15.63ZM24.1562 4.0625C23.4832 4.0625 22.9375 3.51685 22.9375 2.84375C22.9375 2.17065 23.4832 1.625 24.1562 1.625C24.8293 1.625 25.375 2.17065 25.375 2.84375C25.375 3.51685 24.8293 4.0625 24.1562 4.0625Z" fill="#155885"/>
                  <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="#155885"/>
                  <path d="M8 10C1.9 10 0 14 0 14V16H16V14C16 14 14.1 10 8 10Z" fill="#155885"/>
                </svg>
                Remove photograph to your favorites
              </span>

              <span
                v-if="!entry.is_owner && !checkFavPhotograph"
                @click="addPhotographtoFavorite"
                class="row-item silent-link highlighted text--bold"
              >
                <svg 
                  class="profile__links_item"
                  width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="#155885"/>
                  <path d="M8 10C1.9 10 0 14 0 14V16H16V14C16 14 14.1 10 8 10Z" fill="#155885"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M18 3H16V6H13V8H16V11H18V8H21V6H18V3Z" fill="#155885"/>
                </svg>
                Add photographer to your favorites
              </span>

              <span
                v-if="!entry.is_owner && checkFavPhotograph"
                @click="removePhotographerFromFav"
                class="row-item silent-link highlighted text--bold"
              >
                <svg 
                  class="profile__links_item"
                  width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="#155885"/>
                  <path d="M8 10C1.9 10 0 14 0 14V16H16V14C16 14 14.1 10 8 10Z" fill="#155885"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M18 3H16V6H13V8H16V11H18V8H21V6H18V3Z" fill="#155885"/>
                </svg>
                Remove photographer to your favorites
              </span>

            </div>
          </div>
        </details-block> 
      </div>

      <div 
        class="details__stat"
        v-if="entry.challenge && !entry.is_photo_in_submission"
      >
        <details-block>
          <div
            slot="header"
            class="header"
          >
            Statistics
          </div>

          <div class="body">
            <info-block
              label="Place:"
            >
              {{ entry.place || 'N/A' }}
              out of 
              {{ entry.challenge.entries_count || 'N/A' }}
            </info-block>

            <info-block
              label="Avg (all users):"
            >
              {{ entry.avg_score || 'N/A' }}
            </info-block>

            <info-block
              label="Avg (participants):"
            >
              {{ entry.avg_score_participants || 'N/A' }}
            </info-block>

            <info-block
              label="Avg (non-participants):"
            >
              {{ entry.avg_score_non_participants || 'N/A' }}
            </info-block>

            <info-block
              label="Views since voting:"
            >
              {{ entry.views || 'N/A' }}
            </info-block>

            <info-block
              label="Views during voting:"
            >
              {{ entry.views_during_voting || 'N/A' }}
            </info-block>

            <info-block
              label="Votes:"
            >
              {{ entry.votes_count || 'N/A' }} 

            </info-block>

            <info-block
              label="Comments:"
            >
              {{ entry.comments_count || 'N/A' }}
              <!-- entry.in_favorites_count -->
            </info-block>

            <info-block
              label="Favorites:"
            >
              {{ entry.in_favorites_count || '0' }}
              <span class="silent-link">
                (view)
              </span>
            </info-block>          
          </div>
        </details-block>
      </div>


    </div>
  </div>
</template>

<script>
import DetailsBlock from './DetailsBlock'
import InfoBlock from './InfoBlock'
import NotSpecified from '~/components/custom/NotSpecified'
import { ISOToDateOfBirth } from '~/helpers'
import { mapGetters } from 'vuex'
export default {
  props: {
    entry: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  components: {
    DetailsBlock,
    InfoBlock,
    NotSpecified
  },
  computed: {
    ...mapGetters([ 'isAuthorized' ]),

    checkFavPhoto () {
      return this.favPhoto.some(item => item.id == this.$route.query.id)
    },

    checkFavPhotograph () {
      return this.favPhotograph.some(item => item.id == this.entry.user.id)
    }
  },

  data () {
    return {
      id: this.$store.state.user.userId,
      votingBreakdown: null,
      isLoading: false,
      favPhoto: [],
      favPhotograph: []
    }
  },

  methods: {
    ISOToDateOfBirth,

    // updateProfileInfo () {
    //   this.loading = true

    //   this.$api
    //     .getUserInfo(this.id)
    //     .then(({ data: { result } }) => {
    //       this.user = result

    //     })
    //     .finally(_ => {
    //       this.loading = false
    //     })
    // },

    addPhotoToFavorite () {
      this.isLoading = true

      const data = {
        photo_id: this.entry.id
      }

      this.$api
        .addPhotoToFave(data)
        .then(({ data: { result } }) => {
        this.isLoading = false
        })
        .finally(_ => {
          this.isLoading = false
          this.getUserFavPhoto()
          this.$emit('updateEntry')
        })
    },

    removePhotoToFavorite() {
      this.isLoading = true
      const data = {
        photo_id: this.entry.id
      }
      this.$api
        .daletePhotoToFavorite(data)
        .then(({ data: { result } }) => {
          this.isLoading = false
          
        })
        .catch(err => {
          this.isLoading = false
        })
        .finally(_ => {
          this.isLoading = false
          this.getUserFavPhoto()
          this.$emit('updateEntry')
        })
    },

    getUserFavPhoto () {
      this.isLoading = true
      const data = {
        id: Number(this.id)
      }
      this.$api
        .getUserFavoritePhoto(data)
          .then(({ data: { result } }) => {
            this.favPhoto = result.items
            
            this.isLoading = false
          })
          .catch(err => {
            this.isLoading = false
            this.favPhoto = []
          })
          .finally(_ => {
            this.isLoading = false
          })
    },

    addPhotographtoFavorite () {
      this.isLoading = true
      const data = {
        id: this.entry.user.id
      }
      this.$api.addPhotographFavorite(data)
        .then(({ data: { result } }) => {
          
          this.isLoading = false
        })
        .catch(err => {
          this.isLoading = false
        })
        .finally(_ => {
          this.isLoading = false
          this.getPhotographToFavorite()
          this.$emit('updateEntry')
        })
    },

    getPhotographToFavorite() {
      this.isLoading = true
      this.$api.getPhotographFavorite(this.id)
        .then(({ data: { result } }) => {
          this.favPhotograph = result.photographers.items
          
          this.isLoading = false
        })
        .catch(err => {
          this.isLoading = false
          
        })
        .finally(_ => {
          this.isLoading = false
        })
    },

    removePhotographerFromFav() {
      this.isLoading = true
      const data = {
        id: this.entry.user.id,
        is_patch: true
      }
      this.$api.addPhotographFavorite(data)
        .then(({ data: { result } }) => {
          
          this.isLoading = false
        })
        .catch(err => {
          this.isLoading = false
        })
        .finally(_ => {
          this.isLoading = false
          this.getPhotographToFavorite()
          this.$emit('updateEntry')
        })
    }
  },

  created () {
    this.getUserFavPhoto()
    this.getPhotographToFavorite()
  }
}
</script>

<style lang="scss" scoped>
.details {

  &__voting-breakdown,
  // &__comment {
  //   grid-column: 1 / 3;
  // }

  .onlyinfo__fotograph {
    grid-column: 1 / 3;
  }

  &__comment {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    grid-row-gap: 10px;

    .header {
      grid-column: 1 / 3;
    }
  }
}

@media (max-width: 630px) {
  .details {
    &__info,
    &__stat {
      grid-column: 1 / 3;
    }
  }
}
</style>
