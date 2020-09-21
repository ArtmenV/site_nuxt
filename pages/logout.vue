<template>
  <div>
    signing out...
  </div>
</template>

<script>
export default {
  mounted () {
    this.$store.commit('user/logoutSilent')
    this.$router.push('/login')
  }  
}
</script>
