<template>
  <div
    class="entry-card-component"
    :style="{'--src': `url(${src})`}"
  >
  <nuxt-link :to="'/entry?id=' + photoId">
    <card class="enrty-card">
      <img
        class="enrty-card__image"
        slot="image"
        alt="Entry photo thumbnail"
        :src="src"
      >
      <slot />
    </card>
    </nuxt-link>
  </div>
</template>

<script>
import { Card } from '~/components'
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    photoId: {
      type: Number,
      required: true
    }
  },
  components: {
    Card
  }
}
</script>

<style lang="scss">
.entry-card-component {
  // width: 100px;
  .card-image {
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    overflow: hidden;

    height: 200px;

    img {
      z-index: 2;
      
      max-height: 100%;
      max-width: 100%;

      height: auto;
      width: auto;
    }

    &::before {
      content: '';
      
      position: absolute;

      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background-color: #F5F5F5;

      // filter: blur(3px);

      z-index: 0;

      // background: var(--src);
      background-position: center;
      background-size: cover;

      transform: scale(1.3);
    }
  }
}
</style>
