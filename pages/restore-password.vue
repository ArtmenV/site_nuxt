<template>
  <div class="restore-password-container">
    <h3 class="header">
      Reset password by username or email
    </h3>

    <div class="reset">
      <fg-input
        v-if="!sended"
        class="reset__input"
        v-model="userdata" 
        placeholder="Enter email or username"
        @keyup.enter="handleSubmit"
      />

      <div v-else class="reset__userdata">
        {{ userdata }}
      </div>

      <Button
        type="info"
        class="reset__submit"
        @click.native="handleSubmit"
        v-loading="loading"
      >
        {{ !sended ? 'Restore password' : 'Resend email' }}
      </Button>
    </div>

    <div class="message" style="margin-top: 20px">
      {{ message }}
    </div>
  </div>
</template>

<script>
import { FormGroupInput as FgInput } from '~/components'
import { Button } from '~/components'

export default {
  components: { FgInput, Button },

  data () {
    return {
      userdata: '',

      message: '',

      sended: false,

      loading: false
    }
  },

  methods: {
    handleSubmit () {
      this.loading = true

      this.message = ''

      this.$api
        .resetPasswordRequest({
          user_input: this.userdata
        })
        .then(({ data }) => {
          this.message = 'Instructions on resetting your password have been sent to you at the e-mail address you registered with.'
          this.sended = true
        })
        .catch(({ response }) => {
          try {
            this.message = response.data.messages[0].context.user_input
          } catch (e) {
            this.message = 'Something went wrong'
          }
        })
        .finally(_ => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.restore-password-container {
  max-width: 500px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  .reset {
    display: grid;
    grid-template-columns: 1fr 150px;
    grid-column-gap: 10px;
    grid-row-gap: 20px;

    &__input {
      margin-bottom: 0;
    }

    &__submit {
      margin: 0;
    }

    &__userdata {
      display: flex;
      align-items: center;
    }
  }
}

@media (max-width: 560px) {
  .reset__submit,
  .reset__input {
    grid-column: 1 / 3;
  }
}

@media (min-height: 768px) {
  .restore-password-container {
    height: calc(100vh - 70px - 67px - 60px);
    justify-content: center;
  }
}
</style>