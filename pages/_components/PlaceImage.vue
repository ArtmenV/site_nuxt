<template>
  <div>
    <img :src="imgSrc" alt="honor">
  </div>
</template>

<script>
export default {
  props: [ 'place' ],

  computed: {
    imgSrc () {
      switch(this.place) {
        case 1: return 'https://www.dpchallenge.com/images/ribbig1.gif'
        case 2: return 'https://www.dpchallenge.com/images/ribbig2.gif'
        case 3: return 'https://www.dpchallenge.com/images/ribbig3.gif'
        default: return 'https://www.dpchallenge.com/images/rib4.gif'
      }
    }
  }
}
</script>