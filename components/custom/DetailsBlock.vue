<template>
  <div class="block">
    <div
      class="block__header"
      :class="{'header--dq': dq}"
    >
      <slot
        name="header"
      />
    </div>

    <div class="block__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dq: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  background: #ffffff;
  
  border: 1px solid #c4c4c4;
  border-radius: 3px;

  height: 100%;

  &__header {
    border-bottom: 1px solid #c4c4c4;
    padding: 3px 10px;

    color: white;
    background: hsl(207, 20%, 47%);

    &.header--dq {
      background: #CC9999;
    }
  }

  &__body {
    padding: 3px 10px;
  }
}
</style>
