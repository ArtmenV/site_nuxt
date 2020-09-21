<template>
  <div class="fsection">
    <div 
      class="column head-column"
    >
      <nuxt-link
        class="fsection__title link link--bold"
        :to="'/threads?section_id=' + section.id"
      >
        {{ section.title }}
      </nuxt-link>

      <div class="fsection__description">
        {{ section.description }}
      </div>
    </div>
    <div class="column center mob-hidden">
      {{section.threads_count}}
    </div>
    <div class="column center mob-hidden">
      {{section.posts_count}}
    </div>
    
    <div
      v-if="getData"
      class="column mob-hidden"
    >
      {{ section.last_post ? 
        ISOToReadableString(section.last_post.created_at, {year: true}) : 
        ""
      }}
      {{ section.last_post ? 
        formatAMPM(section.last_post.created_at) : 
        ""
      }}

      <span class="jimbo">by</span> 
      <nuxt-link
        class="link"
        :to="`/profile?id=${section.last_post.created_by.id}`"
      >
        {{  
          section.last_post ? 
          section.last_post.created_by.username : 
          ""
        }}
      </nuxt-link>

    </div>
  </div>
</template>

<script>
import { ISOToReadableString, formatAMPM } from '~/helpers'
export default {
  props: {
    section: {
      type: Object,
      required: true
    }
  },

  methods: {
    ISOToReadableString,
    formatAMPM
  },

  computed: {
    getData() {
      if (this.section.last_post) {
        return true
      } else {
        false
      }
    }
  } 
}
</script>

<style lang="scss" scoped>
.fsection {
  font-weight: normal;

  padding: 5px 10px;
  display: grid;
  grid-template-columns: 1fr 80px 80px 215px;

  .column {
    color: black
  }

  .center {
    display: flex;
    justify-content: center;
  }

  .jimbo {
    text-transform: lowercase;
  }
}

@media screen and (max-width: 680px){
  .fsection {
    grid-template-columns: 1fr;
  }
  .mob-hidden {
    display: none !important;
    grid-column: 1/4
  }
  .head-column {
    grid-column: 1/5
  }
}
</style>
