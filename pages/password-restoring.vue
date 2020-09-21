<template>
  <div class="password-resetting-page">
    <h3>
      Reset password
    </h3>

    <div class="reset-password-form">
      <fg-input 
        v-model="password" 
        placeholder="Enter new password"
        type="password"
        @keyup.native.enter="handleSubmit"
      />

      <fg-input 
        v-model="passwordConfirm" 
        placeholder="Confirm new password"
        type="password"
        @keyup.native.enter="handleSubmit"
        :error="error"
      />

      <Button
        @click.native="handleSubmit"
        type="info"
        v-loading="loading"
        style="width: 100%;"
      >
        Reset password
      </Button>
    </div>
  </div>
</template>

<script>
import { Button, FormGroupInput as FgInput } from '~/components'

export default {
  components: { FgInput, Button },

  data () {
    return {
      password: '',
      passwordConfirm: '',

      error: '',

      loading: false
    }
  },

  methods: {
    handleSubmit () {
      this.loading = true

      if (this.password !== this.passwordConfirm) {
        this.error = 'Passwords don\'t match'
      } else {
        const uid = this.$route.query.uid

        this.$api
          .resetPassword({
            uuid: uid,
            password: this.password
          })
          .then(({ data }) => {
            this.$router.push('/login')
          })
          .catch(e => {
            this.loading = false
          })
          .finally(_ => {
            this.loading = false
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.password-resetting-page {
  max-width: 500px;
  margin: 0 auto;

  margin-top: auto;
  transform: translateY(-50%);
  
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
