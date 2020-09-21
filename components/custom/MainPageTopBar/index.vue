<template>
  <div class="bar">
    <!--Commented since there is no backend support for that.
    <membership
      class="bar__membership"
    /> -->

    <provide-feedback
      class="bar__provide-feedback"
    />

    <private-messaging-inbox
      class="bar__private-messaging-inbox"
    />
  </div>
</template>

<script>
import Membership from './Membership'
import PrivateMessagingInbox from './PrivateMessagingInbox'
import ProvideFeedback from './ProvideFeedback'
export default {
  components: {
    Membership,
    ProvideFeedback,
    PrivateMessagingInbox
  }
}
</script>

<style lang="scss" scoped>
.bar {
  max-width: 1300px;
  margin: 0 auto;
  padding-top: 30px;

  display: grid;
  grid-gap: 10px;
}

@media (min-width: 768px) {
  .bar {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
