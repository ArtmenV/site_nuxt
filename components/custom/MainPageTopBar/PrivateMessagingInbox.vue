<template>
  <div class="private-messaging-inbox">
    <info-block-big>
      <template #header>
        <span class="silent-link">
          Private Messaging Inbox
        </span>
      </template>

      <template>
        <message-item
          from="ResettingSSSsss"
          subject="Just another letter..."
          date="Dec 23"
        />

        <nuxt-link
          class="view-all"
          to="/messaging"
        >
          <div class="view-all__text">
            View all
          </div>

          <i class="view-all__icon el-icon-right" />
        </nuxt-link>
      </template>
    </info-block-big>
  </div>
</template>

<script>
import InfoBlockBig from '~/components/custom/InfoBlockBig'
import MessageItem from './MessageItem'
export default {
  components: { InfoBlockBig, MessageItem }
}
</script>

<style lang="scss" scoped>
.view-all {
  color: #2c2c2c;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9em;

  cursor: pointer;
}
</style>
