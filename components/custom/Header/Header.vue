<template>
  <div class="app-header">
    <!-- Logo -->
    <div class="logo">
      <nuxt-link class="logo__image" to="/">
        <img src="~/static/img/dpchallenge/logo.png" alt="DPChallenge logo" >
      </nuxt-link>
    </div>

    <div class="search">
      <Search />
    </div>
    
    <div class="drawer-container">
      <div class="hide-on-mobile">
        <!-- Navigation links with dropdowns -->
        <div class="nav">
          <drop-down
            v-for="item in navigationFiltered"
            :key="item.title"
            :beforeCloseDelay="100"
          >
            <nuxt-link
              class="nav__item" 
              slot="title"
              :to="item.link"
            >
              {{ item.title }}
            </nuxt-link>

            <div class="dropdown">
              <nuxt-link
                v-for="child in item.children"
                :key="child.title"
                class="dropdown__item"
                @click="$router.push(child.link)"
                :to="child.link"
              >
                {{ child.title }}
              </nuxt-link>
            </div>
          </drop-down>
        </div>

        <!-- Profile container -->
        <profile />
      </div>
      
      <div class="drawer-btn">
        <hamburger 
          @click.native="isDrawerOpen = true"
        />
      </div>

      <drawer 
        :isOpen="isDrawerOpen"
        @close="isDrawerOpen = false"
        :navigation="navigationFiltered"
      />
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import { isAuthLink, isNotAuthLink }  from '~/assets/config/links'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      navigation: [],

      navigationFiltered: [],

      isDrawerOpen: false
    }
  },

  computed: {
    ...mapGetters([ 'isAuthorized' ]),
  },

  components: {
    DropDown: () => import('@/components/Dropdown.vue'),
    Profile: () => import('./_profile.vue'),
    Hamburger: () => import('./_hamburger'),
    Drawer: () => import('./_drawer'),
    Search: () => import('./_search')
  },

  mounted () {
    if ( this.isAuthorized ) {
      this.navigationFiltered = isAuthLink
    } else {
      this.navigationFiltered = isNotAuthLink
    }
  },

  head () {
    return {
      title: 'DPChallenge - A Digital Photography Contest',
      meta: [
        { hid: 'description', name: 'description', content: 'DPChallenge - A Digital Photography Contest' }
      ]
    }
  },

  watch: {
    isAuthorized: {
      handler: function (val) {
        if ( val ) {
          this.navigationFiltered = isAuthLink
        } else {
          this.navigationFiltered = isNotAuthLink
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  height: 70px;
  display: flex;
  align-items: center;
  background: #ddd;

  position: relative;
  z-index: 11;

  box-shadow: 0px 1px 10px 0px #00000067;

  .logo {
    position: absolute;
    
    &__image {
      img {
        height: 64px;
      }

      pointer-events: all;
      cursor: pointer;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .drawer-container {
    margin-left: auto;
    
    .hide-on-mobile {
      display: flex;
      align-items: center;
    }

    .drawer-btn {
      display: none;
    }
  }

  .nav {
    margin-right: 10px;
    
    .dropdown__item,
    &__item {
      text-decoration: none;
      color: #2c2c2c;
    }
  }
}
</style>


    // // this.navigation = this.dataLinks
    // // console.log('navigation', this.data)

    // // if (this.isAuthorized) {
    // //   this.navigationFiltered = this.navigation
    // // } else {
    // //   this.navigationFiltered = this.navigation.filter(i => i.title !== 'My home')
    // // }

    // // this.$store.subscribe((mutation, state) => {
    // //   if (mutation.type === 'user/login') {
    // //     this.navigationFiltered = this.navigation
    // //   } else if (mutation.type === 'user/logout') {
    // //     this.navigationFiltered = this.navigation.filter(i => i.title !== 'My home')
    // //   }
    // // })
