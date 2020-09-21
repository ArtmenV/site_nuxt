<template>
  <div class="signup-page">
    <h3 class="main-header">
      Sign up to DPChallenge
    </h3>
    
    <h4 class="header">
      Spam Policy
    </h4>

    <div class="hint">
      If you are just signing up to post a link to your site or product, don't bother. <br>
      Such posts are considered spam. They will be removed immediately, and your account canceled.
    </div>

    <h4 class="header">
      Account information
    </h4>

    <div class="user">
      <fg-input
        class="user__username"
        v-model.trim="user.username" 
        placeholder="Username"
        :error="validation.username"
        required
      />

      <fg-input
        class="user__firstname"
        v-model.trim="user.firstName" 
        placeholder="First name"
        :error="validation.firstName"
        required
      />

      <fg-input 
        class="user__lastname"
        v-model.trim="user.lastName" 
        placeholder="Last name"
        :error="validation.lastName"
        required
      />

      <fg-input 
        class="user__email"
        v-model.trim="user.email" 
        placeholder="Email"
        :error="validation.email"
        required
      />

      <fg-input 
        class="user__password"
        v-model.trim="user.password" 
        placeholder="Password"
        type="password"
        :error="validation.password"
        required
      />

      <fg-input 
        class="user__password password--confirm"
        v-model.trim="user.passwordConfirmation" 
        placeholder="Confirm password"
        type="password"
        :error="validation.passwordConfirmation" 
        required
      />

    </div>

    <h4 class="header">
      Options & Agreement
    </h4>

    <div class="options">
      <!-- <el-checkbox v-model="options.ableToReadHtmlEmails" />

      <div class="label">
        I am able to read HTML emails (as opposed to text-only)
      </div>

      <el-checkbox v-model="options.sendWeeklyUpdate" />

      <div class="label">
        Send me the weekly update (challenge winners, upcoming challenges, etc.)
      </div> -->

      <el-checkbox v-model="options.notHoldingAnotherAccount" />

      <div class="label">
        I agree that I do not hold another account (cancelled or active) here at DPChallenge.com
      </div>

      <el-checkbox v-model="options.agreed" />

      <div class="label">
        By checking this box, I certify that I am 13 years old or older and that I have read and agree to the Registered User Agreement.
      </div>  
    </div>

    <Button
      @click.native="handleSubmit"
      type="info"
      round
      class="submit-btn"
      v-loading="loading"
    > 
      Sign up 
    </Button>
  </div>
</template>

<script>
import { FormGroupInput as FgInput } from '~/components'
import { Button } from '~/components'
import { Checkbox } from 'element-ui'

import { validator } from '~/helpers'

import Vue from 'vue'

Vue.use(Checkbox)

export default {
  components: { FgInput, Button },

  data () {
    return {
      user: {
        firstName: '',
        lastName: '',

        email: '',

        username: '',

        password: '',
        passwordConfirmation: ''
      },

      options: {
        ableToReadHtmlEmails: true,
        sendWeeklyUpdate: true,
        notHoldingAnotherAccount: true,
        agreed: false
      },

      loading: false,

      validation: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        passwordConfirmation: ''
      }
    }
  },

  methods: {
    handleSubmit () {
      if (this.validate()) {
        if (this.options.agreed && this.options.notHoldingAnotherAccount) {
          this.loading = true
    
          this.$api
            .requestSignUp({
              username: this.user.username,
              email: this.user.email,
              last_name: this.user.lastName,
              first_name: this.user.firstName,
              password: this.user.password
            })
            .then(r => {
              this.$router.push('/needs-confirmation?email=' + this.user.email)
            })
            .catch(({ response }) => {
              const messages = response.data.messages

  
              messages.forEach(message => {
                if (message.context.username) {
                  this.validation.username = message.context.username
                }
  
                if (message.context.email) {
                  this.validation.email = message.context.email
                }
              })
            })
            .finally(_ => {
              this.loading = false
            })
        } else {
          this.$alert('You must be 13 or older, agree that you do not hold another account and agree to the Registred User Agreement in order to register for the site.')
        }
      }
    },

    validate () {
      for (const prop in this.validation) {
        this.validation[prop] = ''
      }

      if (!validator.validateNotEmpty(this.user.username)) {
        this.validation.username = 'This field should not be empty'
      }

      if (!validator.validateNotEmpty(this.user.firstName)) {
        this.validation.firstName = 'This field should not be empty'
      }

      if (!validator.validateNotEmpty(this.user.lastName)) {
        this.validation.lastName = 'This field should not be empty'
      }

      if (!validator.validateNotEmpty(this.user.email)) {
        this.validation.email = 'This field should not be empty'
      } else if (!validator.validateEmail(this.user.email)) {
        this.validation.email = 'Email is invalid'
      }

      if (!validator.validateNotEmpty(this.user.password)) {
        this.validation.password = 'This field should not be empty'
      }

      if (!validator.validateNotEmpty(this.user.passwordConfirmation)) {
        this.validation.passwordConfirmation = 'This field should not be empty'
      } else if (!validator.validateConfirmation(this.user.password, this.user.passwordConfirmation)) {
        this.validation.passwordConfirmation = 'Passwords don\'t match'
      }

      for (const prop in this.validation) {
        if (this.validation[prop].length) {
          return false
        }
      }

      return true
    }
  }
}
</script>

<style lang="scss">
.signup-page {
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #606266;
  }

  .el-checkbox__label {
    max-width: 500px;
  }
}

.el-message-box__content {
  padding: 10px 25px;
}
</style>

<style lang="scss" scoped>
.signup-page {
  max-width: 500px;
  margin: 0 auto;

  .header {
    margin-top: 30px;
    margin-bottom: 0px;
  }

  .hint {
    margin: 10px 0;
  }

  .user {
    margin: 10px 0;
  }

  .options {
    margin: 10px 0;

    display: grid;
    grid-template-columns: 20px 1fr;
    grid-row-gap: 5px;
  }

  .submit-btn {
    width: 100%;
  }

  margin-bottom: 30px;
}

@media (min-width: 376px) {
  .user {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;

    &__username,
    &__email {
      grid-column: 1 / 3;
    }
  }
}
</style>