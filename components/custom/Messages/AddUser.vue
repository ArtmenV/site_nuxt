<template>
  <div
    class="add-user"
    v-loading="loading"
  >
    <el-autocomplete
      v-if="inputVisible"
      v-model="state"
      size="small"
      placeholder="Enter user's name"
      :fetch-suggestions="fetchSuggestions"
      @select="handleSelect"
      value-key="username"
    />

    <el-button
      v-else
      size="small"
      @click="inputVisible = true"
    >
      + Add user
    </el-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Autocomplete } from 'element-ui'
Vue.use(Autocomplete)
export default {
  data () {
    return {
      inputVisible: false,
      loading: false,
      state: ''
    }
  },
  methods: {
    fetchSuggestions (searchQuery, cb) {
      if (searchQuery.length < 2) {
        cb([])
      } else {
        this.$api
          .searchUsers(searchQuery)
          .then(({ data: { result } }) => {
            cb(result.items)
          })
      }
    },
    handleSelect (user) {
      this.loading = true

      this.$api
        .addUsersToPM({
          thread_id: +this.$route.query.thread_id,
          user_ids: [user.id]
        })
        .then(({ data: { result } }) => {
          this.$emit('user-added', {
            username: user.username,
            user_id: user.id
          })
        })
        .catch(({ response }) => {
          console.error(response.data.status_code)

          const getErrorMessage = err => {
            const code = err.data.status_code

            switch (code) {
              case 403: return 'Only creator of the thread can add users'
              case 404: return 'User is already added to this conversation'
              case 500: return 'Internal server error'
              default: return 'Something went wrong'
            }
          }

          this.$message({
            type: 'error',
            message: getErrorMessage(response)
          })
        })
        .finally(_ => {
          this.loading = false
          this.inputVisible = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-user {
  display: inline-block;
  margin-left: 10px;
}
</style>
