<template>
  <div class="login-page">
    <h3 class="header">
      Login to account
    </h3>

    <div class="hint">
      Not registered yet?
      <span
        class="link"
        @click="$router.push('/signup')"
      >
        Click here
      </span>
      to register. It's FREE and only takes a minute.
    </div>

    <fg-input 
      v-model="user.login" 
      placeholder="login"
      @keyup.native.enter="handleSubmit"
      :error="validation.username"
      required
    />

    <fg-input 
      v-model="user.password" 
      placeholder="password"
      type="password"
      @keyup.native.enter="handleSubmit"
      :error="validation.password"
      required
    />

    <el-checkbox 
      class="no-margin" 
      name="check-message"  
      v-model="isSaveUser"
    >
      <span style="font-size: 12px">Remember me</span> 
    </el-checkbox >

    <el-alert
      v-if="error"
      :title="error"
      type="error"
      :closable="false"
    />

    <Button
      @click.native="handleSubmit"
      type="info"
      round
      v-loading="loading"
    > 
      Login 
    </Button>

    <div class="hint">
      Forgot your password?
      <span
        class="link"
        @click="$router.push('/restore-password')"
      >
        Click here
      </span>
      to restore.
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { validator } from '~/helpers'
import { Button, FormGroupInput as FgInput } from '~/components'
import { Alert, Checkbox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Alert)
Vue.use(Checkbox)

export default {
  components: { FgInput, Button },

  data () {
    return {
      user: {
        login: '',
        password: ''
      },

      isSaveUser: false,

      rememberMe: false,

      error: '',
      

      loading: false,

      validation: {
        username: '',
        password: '',
      }
    }
  },

  methods: {
    handleSubmit () {
      this.loading = true
      
      this.$api
        .login({
          username: this.user.login,
          password: this.user.password
        })
        .then(r => {
          if ( this.isSaveUser === true ) {
            this.$store.commit('user/loginSave', r.data)
          } else {
            this.$store.commit('user/login', r.data)
          }

          // this.$store.commit('user/loginSave', r.data)

          if (this.$route.query && this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect)
          } else {
            this.$router.push('/')
          }
        })
        .catch(res => {
          this.error = 'Bad username or password'
        })
        .finally(_ => {
          this.loading = false
        })
    },

    validate () {
      for (const prop in this.validation) {
        this.validation[prop] = ''
      }

      if (!validator.validateNotEmpty(this.user.username)) {
        this.validation.username = 'This field should not be empty'
      }

      if (!validator.validateNotEmpty(this.user.password)) {
        this.validation.password = 'This field should not be empty'
      }

      for (const prop in this.validation) {
        if (this.validation[prop].length) {
          return false
        }
      }

      return true
    }
  },

  watch: {
    isSaveUser (val) {
      if ( val === true ) {
        this.$notify.warning({
          title: 'Warning',
          message: ('i', { style: 'color: steal' }, `We use cookie to ensure you the best experience. 
                                                      By using our website you agree to our Cookie Policy`),
          duration: 7000
        });
      }
    }
  },

  mounted () {
    
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  width: 330px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  .header {
    margin-bottom: 0px;
    margin-top: 0;
  }

  .hint {
    margin: 10px 0;
    font-size: 13px;
  }
}

@media (min-height: 768px) {
  .login-page {
    height: calc(100vh - 70px - 67px - 60px);
    justify-content: center;
  }
}
</style>