<template>
  <div 
    fixed
    class="drawer-outer" 
    :class="{'is-open': isOpen, 'is-closing': isClosing}"
    @click="handleClose"
  >
    <div 
      class="drawer"
      @click.stop="stopPropagation"
      :class="{'close-animation': isClosing}"
    >
      <div @click="handleClose" class="close-btn"></div>

      <div 
        class="profile" 
        v-if="isAuthorized"
      >
        <div class="profile__container-photo"> 
          <nuxt-link
            class="profile__photo"
            to="/profile"
          >
            <div 
              class="profile__photo-container"
              @click="handleClose"
            >
              <img
                :src="avatarSrc"
                alt="Profile photo"
              >
            </div>
          </nuxt-link>
          <div @click="handleClose">
            <nuxt-link
              @click="handleClose"
              class="profile__name silent-link"
              to="/profile"
            >
              {{ $store.state.user.username }}
            </nuxt-link>
          </div>
        </div>
        <div 
          @click="handleClose"
          class="notification__container"
          v-if="isAuthorized && getCountUnreadMessage"
        >
          <nuxt-link
            class="mail--notification"
            to="/messages"
          >
            <div >
              <div class="count">
                <span class="number">{{ getCountUnreadMessage }}</span>
              </div>
              <i class="fas fa-envelope"></i>
            </div>
          </nuxt-link>
        </div>
      </div>

      <hr v-if="isAuthorized"/>

      <collapse>
        <collapse-item
          v-for="item in navigation"
          :key="item.title"
          :title="item.title"
          :name="item.title"
        >
          <div 
            @click="handleLinkClick(item.link)"
            class="drawer__link"
          >
            {{ item.title }}
          </div>

          <div 
            v-for="child in item.children"
            :key="child.title"
            @click="handleLinkClick(child.link)"
            class="drawer__link-item"
          >
            {{ child.title }}
          </div>
        </collapse-item>
      </collapse>

      <div
        v-show="!isAuthorized"
        class="drawer__link text--bold" 
        @click="$router.push('/signup') && handleClose"
        style="padding-left:20px;"
      >
        <div
          @click="handleClose"  
        >
          Sign up
        </div>
      </div>

      <div 
        class="drawer__link link--wrapper" 
        @click="handleLoginLogout"
        style="padding-left:20px; margin-top: 6px"
      >
        {{ isAuthorized ? 'Sign out' : 'Sign in' }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {Collapse, CollapseItem} from '@/components'

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },

    navigation: {
      type: Array,
      required: true
    }
  },

  computed: {
    ...mapGetters( {
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
      isClosing: false
    }
  },

  components: {
    Collapse, CollapseItem
  },

  methods: {
    // ...mapActions({
    //   checkUnreadMessage: 'messaging/checkUnreadMessage'
    // }),
    handleClose () {
      this.isClosing = true

      setTimeout(() => {
        this.$emit('close')
        this.isClosing = false
      }, 240)
    },

    handleLoginLogout () {
      if (this.isAuthorized) {
        this.$store.commit('user/logout')
      } else {          
        this.$router.push('/login')
        this.isClosing = true
      }
    },

    stopPropagation (e) {
      e.stopPropagation()
    },

    handleLinkClick (link) {
      this.$router.push(link)

      this.handleClose()
    }
  },

  watch: {
    isOpen: {
      handler: function (val) {
        if (val) {
          document.querySelector('body').classList.add('block_title')
        } else {
          document.querySelector('body').classList.remove('block_title')
        }
      },
      deep: true
    }
  },

  mounted () {
    // if ( this.isAuthorized && !this.getCountUnreadMessage ) {
    //   this.checkUnreadMessage()
    // }
  },
}
</script>

<style lang="scss">
.drawer-outer {
  z-index: 999;
}

.drawer {
  .card-body {
    padding: 5px 0;
  }
  .card.card-plain {
    margin-bottom: 0;
    user-select: none;
    
    .card-header {
      padding-left: 20px;
      user-select: none;
      font-weight: bold;

      .drawer__link-item:hover {
        cursor: pointer;
        background-color: #cacaca;
      }

      &::after {
        display: none;
      }
    }

    i {
      display: none;
    }
  }
}

@media (max-width: 480px) {
  .card-collapse .card .card-header {
    font-size: 12px !important;
  }

  .sidebar__link .card {
    margin-bottom: 9px !important;
  }

  .sidebar__link {
    .drawer__link {
      font-size: 13px !important;
    }
    .drawer__link-item {
      font-size: 13px !important;
    }
  }
}
.block_title {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>

<style lang="scss" scoped>
@keyframes FADEIN {
  0% {
    transform: translateX(-280px);
  }

  100% {
    transform: translateX(0px);
  }
}

@keyframes FADEOUT {
  0% {
    transform: translateX(0px);
  }

  100% {
    transform: translateX(-300px);
  }
}

@keyframes HIDING {
  0% {
    background: #00000066;
  }

  100% {
    background: #00000000;
  }
}

.is-closing {
  animation: HIDING .2s ease-in;
  animation-fill-mode: forwards;
}

.close-animation {
  animation: FADEOUT .2s ease-in !important;
  animation-fill-mode: forwards !important;
}

.drawer-outer {
  display: none;

  &.is-open {
    display: block;
  }

  position: fixed;
  
  height: 100vh;
  width: 100vw;

  top: 0;
  left: 0;

  background: #00000066;

  .drawer {
    animation: FADEIN .2s ease-in;

    height: 100vh;
    width: 280px;

    background: #ddd;

    box-shadow: 5px 0 5px -5px #333;

    position: relative;

    overflow-y: auto;

    padding-top: 20px;

    hr {
      margin: .5rem 0;
    }

    .drawer__link {
      text-align: center;
      padding: 0px 0 0 0 !important;
      // margin-top: .5rem;
    }

    .drawer__link-item {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin: 7px 0 0 0 !important;
      // padding: 7px 0 0 0 !important;
    }

    .drawer__link-item:hover {
      cursor: pointer;
      background-color: #cacaca;
    }



    .profile {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      // padding-right: 40px;
      // margin-left: 25px;
      // margin-bottom: .2rem;
      // margin-top: 1rem;

      .profile__container-photo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .notification__container {
        margin-top: .7rem;
        margin-bottom: .3rem;
        // margin-right: 1.6rem;
      }

      .silent-link {
        font-weight: bold;
        color: #2c2c2c
      }

      .profile__name {
        margin-top: .5rem;
        display: block;
      }

      .mail--notification {
        display: block;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-color: #63748F;
        grid-row: 1 / 3;
        display: flex;
        align-items: center;
        justify-content: center;
        // margin: 0 auto;
        font-size: 21px;
        position: relative;
        cursor: pointer;
        align-self: center;
        // margin: 0px 1.5rem 0 3rem;


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
            font-size: 11px;
          }
        }

        i {
          font-size: 16px;
          color: white
        }
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
          width: 50px;
          height: 50px;
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

    .profile__bottom-border {
      width: 100%;
      // margin-left: 1rem;
      border: .1px solid rgb(129, 150, 182);
      margin: 1rem 0 1rem 1rem;
    }

    .close-btn {
      // font-size: 28px;
      position: absolute;
      top: 12px;
      right: 12px;
      // height: 24px;
      color:black;

      background-image: url("data:image/svg+xml;utf8,<svg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 47.971 47.971' style='enable-background:new 0 0 47.971 47.971;' xml:space='preserve'><g><path d='M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88 c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242 C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879 s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z'/></g></svg>");

      height: 14px;
      width: 14px;

      padding: 0;

      user-select: none;

      &:hover {
        cursor: pointer;
      }
    }

    &__link {
      padding: 8px;
      padding-left: 30px;

      transition: background .2s ease-in;

      &:hover {
        background: #0000001a;
        cursor: pointer;
      }
    }
  }
}

@media (max-width: 480px) {
  .drawer-outer {
    .drawer {
      width: 80vw;
      .drawer__link {
        font-size: 13px;
      }
        .link--wrapper {
          // width: 100%;
          // height: 200px;
          margin-top: .3rem;
          margin-bottom: 4rem;
        }
    }
  }
}
</style>
