<template>
  <div class="new-message">
    <el-input
      v-model="subject"
      placeholder="Enter message subject..."
    />

    <el-autocomplete
      v-model="username"
      :fetch-suggestions="searchUsers"
      placeholder="Please input username to search..."
      @select="handleUserSelect"
      value-key="username"
    />

    <div
      class="new-message__participants participants"
      v-if="selectedUsers.length"
    >
      <div class="participants__header">
        Added users
      </div>

      <el-tag
        class="participants__list"
        v-for="user in selectedUsers"
        :key="user.id"
        closable
        size="mini"
        @close="handleUserRemove(user.id)"
      >
        {{ user.username }}
      </el-tag>
    </div>

    <el-alert
      :title="error"
      type="error"
      v-if="error.length"
      :closable="false"
    />

    <el-button
      type="primary"
      plain
      :loading="loading"
      @click="handleSubmit"
    >
      Start conversation
    </el-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Input, Autocomplete, Tag, Alert } from 'element-ui'
Vue.use(Input)
Vue.use(Tag)
Vue.use(Autocomplete)
Vue.use(Alert)
export default {
  data () {
    return {
      loading: false,
      username: '',
      selectedUsers: [],
      subject: '',
      error: ''
    }
  },
  methods: {
    handleSubmit () {
      this.error = ''

      if (this.subject.length && this.selectedUsers.length) {
        this.loading = true

        const userIds = this.selectedUsers.reduce((acc, curr) => {
          return [...acc, curr.id]
        }, [])

        this.selectedUsers.forEach(el => {
          userIds.push()
        })

        this.$api
          .createPMThread({
            user_ids: userIds,
            title: this.subject
          })
          .then(({ data: { result } }) => {
            this.$router.push('/messaging?thread_id=' + result.thread_id)
          })
      } else if (!this.selectedUsers.length) {
        this.error = 'You cannot create conversation without any user'
      } else {
        this.error = 'Subject cannot be blank'
      }
    },
    searchUsers (searchQuery, cb) {
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
    handleUserSelect (user) {
      if (this.error.includes('user')) {
        this.error = ''
      }

      this.selectedUsers.push(user)

      this.username = ''
    },
    handleUserRemove (id) {
      this.selectedUsers = this.selectedUsers
        .filter(el => el.id !== id)
    }
  }
}
</script>

<style lang="scss" scoped>
.new-message {
  display: grid;
  grid-row-gap: 10px;

  &__participants {
    .participants__header {
      text-transform: uppercase;
      font-size: 12px;
      margin-bottom: 10px;
    }
  }
}
</style>
