<template>
  <div
    class="info-block"
    :class="{'info-block--short': isShort}"
  >
    <span class="info-block__label text--bold">
      {{ label }}
    </span>

    <span class="info-block__value">
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },

    isShort: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
