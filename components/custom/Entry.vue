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
        {{ entry.title }}
      </h4>
    </div>
    <nuxt-link
      v-if="$route.path !== '/voting'"
      class="link"
      :to="'/profile?id=' + entry.user.id"
    >
      {{ entry.user.username }}
    </nuxt-link>

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

    <div
      class="entry__pagination"
    >
        <nuxt-link
          class="prev"
          v-if="entry.previous_entry && $route.path !== '/voting'" 
          @click.native="$emit('page-change') && $emit('dataEditor')"
          :to="{name: pagination ? 'entry' : 'voting', query: { id: entry.previous_entry.photo_id }}"
        >
          <i class="el-icon-back" />
          
          <div class="divider"></div>

          {{ pagination ? toPlaceStr(entry.previous_entry.place) + ' place' : 'previous' }}
        </nuxt-link>

        <div 
          v-if="!entry.previous_entry && $route.path !== '/voting'"
          >
        </div>
        
        <nuxt-link
          class="next"
          v-if="entry.next_entry && $route.path !== '/voting'"
          @click.native="$emit('page-change') && $emit('dataEditor')"
          :to="{name: pagination ? 'entry' : 'voting', query: { id: entry.next_entry.photo_id }}"
        >
          {{ pagination ? toPlaceStr(entry.next_entry.place) + ' place' : 'next' }}

          <div class="divider"></div>

          <i class="el-icon-right" />
        </nuxt-link>

      <!-- <div v-if="$route.path === '/voting'"> -->
        <nuxt-link
          class="prev"
          v-if="$route.path === '/voting'"
          @click.native="$emit('page-change') && $emit('dataEditor')"
          :to="{name: pagination ? 'entry' : 'voting', query: { id: getPrevImage.id }}"
        >
          <i class="el-icon-back" />
          
          <div class="divider"></div>

          {{ pagination ? toPlaceStr(entry.previous_entry.place) + ' place' : 'previous' }}
        </nuxt-link>

        <!-- <div v-else></div> -->
        
        <nuxt-link
          class="next"
          v-if="$route.path === '/voting'"
          @click.native="$emit('page-change') && $emit('dataEditor')"
          :to="{name: pagination ? 'entry' : 'voting', query: { id: getNextImage.id }}"
        >
          <!-- :to="`/${pagination ? 'entry' : 'voting'}?id=${entry.next_entry.photo_id}`" -->
          {{ pagination ? toPlaceStr(entry.next_entry.place) + ' place' : 'next' }}

          <div class="divider"></div>

          <i class="el-icon-right" />
        </nuxt-link>
      <!-- </div> -->

      
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

  data () {
    return {
      listVoting: null,
      newListVoting: null,
      currentImage: null,
      nextImage: null,
      prevImage: null
    }
  },

  computed: {
    linkToChallenge () {
      const isVoting = this.$route.path === '/voting'

      if (isVoting) {
        return '/voting-entries?id=' + this.entry.challenge.id
      } else {
        return '/challenge-results?id=' + this.entry.challenge.id
      }
    },

    getArrayWithIndex () {
      return this.listVoting.map((item, index) => {
          return {
            ...item,
            id_pagination: index + 1,
          }     
        })
    },

    getCurrentImageObject () {
      return this.getArrayWithIndex.find(item => item.id == this.id)
    },

    getNextImage () {
      if (this.getArrayWithIndex.length == this.getCurrentImageObject.id_pagination) {
        return this.getArrayWithIndex.find(item => item.id_pagination == 1)
      } else {
        return this.getArrayWithIndex.find(item => item.id_pagination == this.getCurrentImageObject.id_pagination + 1)
      }
    },

    getPrevImage () {
      const lengthArray = (this.getArrayWithIndex.length)
      if (this.getCurrentImageObject.id_pagination == 1) {
        return this.getArrayWithIndex.find(item => item.id_pagination == lengthArray)
      } else {
        return this.getArrayWithIndex.find(item => item.id_pagination == (this.getCurrentImageObject.id_pagination - 1))
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

  methods: { toPlaceStr },

  created () {
    this.listVoting = JSON.parse(localStorage.getItem('data'))
  }
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
  margin-bottom: 1.2rem;

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
