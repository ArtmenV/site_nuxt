<template>
  <div class="entry">
    <img
      class="entry__photo"
      :src="$api.resolveImageUrl(entry.path)"
      alt="entry photo"
    >
    <div style="display: flex; 
        flex-direction: column
        justify-content: center;
        align-items: center
      ">
      <h4 
        class="entry__name"
      >
        {{ entry.title }}
      </h4>

      <nuxt-link
        class="link"
        :to="'/profile?id=' + entry.user.id"
      >
        {{ entry.user.username }}
      </nuxt-link> 
    </div>

    <!--<div 
      class="entry__details"
    >
      for <span class="link">Standard Editing</span> Challenge
      
      <nuxt-link
        class="link"
        :to="linkToChallenge"
      >
        {{ entry.challenge.title }}
      </nuxt-link> 
    </div>

    <div
      class="entry__pagination"
    >
      <nuxt-link
        class="prev"
        v-if="entry.previous_entry"
        @click.native="$emit('page-change')"
        :to="{name: pagination ? 'entry' : 'voting', query: { id: entry.previous_entry.photo_id }}"
      >
        <i class="el-icon-back" />
        
        <div class="divider"></div>

        {{ pagination ? toPlaceStr(entry.previous_entry.place) + ' place' : 'previous' }}
      </nuxt-link>

      <div v-else></div>

      <nuxt-link
        class="next"
        v-if="entry.next_entry"
        @click.native="$emit('page-change')"
        :to="{name: pagination ? 'entry' : 'voting', query: { id: entry.next_entry.photo_id }}"
      > -->
        <!-- :to="`/${pagination ? 'entry' : 'voting'}?id=${entry.next_entry.photo_id}`" -->
        <!-- {{ pagination ? toPlaceStr(entry.next_entry.place) + ' place' : 'next' }}

        <div class="divider"></div>

        <i class="el-icon-right" />
      </nuxt-link>

      <div v-else></div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { toPlaceStr } from '~/helpers'
export default {
  props: {
    pagination: {
      type: Boolean,
      required: false,
      default: false
    },

    entry: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      id: this.$store.state.user.userId,
    }
  },

  methods: { 
    toPlaceStr
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
  },
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
  flex-direction: column;

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

@media screen and (max-width: 520px) {
  .entry {
    &__photo {
      margin: 0 auto;
      // max-width: 380px;
    }
  }
}

</style>
