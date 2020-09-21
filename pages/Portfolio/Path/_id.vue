<template>
  <div class="portfolio-container">
    <div
      class="profile-page"
      v-loading="loading"
    >
    <!-- //collection -->
    <div class="portfolio__collection_header">
      <div class="portfolio__collection_items">
        <h4 class="header__table_head">
          Your Collections
        </h4>

          <TreeFolder 
            :folderCollection="folderCollection"
            :folderName="currentFolder"
          />

        <div 
          class="portfolio__collection_link-workshop"
          :class="{'isPortfolioClose' : isPortfolioClose}"
          @click="getContent(folder)"
          v-for="folder in allCurrentFolder.items"
          :key="folder.id"
        >
          - {{ folder.name }}
        </div>
        <div
          class="portfolio__collection_progress"
        >
          <el-progress 
            class="progress_item"
            :text-inside="true" 
            :stroke-width="22" 
            :percentage="storageMemory"
            color="#64748f"
            stroke-linecap="butt"
          />
          <div  class="portfolio__collection_result">Using {{ sizeMemory }} / {{ limitMemoryStorage }} ({{persent}}%)</div>
        </div>
      </div>
    </div>

      <!-- <div
        v-if="!isPortfolioClose"
      >
        <h3 class="header__table_browser">
          Browse Collection:
        </h3>
        <div class="portfolio__collection_link--portfolio">
          <nuxt-link
            class="row-item silent-link highlighted text--bold"
            :to="`/portfolio/user?user_id=${id}&path=` + $route.query.path"  
            style="margin-bottom: .4rem"
          >
          {{ currentFolder || 'Portfolio' }}
          </nuxt-link>
        </div>
      </div> -->

      <div class="membership__note_container">
        <h4 class="header__table_member">
          Membership Necessary
        </h4>
        <div class="membership__note">
          <span class="portfolio__membership">Note:</span> 
            The portfolio system is only available to paying members. <br> You'll need 
          <span class="portfolio__membership_link">become a member</span> 
            if you would like to manage your portfolio on DPChallenge.
        </div>
      </div>


    <!-- section  -->
    <PortfolioOptions 
      @UpdateData="UpdateData"
      :dataCollectionFolder="dataCollectionFolder"
    />

    <!-- images in portfolio -->
    <!-- @click="isClosePortfolioSection" -->
    <!-- v-if="!isPortfolioClose" -->
    <div 
      class="portfolio__images"
      style="display: flex"
      v-loading="isLoading"
    >
      <h4 class="header__table">
        Images in '{{ currentFolder || 'Portfolio' }}'
      </h4>
        <div
          class="portfolio__images_container"
          style="display: flex; margin-top: 1.5rem; flex-wrap: wrap"
          v-if="isPortfolioOpen"
        >
          <div 
            class="portfolio__options_item"
            v-for="folder in allFolderImage"
            :key="folder.id"
            style="
              display: flex; flex-wrap: wrap; 
              margin-top: 2rem; margin-left: 1.5rem; 
              margin-right: .8rem; margin-top: 1.5rem"
          >
            <div 
              class="portfolio__images_item"
              v-if="folder.name"
              @click="getContent(folder)"
              style="display: flex; flex-direction: column; justify-content: center; align-items: center"
            > 
              <nuxt-link
                class="portfolio__images_item portfolio__options_link"
                :to="'/portfolio/path?path=' + folder.path"
                @click.native="getContent(folder)"
              > 

                <svg 
                  class="portfolio__icon"
                  viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d)">
                  <path d="M6.5 6.25C5.11925 6.25 4 7.375 4 8.75V26.25C4 27.625 5.11929 28.75 6.5 28.75H31.5C32.8813 28.75 34 27.625 34 26.25V8.75C34 7.375 32.8813 6.25 31.5 6.25H6.5Z" fill="#2F5269"/>
                  <path d="M7.75 1.25C6.36925 1.25 5.25 2.375 5.25 3.75V21.25C5.25 22.625 6.36925 23.75 7.75 23.75H21.5H27.75H30.25C31.6313 23.75 32.75 22.625 32.75 21.25V10V6.25C32.75 4.875 31.6313 3.75 30.25 3.75H27.75H21.5H20.25L16.5 1.25H7.75Z" fill="#45708C"/>
                  <path d="M32.75 17.5V7.5C32.75 6.125 31.6313 5 30.25 5H16.5H10.25H7.75C6.36925 5 5.25 6.125 5.25 7.5V17.5H32.75Z" fill="#BDC3C7"/>
                  <path d="M6.5 6.25C5.11925 6.25 4 7.375 4 8.75V16.25V17.5V25C4 26.375 5.11929 27.5 6.5 27.5H31.5C32.8813 27.5 34 26.375 34 25V17.5V16.25V8.75C34 7.375 32.8813 6.25 31.5 6.25H6.5Z" fill="#64748F"/>
                  <path d="M10.5625 10C10.1327 10 9.77475 10.1249 9.46875 10.3749C9.16275 10.7499 9 11.1249 9 11.4999V23.3749C9 23.8749 9.16275 24.125 9.46875 24.5C9.77475 24.75 10.1327 25 10.5625 25H25.25H26.5H27.4375C27.8675 25 28.225 24.75 28.5312 24.5C28.8375 24.125 29 23.8749 29 23.3749V11.4999C29 11.1249 28.8375 10.7499 28.5312 10.3749C28.225 10.1249 27.8675 10 27.4375 10H26.5H25.25H10.5625ZM10.5625 11.25H25.25H26.5H27.4375H27.6725C27.7375 11.375 27.75 11.3749 27.75 11.4999V23.3749C27.75 23.4999 27.7375 23.5 27.6725 23.625C27.6137 23.625 27.5225 23.75 27.4375 23.75H26.5H25.25H10.5625C10.4779 23.75 10.3932 23.625 10.3281 23.625C10.2695 23.5 10.25 23.4999 10.25 23.3749V11.4999C10.25 11.3749 10.2695 11.375 10.3281 11.25H10.5625ZM13.375 12.5C12.8541 12.5 12.4115 12.625 12.0469 13C11.6822 13.375 11.5 13.75 11.5 14.375C11.5 14.875 11.6822 15.25 12.0469 15.625C12.4115 16 12.8541 16.25 13.375 16.25C13.8959 16.25 14.3385 16 14.7031 15.625C15.0678 15.25 15.25 14.875 15.25 14.375C15.25 13.75 15.0678 13.375 14.7031 13C14.3385 12.625 13.8959 12.5 13.375 12.5ZM21.1875 13.9999L16.1875 18.9999L14.625 17.5L11.5 20.625V22.5H26.5V20L21.1875 13.9999Z" fill="#D5D5D5"/>
                  </g>
                  <defs>
                  <filter id="filter0_d" x="0" y="0" width="38" height="38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                  <feOffset dy="4"/>
                  <feGaussianBlur stdDeviation="2"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                  </filter>
                  </defs>
                </svg>
                <div class="portfolio__options_link">
                  {{ folder.name }}
                </div>

                  <!-- hidden icon -->
                  <div
                    v-if="folder.is_hidden"
                    class="portfolio-hidden__item"
                  >
                    <img src="@/assets/images/hidden_icon.png"/> 
                  </div>

              </nuxt-link>
            </div>
            <div v-if="!folder.name">
              <nuxt-link
                class="row-item silent-link highlighted text--bold"
                :to="'/image?id=' + folder.id"
              > 
              <div class="portfolio__options_link" 
                style="display: flex; flex-direction: column; justify-content: center; align-items: center">
                <img 
                  :src="$api.resolveImageUrl(folder.thumbnail)" 
                  alt="photo"
                  style="margin: 7px"
                  class="container__images"
                >
                <div 
                  style="word-break: break-all"
                  class="image__title"
                >
                  {{ folder.title }}
                </div>

                  <!-- hidden icon -->
                <div
                  v-if="folder.is_hidden"
                  class="portfolio-hidden__item"
                >
                  <img src="@/assets/images/hidden_icon.png"/> 
                </div>
              </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="portfolio__images"
      v-if="isPortfolioEmpty"
    >
      <div class="portfolio__options_item-workshop">
          There are no images in this collection yet. Add an image using the form above.
      </div>
    </div>

    <!-- collection options -->
      <CollectionOptions
        :key="keyData"
        :addCollectionFolder="true"
        :allCurrentFolder="allCurrentFolder"
        :dataCollectionFolder="dataCollectionFolder"
        :allFolderImage="allFolderImage"
        :allImage="allImage" 
        :allFolder="allFolder"
        :isPath="isPath"
        :getNotHiddenPhoto="getNotHiddenPhoto"
        :getNotHiddenFolders="getNotHiddenFolders"
        :getHiddenPhoto="getHiddenPhoto"
        :getHiddenFolders="getHiddenFolders"
        @UpdateData='UpdateData'
      />
    <div class="portfolio__footer">
    </div>
</div>
</template>

<script>
import { Progress } from 'element-ui'
import { timeAgo } from '~/utils/datePrettier.js'
import NotSpecified from '~/components/custom/NotSpecified'
import { ISOToDateOfBirth } from '~/helpers'
import { Slider } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

export default {

  components: {
    NotSpecified,
    PortfolioOptions: () => import('~/components/custom/portfolio/PortfolioOptions'),
    CollectionOptions: () => import('~/components/custom/portfolio/CollectionsOptions'),
    TreeFolder: () => import('~/components/custom/portfolio/treeFolder')
  },

  data () {
    return {
      id: this.$store.state.user.userId,

      //for tree
      folderCollection: null,
      folderName: null,

      currentFolder: null,
      keyData: 1,
      isLoading: false,
      user: null,
      path: '',
      allFolderImage: [],
      allImage: [],
      allFolder: [],
      isPortfolioEmpty: false,
      titleImageFolder: '',
      userChallenge: null,
      lastThread: null,
      loading: false,
      pmThreadId: '',
      isProgress: 90,
      allCurrentFolder: [],
      contentFolder: [],
      isHidePhoto: false,
      isPath: '',
      parentPath: '',
      folderParent: '',
      dataCollectionFolder: {
        name: undefined,
        path: undefined
      },
      disableButton: false,

      storageMemory: null || 0,
      limitMemoryStorage: null,
      sizeMemory: null,
      persent: null,

      isPortfolioOpen: true,
      isPortfolioClose: false,
      folderPhoto: [],
      fullDataPage: [],
    }
  },

  methods: {
    isOpenPortfolioSection () {
      this.isPortfolioOpen = true
      this.isPortfolioClose = false
    },
    isClosePortfolioSection () {
      this.isPortfolioClose = true
      this.isPortfolioOpen = false
    },

    getContent (data) {
      this.disableButton = true
      this.dataCollectionFolder = data
      // this.titleImageFolder = data.name
      if (data.path === '') {
        this.$api.getFolder({user_id: this.id, path: ''})
          .then(({ data: { result } }) => {
            this.keyData++
            this.allImage = [...result.photos.items]
            this.allFolder = [...result.folders.items]
            this.allFolderImage = [...result.folders.items, ...result.photos.items]
            this.parentPath = result.parent_path,
            this.folderParent = result.folders.items.name
            if  ( !this.allFolderImage.length ) {
              this.allFolderImage.length !== 0 ? this.isPortfolioEmpty = true : this.isPortfolioEmpty = false
              }
            })
            .catch(e => {
              throw e
            })
            .finally(_ => {
              this.loadingPhoto = false
            })
            } else {
              this.titleImageFolder = data.name
              this.isPortfolioEmpty = false
              const path_ = data.path
              this.$api.getFolder({user_id: this.id, path: path_})
                .then(({ data: { result } }) => {
                  this.keyData++
                  this.allFolderImage = [...result.folders.items, ...result.photos.items]
                  this.allImage = [...result.photos.items]
                  this.allFolder = [...result.folders.items]
                  this.parentPath = result.parent_path,
                  this.folderParent = result.folders.items.name

                  this.allFolderImage.length !== 0 ? this.isPortfolioEmpty = false : this.isPortfolioEmpty = true
                  })
                  .catch(e => {
                    throw e
                  })
                  .finally(_ => {
                    this.loadingPhoto = false
                  })
      }
    },

    getFolderPhoto () {
      this.$api.getUserPhoto({user_id: this.id, path: this.isPath})
      .then(({ data: { result } }) => {
        this.folderPhoto = result.items
      })
      .catch(e => {
        throw e
      })
      .finally(_ => {
        this.loadingPhoto = false
      })
    },

    getUserMemory () {
      this.$api.getUserMemory()
      .then(({ data: { result } }) => {

        const size = result.storage_size
        this.sizeMemory = result.storage_size 
        this.limitMemoryStorage = result.quota

        const nowSize = size.substring(0, size.length - 2);
        const maxSize = result.quota.substring(0, result.quota.length - 2);
        this.persent = (nowSize / maxSize * 100).toFixed(2) 
        
        const sizeNumber = size.substring(0, size.length - 2);
        this.storageMemory = Number(sizeNumber)
        })
        .catch(e => {
          throw e
        })
        .finally(_ => {
          this.loadingPhoto = false
        })
    },

    getAllFoldersImages () {
      this.isLoading = true
      this.$api.getAllFoldersImage({ user_id: this.id, path: this.$route.query.path })
      .then(({ data: { result } }) => {
        this.folderCollection = result.id
        this.allFolderImage = [...result.folders.items, ...result.photos.items]
        this.allImage = [...result.photos.items]
        this.allFolder = [...result.folders.items]
        this.isLoading = false

          this.allImage.map(item => {

            const data = item.title.substring(0, item.title.lastIndexOf('.'))
            if ( data !== "" ) {
              return item.title = data
            }
          })

        this.allFolderImage.length !== 0 ? this.isPortfolioEmpty = false : this.isPortfolioEmpty = true
        })
        .catch(e => {
          throw e
        })
        .finally(_ => {
          this.isLoading = false
        })
    },

    UpdateData (data) {
      this.path = data
      this.getAllFoldersImages()
    },

    getLink () {
      const link = (this.$route.query.path).split('/') || 'Portfolio'
      this.currentFolder = link.slice(-1).toString()
    }
  },

  computed: {
    privateMessagesLink () {
      if (this.pmThreadId) {
        return '/messaging?thread_id=' + this.pmThreadId
      } else {
        return '/messaging?user_ids=' + (this.$route.query.id || this.id)
      }
    },

    getHiddenPhoto () {
      return this.allImage.filter(item => {
        let hidden =  item.is_hidden === true
        return hidden
      })
    },

    getHiddenFolders () {
      return this.allFolder.filter(item => {
        let hidden =  item.is_hidden === true
        return hidden
      })
    },

    getNotHiddenPhoto () {
      return this.allImage.filter(item => {
        let hidden =  item.is_hidden !== true
        return hidden
      })
    },

    getNotHiddenFolders () {
      return this.allFolder.filter(item => {
        let hidden =  item.is_hidden !== true
        return hidden
      })
    }
  },

  created () {
    this.getUserMemory(),
    this.getFolderPhoto(),
    this.getAllFoldersImages()
    this.getLink()
  },
}
</script>

<style lang="scss">
.info-block {
  img {
    width: 120px;
    height: auto;
    margin: 5px 5px 5px 0;
  }
}
</style>

<style lang="scss" scoped>
.portfolio-container {
  margin: 0 auto;
  width: 1160px;

  .portfolio__collection_header {
    display: flex;

    .portfolio__collection_items {
      margin-right: 1.5rem;
    }

    .portfolio__collection_link-portfolio {
      margin-left: 7rem;
      color: rgb(51, 77, 121);
      margin-left: 1rem;
      margin-bottom: .4rem;

      &.portfolioOpen {
        font-weight: bold;
      }
    }

    .portfolio__collection_link-portfolio:hover {
      color: #0256b3;
      cursor: pointer;
      text-decoration: underline;
    }
  }
}

@media (max-width: 1060px) {
  .portfolio-container {
    width: 100% !important;
    margin: 0 auto
  }
}

// portfolio images

.portfolio__images {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  z-index: 1;

  .el-button--small {
    padding: 4px 3px 4px 3px;
  }

.icon_button {
  font-size: 24px;
}

  .portfolio__images_item {
    width: 150px;
    height: 100px;
    display: flex;
    flex-direction: column;
    word-wrap: wrap;
    justify-content: center;
    align-items: center;

    .portfolio__icon {
      color: #0256b3;
    }

    .portfolio__options_link {
      color: #003664;
      word-wrap: wrap;
    }

    .portfolio__options_link:hover {
      color: #3658B3
    }
  }

  .portfolio__images_item:hover {
    cursor: pointer
  }
}

.portfolio__collection_progress {
  width: 280px;
  
  .progress_item {
    width: 220px;
  }
}

.portfolio__membership_link {
  cursor: pointer;
  font-weight: 900;
  color: rgb(51, 77, 121);
}

.portfolio__membership_link:hover {
  text-decoration: underline;
  color: #0256b3;
}

.portfolio__collection_link--portfolio {
    color: rgb(51, 77, 121);
    font-weight: bold;
    text-decoration: underline;
    text-transform: capitalize;
  }

.portfolio__collection_link--portfolio:hover {
  cursor: pointer;
  color: #0256b3;
}

.portfolio__collection_link-workshop {
  color: rgb(51, 77, 121);
  margin-left: 1.7rem;
  margin-bottom: .4rem;
 }

.portfolio__collection_link-workshop:hover {
  cursor: pointer;
  color: #0256b3;
  text-decoration: underline;
 }

.isPortfolioClose {
  font-weight: bold;
}


.portfolio__prints_link {
  color: rgb(51, 77, 121);
  font-weight: bold;
  word-break: break-all;
}

.portfolio__prints_link:hover {
  color: #0256b3;
  
}

.portfolio__membership {
  font-weight: 700;
  color: red;
}

.label-bio {
  font-weight: bold;
}

.header__table {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 50px;
}

.header__table_head {
  margin-top: .5rem;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.header__table_browser {
  margin-top: 1.4rem;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.header__table_member {
  margin-top: 2rem;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.membership__note_container {
  display: flex;
  flex-direction: column;
}


.item--desktops {
  display: flex;
  justify-content: center;
  padding-left: 0 !important;
}

.title__silver {
  color: silver
}

.portfolio__collection_result {
  margin-top: 7px;
  font-size: 13px;
}

.portfolio__option_img_icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  width: 40px;
  cursor: pointer;
}

.portfolio__options_item {
  display: flex;
  width: 120px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.portfolio__options_link {
  position: relative;
  font-weight: bold;
  cursor: pointer;

  .portfolio-hidden__item {
    position: absolute;
    top: 5px;
    right: -5px;
  }
}

.portfolio__options_link:hover {
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
}

.portfolio__footer {
  margin-bottom: 10rem;
}

.portfolio__options_item-workshop {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
}

.rated__photo--item {
  width: 160px;
  margin: 1.2rem;
}

.portfolio__images_item {
  width: 120px !important;
  height: 140px !important;
  display: flex;
  word-wrap: wrap;
  justify-content: center;
  align-items: center;

  .portfolio__icon {
    width: 90px;
    height: 80px;
  }
}

  .portfolio__options_link {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // @tablet
@media screen and (max-width: 620px) {
  .portfolio__collection_header {
    flex-direction: column;
  }

  .portfolio__collection_column-prints {
    margin-top: 1.2rem;
  }
}

// @mobilie
@media (max-width: 420px) {
  .portolio-container {
    margin: 0 auto;
  }
  .portfolio__collection_header {
    display: flex;
    flex-direction: column;
  }

  .portfolio__collection_column-prints {
    margin-top: 1rem;
  }

  .portfolio__collection_header {
    width: 320px
  }

  .portfolio__images_container {
    max-width: 370px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: .1rem;


    .portfolio__options_item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 320px;
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }

  .portfolio__images_item {
    width: 135px !important;
    height: 140px !important;
    display: flex;
    word-wrap: wrap;
    justify-content: center;
    align-items: center;

    .portfolio__options_link {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      word-break: break-all;
      width: 340px
    }

    .portfolio__icon {
      width: 280px;
      height: 180px;
    }
  }

    .portfolio__icon {
      color: #0256b3;
    }

    .portfolio__options_item {
      .container__images {
        width: 300px;
        margin-right: .2rem;
      }

      .image__title {
        text-align: center;
        font-size: 19px;
        word-break: break-all;
      }
    }

    .button__back_history {
      width: 150px !important;
      height: 50px !important;
    }
    .membership__note {
      // display: flex;
      max-width: 90%;
    }
} 
</style>
