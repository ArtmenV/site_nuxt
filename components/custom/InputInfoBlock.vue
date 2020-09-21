<template>
  <div class="input-info-block">
    <div class="input-info-block__label">
      {{ label }}
    </div>

    <fg-input
      v-bind="$attrs"
      :value="value"
      @input="val => $emit('input', val)"
    />
  </div>
</template>

<script>
import {FormGroupInput as FgInput} from '~/components'

export default {
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },

    value: {
      type: String,
      required: true
    }
  },

  components: {
    FgInput
  }
}
</script>

<style lang="scss" scoped>
.input-info-block {
  &__label {
    font-size: 12px;

    text-transform: uppercase;
  }
}
</style>
