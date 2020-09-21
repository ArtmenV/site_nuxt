<template>
  <div class="email-confirmation-page">
    <h3>
      Email confirmation is in progress...
    </h3>

    <div
      class="spinner"
      v-loading="loading"
    ></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },

  mounted () {
    this.loading = true
    this.$api
      .emailConfirmation(this.$route.query.uid)
      .then(_ => {
        this.$router.push('/login?confirmed=true')
      })
      .catch(e => {
      })
      .finally(_ => {
        this.loading = false
      })
  }
}
</script>

<style lang="scss" scoped>
.email-confirmation-page {
  max-width: 500px;
  margin: 0 auto;

  .spinner {
    width: 100%;
    height: 100px;
  }
}
</style>
