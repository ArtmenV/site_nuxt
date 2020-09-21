<template>
  <div class="entry">
    <img
      class="entry__photo"
      :src="$api.resolveImageUrl(entry.path)"
      alt="entry photo"
    >
    <div class="entry__header_title">
      <div v-if="hideImage">
        <PlaceImage
          :place="entry.place"
        />
      </div>

      <h4 
        class="entry__name"
      >
        {{ entry.title || 'image title' }}
      </h4>
    </div>
    <div>
      for
            <!--  -->
      <!-- :to="'/profile?id=' + entry.user_id" -->
      <span
        class="link"
      >
        Standard Editing 
      </span>
        Challenge
      <nuxt-link
        class="link"
        :to="'/voting-entries?id=' + entry.challenge.id"
      >
        {{ entry.challenge.title }}
      </nuxt-link>
    </div>
    <div 
      class="entry__details"
      v-if="!hideImage"
    >
      for <span class="link">Standard Editing</span> Challenge
      
      <nuxt-link
        class="link"
        :to="linkToChallenge"
      >
        {{ entry.challenge.title }}
      </nuxt-link> 
    </div>
  </div>
</template>

<script>
import { toPlaceStr } from '~/helpers'
export default {
  components: {
    PlaceImage: () => import(`~/pages/_components/PlaceImage`)
  },

  props: {
    pagination: {
      type: Boolean,
      required: false,
      default: false
    },

    entry: {
      type: Object,
      required: true
    }
  },

  computed: {
    linkToChallenge () {
      const isVoting = this.$route.path === '/voting'

      if (isVoting) {
        return '/voting-entries?id=' + this.entry.challenge.challenge_id
      } else {
        return '/challenge-results?id=' + this.entry.challenge.challenge_id
      }
    },

    hideImage () {
      if (this.$route.path !== '/voting') {
        return true
      } else {
        false
      }
    },

    id () {
      return this.$route.query.id
    }
  },

  methods: { toPlaceStr }
}
</script>

<style lang="scss" scoped>
.entry {
  .next,
  .prev {
    color: #2c2c2c !important;
    text-decoration: none;
  }
}
</style>

<style lang="scss" scoped>
.entry {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__header_title {
    display: flex;
    justify-content: center;
    align-items: center;

    .entry__name {
      margin-left: 1rem !important;
    }
  }

  &__name,
  &__details {
    text-align: center;
  }

  &__name {
    margin: 5px 0;
  }

  &__photo {
    margin: 0 auto;
  }

  &__pagination {
    min-width: 100%;
    max-width: 600px;
    margin: 0 auto;
    margin-top: 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .prev,
    .next {
      display: flex;
      align-items: center;

      border: 1px solid #c4c4c4;
      border-radius: 3px;

      padding: 3px 8px;

      .divider {
        margin: 0 3px;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
