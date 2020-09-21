<template>
  <div class="prifile--container">
    <no-ssr>
      <nuxt-link
        v-if="getCountUnreadMessage && isAuthorized"
        class="mail--notification"
        to="/messages"
      >
        <div>
          <div class="count">
            <span class="number">{{ getCountUnreadMessage }}</span>
          </div>
          <i class="fas fa-envelope"></i>
        </div>
      </nuxt-link>
      <div class="profile" :class="{'profile--unauthorized': !isAuthorized}">
        <nuxt-link
          class="profile__photo"
          to="/profile"
        >
        <div class="profile__photo-container">
          <img
            :src="avatarSrc"
            alt="Profile photo"
          >
        </div>

        </nuxt-link>

        <nuxt-link
          class="profile__name silent-link"
          to="/profile"
        >
          {{ $store.state.user.username }}
        </nuxt-link>

        <div
          class="profile__sign sign--out link"
          @click="$store.commit('user/logout')"
        >
          Sign out
        </div>

        <nuxt-link
          class="profile__sign sign--up link text--bold"
          to="/signup"
        >
          Sign up
        </nuxt-link>

        <nuxt-link
          class="profile__sign sign--in link"
          to="/login"
        >
          Sign in
        </nuxt-link>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters( {
      unreadMessages: 'messaging/setUnreadMessageStatus',
      getCountUnreadMessage: 'messaging/getCountUnreadMessage'
    }),
    isAuthorized () {
      return !!this.$store.state.user.username
    },

    avatarSrc () {
      if (this.$store.state.user.userAvatarLink) {
        return this.$api.resolveImageUrl(this.$store.state.user.userAvatarLink)
      } else {
        return require('~/assets/images/avatar-placeholder.svg')
      }
    }
  },

  data () {
    return {
      imgSrc: require('~/assets/images/avatar-placeholder.svg'),
      unreadMessageData: '',
    }
  },

  methods: {
    ...mapActions({
      checkUnreadMessage: 'messaging/checkUnreadMessage'
    }),
  },

  watch: {
    isAuthorized () {
      this.checkUnreadMessage()
    }
  },

  mounted () {
    if ( this.isAuthorized ) {
      this.checkUnreadMessage()
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  width: 240px;
  
  display: grid;
  grid-template-columns: 42px 1fr;
  grid-column-gap: 10px;
  margin: 0 auto;

  &.profile--unauthorized {
    display: flex;

    .profile__name,
    .profile__photo {
      display: none;
    }

    .profile__sign {
      &.sign--up {
        margin-right: 10px;
      }

      &.sign--in,
      &.sign--up {
        display: initial;
      }

      &.sign--out {
        display: none;
      }
    }
  }

  .profile__sign.sign--in,
  .profile__sign.sign--up {
    display: none;
  }

  &__name {
    font-weight: bold;

    color: #2c2c2c;
  }

  &__photo {
    grid-row: 1 / 3;
    display: flex;
    justify-content: center;
    border-radius: 100%;

    .profile__photo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 100%;
      max-height: 45px;
      border-radius: 100%;
      overflow: hidden;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.prifile--container {
  display: grid;
  grid-template-columns: 50px 120px;

  .mail--notification {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #63748F;
    grid-row: 1 / 3;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    font-size: 21px;
    position: relative;
    cursor: pointer;
    align-self: center;
    margin-right: 1.5rem;

    .count {
      top: 0;
      right: 0; 
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: rgb(255, 0, 0);
      position: absolute;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;

      .number {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 12px;
      }
    }

    i {
      font-size: 18px;
      color: white
    }
  }
}

// @media (max-width: 960px) {
//   .profile {
//     display: flex;
//     justify-content: flex-end;
//     margin-right: 15px;
//   }
//   .prifile--container {
//     display: flex;
//     justify-content: flex-end;
//   }
// }
</style>