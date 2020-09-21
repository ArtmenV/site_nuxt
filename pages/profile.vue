<template>
  <div
    class="profile-page"
    v-loading="isLoading"
  >
    <h3 class="header header--main">
      User Profile
    </h3>

    <div class="profile" v-if="user">
      <div class="profile__photo">
        <img
          v-if="!user.user_image"
          src="https://images.dpchallenge.com/images_profile/120_nopicture.png"
          alt="no profile photo"
        >

        <img
          v-else
          :src="$api.resolveImageUrl(user.user_image)"
          alt="profile photo"
        >
      </div>

      <div class="profile__info">
        <div class="label"> Name </div>
        <div class="value"> {{ user.first_name + ' ' + user.last_name }} </div>

        <div class="label"> Username </div>
        <div class="value"> {{ user.username }} </div>

        <!-- <div class="label"> Type </div>
        <div class="value"> Registered User	</div> -->

        <div class="label"> Website </div>
        <div class="value link">
          <span v-if="user.website">
            {{ user.website }}
          </span>

          <not-specified
            v-else
          />
        </div>

        <!-- <div class="label"> Registered </div>
        <div class="value"> Jul. 22nd 2019 </div> -->

        <div class="label"> Date of Birth </div>
        <div class="value">
          <span v-if="user.birth_date">
            {{ ISOToDateOfBirth(user.birth_date) }}
          </span>

          <not-specified
            v-else
          />
        </div>

        <div class="label"> Contact </div>
        <nuxt-link
          class="value link"
          :to="privateMessagesLink"
        >
          Private Message
        </nuxt-link>

        <!-- <div class="label"> Contact </div> -->
        <!-- <div class="label"> Location </div>
        <div class="value"> ResettingSSSss </div> -->

        <!-- <div class="label"> Cameras </div>
        <div class="value text--bold silent-link"> Alcatel One Touch </div> -->

        <!-- <div class="label"> Lenses </div>
        <div class="value text--bold silent-link"> Helios 40-2 85mm f/1.5 </div> -->
      </div>
    </div>
    <div class="label-bio">
      Biography:
    </div>

    <!-- User biography -->
    <div class="info-block" v-if="user">
      <span
        v-if="user.bio"
        v-html="user.bio"
      > 
      </span>
    </div>

    <div class="label-bio">
      Signature:
    </div>
    <div class="info-block" v-if="user">
      <span
        v-if="user.signature"
        v-html="user.signature"
      > 
      </span>
    </div>
      <not-specified
        v-else
      />

      <div 
        class="profile__links"
        v-loading="isLoadingFav"
      >
        <nuxt-link
          class="row-item silent-link highlighted text--bold"
          :to="`/portfolio/user?user_id=${id}&path=` + 'portfolio'"
          style="margin-bottom: .4rem"
        >
          <svg 
            class="profile__links_item"
            width="27" height="16" viewBox="0 0 27 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H27V9.75H14V0ZM14.8125 0.8125V8.9375H26.1875V0.8125H14.8125ZM15.63 8.14662C15.63 8.14662 16.475 2.44048 17.7296 2.44048C18.9843 2.44048 19.5339 6.46548 20.5432 6.46548C21.5526 6.46548 21.4765 4.89275 22.2155 4.89275C22.9544 4.89275 25.4978 8.14662 25.4978 8.14662H15.63ZM24.1562 4.0625C23.4832 4.0625 22.9375 3.51685 22.9375 2.84375C22.9375 2.17065 23.4832 1.625 24.1562 1.625C24.8293 1.625 25.375 2.17065 25.375 2.84375C25.375 3.51685 24.8293 4.0625 24.1562 4.0625Z" fill="#155885"/>
            <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="#155885"/>
            <path d="M8 10C1.9 10 0 14 0 14V16H16V14C16 14 14.1 10 8 10Z" fill="#155885"/>
          </svg>

          View this photographer's portfolio!
        </nuxt-link>

        <!-- <nuxt-link
          v-if="addToFav"
          class="row-item silent-link highlighted text--bold"
          :to="'/profile'"
        >
          <svg 
            class="profile__links_item"
            width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="#155885"/>
            <path d="M8 10C1.9 10 0 14 0 14V16H16V14C16 14 14.1 10 8 10Z" fill="#155885"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18 3H16V6H13V8H16V11H18V8H21V6H18V3Z" fill="#155885"/>
          </svg>
          Add this photographer to your favorites!
        </nuxt-link> -->

        <span
          v-if="addToFav && !checkFavPhotograph"
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
          v-if="addToFav && checkFavPhotograph"
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
    
      <div class="header__table">
        Challenge Entries
      </div>
  
      <div class="table" 
        v-if="userChallenge"
      >
        <div class="table-row-entries row--header">
          <div class="row_item item--desktop">Title</div>
          <div class="row_item">Challenge</div>
          <div class="row_item item--desktop">Date</div>
          <div class="row_item item--desktop">Avg%</div>
          <div class="row_item item--desktop">Place</div>
          <div class="row_item item--desktop">%</div>
          <div class="row_item item--desktop">Comments</div>
          <div class="row_item item--desktop">Views</div>
          <div class="row_item item--desktop">Faves</div>
        </div>
        <div 
          v-for="item in userChallenge"
          :key="item.id"
          class="table-row-entries"
        >
          <nuxt-link
            class="row-item silent-link highlighted text--bold item--desktop"
            :to="'/voting-preview?id=' + item.id"
          >
            {{ item.title || 'Fall' }}
          </nuxt-link>
          <nuxt-link
            class="row-item silent-link highlighted text--bold"
            :to="'/challenge-submission?id=' + item.challenge.id"
          >
            {{ item.challenge.title }}
          </nuxt-link>
          <div class="row-item item--desktop">
            {{ timeAgo(item.challenge.submission_end_date) }}
          </div>
          <div class="row-item item--desktop">
            {{ item.avg_score }}
          </div>
            <div class="row-item item--desktop">
            {{ item.place }}
          </div>
          <div class="row-item item--desktop">
            {{ item.place }}
          </div>
          <div class="row-item item--desktop">
            {{ item.comments_count || '0' }}
          </div>
          <div class="row-item item--desktop">
            {{ item.views_count || '0' }}
          </div>
          <div class="row-item item--desktop">
            {{ item.in_favorites_count || '0' }}
          </div>
        </div>
        <el-pagination
          v-if="userChallenge"
          layout="prev, pager, next"
          background
          :page-count="1"
          @current-change="page => $emit('page-change', page)"
          class="thread__pagination"
        /> 
      </div>
      <div class="no-posts" v-else>
        This user has not participated in a challenge yet.
      </div>

    
    <!-- Threads activity table-->
      <div class="header__table">
        Last 10 Forum Threads Posted To
      </div>

      <div class="table" 
        v-if="userChallenge"
        >
        <div class="table-row row--header thread">
        <div class="row-item">Subject</div>
          <div class="row-item item--desktop">Section</div>
          <div class="row-item item--desktop">Date</div>
        </div>
        <div 
          v-for="item in lastThread"
          :key="item.id"
          class="table-row"
        >
          <nuxt-link
            class="row-item silent-link highlighted text--bold"
            :to="'/thread?id=' + item.id"
          >
            {{ item.title }}
          </nuxt-link>
          <nuxt-link
            class="row-item link item--desktop"
            :to="'/threads?section_id=' + item.section.id"
          >
            {{ item.section.title }}
          </nuxt-link>
          <div class="row-item item--desktop">
            {{ timeAgo(item.last_user_post_date) }}
          </div>
        </div>
        <el-pagination
          v-if="lastThread"
          layout="prev, pager, next"
          background
          :page-count="1"
          class="thread__pagination"
        /> 
      </div>
  <!-- hide-on-single-page -->
    <div 
      class="no-posts"
      v-else
    >
      This user has never posted in the DPChallenge forums.
    </div>

    
    <!-- @current-change="page => $emit('page-change', page)" -->
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css';
import { Pagination } from 'element-ui'
import { timeAgo } from '~/utils/datePrettier.js'
import NotSpecified from '~/components/custom/NotSpecified'
import { ISOToDateOfBirth } from '~/helpers'

export default {
  components: {
    NotSpecified
  },
  computed: {
    privateMessagesLink () {
      if (this.pmThreadId) {
        return '/messaging?thread_id=' + this.pmThreadId
      } else {
        return '/messaging?user_ids=' + (this.$route.query.id || this.id)
      }
    },

    addToFav () {
      if (this.$store.state.user.userId !== this.id) {
        // debugger
        return true 
      } else {
        return false
      }
    },

    checkFavPhotograph () {
      if (this.$store.state.user.userId !== this.id && this.user) {
        return this.favPhotograph.some( item => item.id == this.user.id )
      } 
    }
  },
  data () {
    return {
      id: this.$store.state.user.userId,
      // userId:  this.$store.state.user.userId,
      user: null,
      userChallenge: null,
      lastThread: null,
      isLoadingFav: false, 
      isLoading: false,
      pmThreadId: '',
      favPhotograph: []
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
    }
    this.updateProfileInfo(),
    this.getUserActivity()
    this.getPhotographToFavorite()
  },
  methods: {
    timeAgo,
    updateProfileInfo () {
      this.isLoading = true

      this.$api
        .getUserInfo(this.id)
        .then(({ data: { result } }) => {
          this.user = result

          this.pmThreadId = result.message_thread_id
        })
        .finally(_ => {
          this.isLoading = false
        })
    },
    getUserActivity () {
      this.isLoading = true

      this.$api
        .getUserActivity(this.id)
        .then(({ data: { result } }) => {
          this.userChallenge = result.challenge_entries.items
          this.lastThread = result.threads.items
          this.pmThreadId = result.userChallenge
        })
        .finally(_ => {
          this.isLoading = false
        })
    },
    ISOToDateOfBirth,

    addPhotographtoFavorite () {
      this.isLoading = true
      const data = {
        id: this.user.id
      }
      this.$api.addPhotographFavorite(data)
        .then(({ data: { result } }) => {
          
          this.isLoading = false
          this.getPhotographToFavorite()
        })
        .catch(err => {
          this.isLoading = false
          this.getPhotographToFavorite()
        })
        .finally(_ => {
          this.isLoading = false
          this.$emit('updateEntry')
        })
    },

    getPhotographToFavorite () {
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

    removePhotographerFromFav () {
      this.isLoading = true
      const data = {
        id: this.user.id,
        is_patch: true
      }
      this.$api.addPhotographFavorite(data)
        .then(({ data: { result } }) => {
          
          this.isLoading = false
          this.getPhotographToFavorite()
        })
        .catch(err => {
          this.isLoading = false
          this.getPhotographToFavorite()
        })
        .finally(_ => {
          this.isLoading = false
          this.$emit('updateEntry')
        })
    }
  }
}
</script>

<style lang="scss">
.info-block {
  img {
    width: 180px;
    height: auto;
    margin: 5px 5px 5px 0;
  }
}
</style>

<style lang="scss" scoped>
.profile-page {
  width: 80%;
  margin: 0 auto;

  .profile {
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-column-gap: 10px;

    margin-bottom: 20px;

    &__info {
      display: grid;
      grid-template-columns: 120px 1fr;
      grid-column-gap: 10px;
      grid-row-gap: 5px;

      .label {
        font-weight: bold;

        text-align: right;
      }
    }
  }

  .header {
    margin: 20px 0;
  }

  .header {
    font-size: 16px;
    
    &--main {
      font-size: 18px;
    }
  }
}

.label-bio {
  font-weight: bold;
  // text-align: right;
}

.header__table {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 30px;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;

  border-bottom: 1px solid #ddd;

  min-height: 50px;

  &.row--header {
    background: #63748F;
    color: white;
    font-weight: bold;

    border-bottom: none;
  }
  .row-item {
    padding-left: 10px;

    display: flex;
    align-items: center;
  }
}

.table-row-entries {
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 1fr 1fr 1fr 1.3fr 1.3fr 1.3fr;

  border-bottom: 1px solid #ddd;

  min-height: 50px;

  &.row--header {
    background: #63748F;
    color: white;
    font-weight: bold;

    border-bottom: none;
  }

  .row-item {
    padding-left: 10px;
    display: flex;
    align-items: center;
  }

  .row_item {
    padding-left: 10px;

    display: flex;
    align-items: center;
  }
}

.profile__links {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;

  .profile__links_item {
    margin-right: .5rem;
  }
}

.item--desktops {
  display: flex;
  justify-content: center;
  padding-left: 0 !important;
}

.thread__pagination {
  display: flex;
  justify-content: center;

  margin-top: 20px;
}

    // // //container
.latest-forum-activity-container {
  max-width: 1300px;
  margin: 0 auto;

  margin-bottom: 40px;

  .header {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .table-row {
    display: grid;
    grid-template-columns: 1fr 200px 280px 180px;

    border-bottom: 1px solid #ddd;

    min-height: 50px;

    &.row--header {
      background: #63748F;
      color: white;
      font-weight: bold;

      border-bottom: none;
    }

    .row-item {
      padding-left: 10px;

      display: flex;
      align-items: center;
    }
  }

  .table-row:last-child {
    border-bottom: none;
  }
}

@media (max-width: 900px) {
  .table {
    .table-row {
      grid-template-columns: 1fr;
    }

    .item--desktop {
      display: none !important;
    }
  }
}

.latest-forum-activity-container {
  max-width: 1300px;
  margin: 0 auto;

  margin-bottom: 40px;

  .header {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .table-row {
    display: grid;
    grid-template-columns: 1fr 200px 280px 180px;

    border-bottom: 1px solid #ddd;

    min-height: 50px;

    &.row--header {
      background: #63748F;
      color: white;
      font-weight: bold;

      border-bottom: none;
    }

    .row-item {
      padding-left: 10px;
      display: flex;
      align-items: center;
    }
  }

  .table-row:last-child {
    border-bottom: none;
  }
}

@media (max-width: 900px) {
  .table {
    .table-row {
      grid-template-columns: 1fr;
    }

    .item--desktop {
      display: none !important;
    }
  }

  .latest-forum-activity-container {
    .table-row-entries{
      display: flex;
      justify-content: center;
      flex-direction: column;

      .item--desktop {
        display: none !important;
      }
    }
  }
}

@media (max-width: 480px) {
  .profile-page {
    width: 88%;

    .profile {
      display: flex !important;
      flex-direction: column;
      justify-content: flex-start;

      .profile__photo {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 1.3rem;
      }

      .profile {
        display: grid;
        grid-template-columns: 100px 1fr;
        grid-column-gap: 10px;
        margin-bottom: 20px;

      &__info {
        display: grid;
        grid-template-columns: 120px 1fr;
        grid-column-gap: 10px;
        grid-row-gap: 5px;

        .label {
          font-weight: bold;

          text-align: left;
        }
      }
      }
    }
  }
}
</style>
