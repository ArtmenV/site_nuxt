<template>
  <el-button
    plain
    type="primary"
    size="mini"
    class="add"
    :loading="loading"
    @click="submit"
  >
    Add this photograph to your favorites
  </el-button>
</template>

<script>
import Vue from 'vue'

import { Button } from 'element-ui'

Vue.use(Button)

export default {
  data () {
    return {
      loading: false
    }
  },

  methods: {
    // FIXME
    submit () {
      this.loading = true

      setTimeout(() => {
        this.loading = false
      }, 750)
    }
  }
}
</script>

<style lang="scss" scoped>
.add {
  margin: 10px 0;
}
</style>
