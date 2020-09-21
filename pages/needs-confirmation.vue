<template>
  <div class="needs-confirmation-page">
    <h3>
      ALMOST DONE!
    </h3>

    <div>
      You must confirm your email address before you'll be able to log into the site. We've sent confirmation instructions to the email you provided, {{ email }}. Please follow the simple instructions in that email to confirm your email address.
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    email () {
      return this.$route.query.email
    }
  }
}
</script>

<style lang="scss" scoped>
.needs-confirmation-page {
  max-width: 500px;
  margin: 0 auto;
  
  margin-top: auto;
  transform: translateY(-50%);
}
</style>
