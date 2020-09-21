<template>
  <div class="message">
    <div class="message__subject">
      {{ subject }}
    </div>

    <div class="message__date">
      {{ date }}
    </div>

    <div class="message__from">
      <span
        class="text--muted"
      >
        from
      </span>

      {{ from }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    from: {
      type: String,
      required: true
    },

    subject: {
      type: String,
      required: true
    },

    date: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  display: grid;
  grid-template-columns: 2fr 1fr;

  &__date {
    text-align: right;
  }

  &__from {
    grid-column: 1 / 3;
  }
}
</style>
