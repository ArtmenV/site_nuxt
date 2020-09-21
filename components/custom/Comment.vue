<template>
  <div class="comment">
    <div v-if="lightLabel" class="light-label">
      {{ lightLabel }}
    </div>

    <h6 v-else class="comment__header">
      Comment on this photograph:
    </h6>

    <no-ssr>
      <Editor
        @comment="dataComment"
        :challengeProps="challengeProps"
      />
    </no-ssr>
  </div>
</template>

<script>
import Vue from 'vue'

import { Rate, Button } from 'element-ui'

Vue.use(Rate)
Vue.use(Button)


export default {
  components: {
    Editor: () => import('~/components/custom/TipTopEditor.vue'),
  },

  props: {
    lightLabel: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: String,
      required: false,
      default: ''
    },
    challengeProps: {
      type: String,
      required: false,
    }
  },
  data () {
    return {
    }
  },
  methods: {
    dataComment (data) {
      this.$emit('comment', data)
    }
  }
}
</script>

<style>
.ck-editor__editable_inline {
  min-height: 145px;
}
</style>

<style lang="scss" scoped>
.light-label {
  font-size: 12px;
  text-transform: uppercase;
}
</style>
