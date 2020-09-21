<template>
  <footer class="page__footer">
    <div class="links">
      <a 
        v-for="link in links"
        :key="link.title"
        class="link"
      >
        {{ link.title }}
      </a>
    </div>

    <p>
      DPChallenge, and website content and design, Copyright © 2001-2020 Challenging Technologies, LLC. 
    </p>

    <p>
      All digital photo copyrights belong to the photographers and may not be used without permission. 
    </p>

    <p>
      Proudly hosted by Sargasso Networks. Current Server Time: 01/28/2020 06:31:39 AM EDT.
    </p>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      links: []
    }
  },

  mounted () {
    this.links = require('~/assets/config/footer-links.yml')
  }
}
</script>

<style lang="scss" scoped>
.page__footer {
  font-size: 11px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .link {
    margin: 0 5px;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}

p {
  color: rgb(17, 17, 17);
  // font-weight: bold;
  margin: 0 auto;
  font-size: 11px;
}
</style>