<template>
  <div>
    <Header />
    <div class="page" :class="{'page--main': this.$route.path === '/'}">
      <nuxt :key="$route.query.path || $route.path"/>

      <div class="page__footer">
        <Footer />
      </div>
    </div>
  </div>
</template>
<script>
  import MainNavbar from "@/components/layout/MainNavbar.vue";
  import MainFooter from "@/components/layout/MainFooter.vue";
  export default {
    components: {
      MainFooter,
      MainNavbar,
      Header: () => import('@/components/custom/Header/Header.vue'),
      Footer: () => import('./_footer')
    }
  }
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;

  &__footer {
    margin-top: auto;
  }
}
</style>
