<template>
  <div class="block">
    <div class="block__header">
      <slot
        name="header"
      />
    </div>

    <div class="block__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.block {
  height: 100%;

  background: #ffffff;
  border: 1px solid #c4c4c4;
  border-radius: 3px;

  &__content,
  &__header {
    padding: 3px 10px;
  }

  &__header {
    background: #63748F;
    color: white;
    font-weight: bold;
  }
}
</style>
