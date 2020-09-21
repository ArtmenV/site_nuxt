<template>
  <div class="portfolio__options_container">
    <h4 class="header__table">
      Portfolio Options - 
      <span class="title__silver">
        html5
      </span> 
      <span 
        v-if="screenType === 'mobile'"
        class="warning__image"
      >
        <div class="warning__image_text">
          <strong class="warning__note_red">Note:</strong> The image will be uploaded to the current folder<br>
          Current folder - <strong>{{ getLink || 'Portfolio' }}</strong>
        </div>
      </span>
    </h4>
    <div 
      class="portfolio__options"
      @dragover="AddList"
    >
      <div 
        class="portfolio__options_item"
        @click="selectTab(0)"
        :class="{'collection__background': isActiveUploadPhoto}"
        v-loading="isLoadingPhoto"
      >
        <label
          class="drop-down-activator"
          for="upload-photo"
        >
          <!-- Upload -->
          <svg 
            class="portfolio__option_img upload-modif" 
            width="65" height="60" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.25 9.10714C21.8471 9.10714 23.1429 7.88337 23.1429 6.375C23.1429 4.86663 21.8471 3.64285 20.25 3.64285C18.6529 3.64285 17.3571 4.86663 17.3571 6.375C17.3571 7.88337 18.6529 9.10714 20.25 9.10714Z" fill="#64748F"/>
            <path d="M25.3125 0H1.6875C0.747321 0 0 0.72288 0 1.61083V20.2463C0 21.1343 0.747321 21.8571 1.6875 21.8571H25.3125C26.2527 21.8571 27 21.1343 27 20.2463V1.61083C27 0.72288 26.2527 0 25.3125 0ZM19.0989 11.253C18.9181 11.0538 18.6408 10.9001 18.3275 10.9001C18.0201 10.9001 17.8031 11.0367 17.556 11.2246L16.429 12.1239C16.194 12.2833 16.0071 12.3914 15.7359 12.3914C15.4768 12.3914 15.2417 12.3003 15.073 12.158C15.0127 12.1068 14.9042 12.01 14.8138 11.9247L11.5714 8.61194C11.3304 8.35011 10.9688 8.18505 10.565 8.18505C10.1612 8.18505 9.7875 8.37288 9.55246 8.62902L1.92857 17.315V2.48739C1.98884 2.10033 2.30826 1.82143 2.71808 1.82143H24.2759C24.6917 1.82143 25.0292 2.11172 25.0533 2.50446L25.0714 17.3263L19.0989 11.253Z" fill="#64748F"/>
          </svg>
        </label>
        <div class="portfolio__options_link upload-link">
          Upload New Photos
        </div>
        <no-ssr>
          <input
            @change="handlePhotoUpload"
            type="file"
            name="photo"
            id="upload-photo"
            ref="avatarUpload"
          />
        </no-ssr>
      </div>

      <div 
        class="portfolio__options_item"
        @click="selectTab(3)"
        :class="{'collection__background': isActiveUploadWatermark}"
      >
        <div class="drop-down-activator image-circle">
          <svg 
            width="65" height="60" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="portfolio__option_img watermark-icon" 
          >
            <g clip-path="url(#clip0)">
            <path d="M29.8701 4.98337C23.0301 -1.66112 11.9699 -1.66112 5.12994 4.98337C-1.70998 11.6279 -1.70998 22.3721 5.12994 29.0166C11.9699 35.6611 23.0301 35.6611 29.8701 29.0166C36.71 22.3721 36.71 11.6279 29.8701 4.98337ZM27.8326 27.0374C22.157 32.5509 12.843 32.5509 7.16736 27.0374C1.49168 21.5239 1.49168 12.4761 7.16736 6.96258C12.843 1.44906 22.157 1.44906 27.8326 6.96258C33.5083 12.4761 33.5083 21.5239 27.8326 27.0374Z" fill="#64748F"/>
            <path d="M17.5 20.4167C15.8958 20.4167 14.5833 21.7292 14.5833 23.3333C14.5833 24.9375 15.8958 26.25 17.5 26.25C19.1042 26.25 20.4167 24.9375 20.4167 23.3333C20.4167 21.7292 19.1042 20.4167 17.5 20.4167ZM17.5 24.7917C16.625 24.7917 16.0417 24.2083 16.0417 23.3333C16.0417 22.4583 16.625 21.875 17.5 21.875C18.375 21.875 18.9583 22.4583 18.9583 23.3333C18.9583 24.2083 18.375 24.7917 17.5 24.7917Z" fill="#64748F"/>
            <path d="M17.5 5.83334C15.8958 5.83334 14.5833 7.14584 14.5833 8.75001V16.0417C14.5833 17.6458 15.8958 18.9583 17.5 18.9583C19.1042 18.9583 20.4167 17.6458 20.4167 16.0417V8.75001C20.4167 7.14584 19.1042 5.83334 17.5 5.83334ZM18.9583 16.0417C18.9583 16.9167 18.375 17.5 17.5 17.5C16.625 17.5 16.0417 16.9167 16.0417 16.0417V8.75001C16.0417 7.87501 16.625 7.29168 17.5 7.29168C18.375 7.29168 18.9583 7.87501 18.9583 8.75001V16.0417Z" fill="#64748F"/>
            </g>
            <defs>
            <clipPath id="clip0">
            <rect width="35" height="35" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </div>
        <div class="portfolio__options_link">
          Watermark Options
        </div> 
      </div>
    </div>

    <!-- drag and drop -->
    <div class="user-drag">
      <el-upload
        class="avatar-uploader user-entry__upload"
        v-if="hidden"
        drag
        :http-request="uploadPhoto"
        action="undefined"
        v-loading="isLoadingPhoto"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Upload photo <br> <em>by dragging them here</em></div>
        <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 700kb</div>
      </el-upload>
    </div>

    <!-- section--upload -->
    <div 
      class="portfolio__upload"
      v-if="isUploadSectionOpen"
    >
      <div class="block__select_value">
        When uploading prints, 
        use this portfolio size:
      <div class="portfolio__upload_radio">
        <el-radio v-model="rescale_resolution" label="1200">Regular(1200px)</el-radio>
        <el-radio v-model="rescale_resolution" label="120">Space Saver(120px)</el-radio>
      </div>
      </div>
    </div>
      
    <div 
      class="portfolio__option_description"
    >
      You can drag/drop photos or prints onto the corresponding button above. <br>
      If you're having trouble uploading, click here to access the classic uploader.
    </div>

    <Watermark
      v-if="isWaterMarkSectionOpen"
      @updateImage="updateImage"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
import { Select, Upload, Slider, Radio } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Slider)
Vue.use(Radio)

export default {

  components: {
    Dropzone,
    Watermark: () => import('~/components/custom/portfolio/PortfolioOptions/Watermark')
  },

  data () {
    return {
      value1: '',
      currentFolder: '',
      dataSelect: [],
      dataSelect2: [],
      value: null,
      isLoadingPhoto: false,
      isLoadingPrint: false,
      path: '',
      rescale_resolution: "1200",

      checkedRegular: false,
      checkedSaver: false,
      isUploadSectionOpen: false,
      isWaterMarkSectionOpen: false,

      isActiveUploadPhoto: false,
      isActiveUploadPrints: false,
      isActiveUploadOptions: false,
      isActiveUploadWatermark: false,

      hidden: false,

      windowWidth: 0,
    }
  },

  methods: {
    changeOptions () {
      this.isUploadSectionOpen === false ? 
        this.isUploadSectionOpen = true : 
        this.isUploadSectionOpen = false

        if ( this.isWaterMarkSectionOpen === true ) {
          this.isWaterMarkSectionOpen = false
        }
    },

    changeWatermark () {
      this.isWaterMarkSectionOpen === false ?
        this.isWaterMarkSectionOpen = true : 
        this.isWaterMarkSectionOpen = false

        if ( this.isUploadSectionOpen === true ) {
          this.isUploadSectionOpen = false
        }
    },

    handlePhotoUpload () {
      if (this.$refs.avatarUpload.files.length !== 0) {
        const rescale_resolution = Number(this.rescale_resolution)
        const photo = this.$refs.avatarUpload.files[0]
        this.isLoadingPhoto = true

        this.$api.createPhotoPortfolio({
          photo, path: this.$route.query.path || "", rescale_resolution
        })
        .then(({ data: { result } }) => {
          this.isLoadingPhoto = false
          this.$emit('UpdateData', this.$route.query.path)
          this.hidden = false
        })
        .catch(e => {
          throw e
        })
        .finally(_ => {
          this.isLoadingPhoto = false
        })
      }
    },

    handlePrintUpload () {
      const rescale_resolution = Number(this.rescale_resolution)
      if (this.$refs.printUpload.files.length !== 0) {
        const photo = this.$refs.printUpload.files[0]
        this.isLoadingPrint = true

        this.$api.createPhotoPortfolio({
          photo, path: this.$route.query.path || "", rescale_resolution
        })
        .then(({ data }) => {
          this.$emit('UpdateData', this.$route.query.path)
          this.hidden = false
          this.isLoadingPrint = false
          })
        .catch(e => {
          throw e
        })
        .finally(_ => {
          this.isLoadingPrint = false
        })
      }
    },

    uploadPhoto (payload) {
      const rescale_resolution = Number(this.rescale_resolution)
      this.isLoadingPhoto = true

      const {
        file,
        onSuccess,
        onError,
        onProgress
      } = payload 
      
      this.$api.createPhotoPortfolio({ photo: file,  path: this.$route.query.path || "", rescale_resolution })
        .then(({ data: { result } }) => {
          this.$emit('UpdateData', this.$route.query.path)
          this.hidden = false
        })
        .catch(e => {
        })
        .finally(_ => {
          this.isLoadingPhoto = false
          this.hidden = false
        })
    },

    uploadPrint (payload) {
      this.isLoadingPrint = true
      const rescale_resolution = Number(this.rescale_resolution)

      const {
        file,
        onSuccess,
        onError,
        onProgress
      } = payload 

      this.$api.createPhotoPortfolio({ photo: file, path: this.$route.query.path || "", rescale_resolution })
        .then(({ data: { result } }) => {
          this.isLoadingPrint = false
          this.$emit('UpdateData', this.$route.query.path)
          this.hidden = false
        })
        .catch(e => {
        })
        .finally(_ => {
          this.isLoadingPrint = false
        })
    },

    selectTab (data) {
      switch (data) {
        case 0:
          this.isActiveUploadPhoto === false ?
          this.isActiveUploadPhoto = true : 
          this.isActiveUploadPhoto = false

          this.isActiveUploadPrints === true ?
          this.isActiveUploadPrints = false : 
          this.isActiveUploadPrints = true

          break
        case 1:
          this.isActiveUploadPrints === false ?
          this.isActiveUploadPrints = true : 
          this.isActiveUploadPrints = false

          this.isActiveUploadPhoto === true ?
          this.isActiveUploadPhoto = false : 
          this.isActiveUploadPhoto = true
          // this.uploadPrint()
          break
        case 2:
          this.isActiveUploadOptions === false ?
          this.isActiveUploadOptions = true : 
          this.isActiveUploadOptions = false

          this.isUploadSectionOpen === false ?
          this.isUploadSectionOpen = true :
          this.isUploadSectionOpen = false

          this.isWaterMarkSectionOpen = false
          this.isActiveUploadWatermark = false
          this.hidden = false

          break
        case 3:
          this.isWaterMarkSectionOpen === false ?
          this.isWaterMarkSectionOpen = true : 
          this.isWaterMarkSectionOpen = false

          this.isActiveUploadWatermark === false ?
          this.isActiveUploadWatermark = true :
          this.isActiveUploadWatermark = false


          this.hidden = false
          this.isActiveUploadOptions = false
          this.isUploadSectionOpen = false

          // this.changeWatermark()
          break
        default:
          break
      }
    },

    AddList (data) {
      if ( data.type === 'dragover' ) {
        this.hidden = true
      }
    },

    updateImage () {
      this.$emit('UpdateData', this.$route.query.path)
    }
  },

  computed: {
    screenType () {
      const vw = this.windowWidth

      if (vw < 1300 && vw > 768) {
        return 'tablet'
      } else if (vw < 420) {
        return 'mobile'
      } else {
        return 'desktop'
      }
    },

    getLink () {
      const link = (this.$route.query.path || '').split('/')
      return link.slice(-1).toString()
    }
  },

  mounted () {
    this.$nextTick(_ => {
      this.windowWidth = window.innerWidth
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      });
    })
  },
}
</script>

<style lang="scss">
.user-drag {
  .el-upload-dragger  {
    width: 240px;
    height: 160px;
  }
}

.el-select .el-input .el-input__inner {
  background-color: #F5F5F5;
  border: 1px solid rgb(218, 217, 217);
  color: #000;
}

.el-select .el-input .el-select__caret {
  color: #000;
}

.el-input__inner {
  color: #000;
}

.el-input__suffix-inner {
  color: #000;
}

.el-select__caret .el-input__icon .el-icon-arrow-up {
  color: #000;
}

.select--camera {
  color: black;
}

.el-input {    
  &__inner {
    height: 37px;
    width: 220px;
    margin: 0;
    padding-left: 10px !important;

    background: transparent !important;
    border: 1px solid #E3E3E3 !important;
    color: #2c2c2c !important;

    &::placeholder {
      color: #2c2c2c !important;
    }

    &:hover {
      box-shadow: none !important;
    }
  }

  .el-input__suffix {
    padding-top: 4px;
  }
  
  .el-select__caret {
    color: #2c2c2c !important;
  }
}

// upload options setting
.block__select_value {
  width: 100% !important;
  margin-top: 1rem;

  .portfolio__upload_radio {
    display: flex;
    margin-top: 1rem;

    .el-radio__input.is-checked+.el-radio__label {
      color: #003664
    }

    .el-radio__input.is-checked .el-radio__inner {
      color: #003664 !important;
      background-color: #003664 !important;
      border-color: #003664 !important;
      background: #003664 !important;
    }
  }
}
</style>
  
<style lang="scss" scoped>
#upload-photo {
  opacity: 0;
  position: absolute;
  z-index: -1;
  max-width: 100px;
}

#upload-print {
  opacity: 0;
  position: absolute;
  z-index: -1;
  max-width: 100px;
}

.portfolio__watermark {
  display: flex;

  .portfolio__watermark_select {
    margin-right: 2rem;
  }
}

//tablet
@media (max-width: 960px) {
  .portfolio__watermark {
    display: flex;
    flex-direction: column;

    .portfolio__watermark_select {
      display: flex;
      justify-content: flex-end;
      width: 320px;
      margin: 0;
      margin-right: 2rem;
      padding: 0;
    }
  }
}

.portfolio__options_item--edit {
  margin-right: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: .5rem;
}

.drop-down-activator {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  // border: 1px solid #E3E3E3;
  border-radius: 3px;
  padding: 9px 18px 8px 18px;
  font-size: 0.8571em;

  &:hover {
    cursor: pointer;
  }
}

.portfolio__option_img-item {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: .55rem;
  width: 40px;
  cursor: pointer;
}

.portfolio__watermark_container {
  margin-left: 2rem;
  margin-top: 1rem;
}

.portfolio__watermark_item{
  cursor: pointer;
  font-weight: 900;
  color: rgb(51, 77, 121);
}

.portfolio__watermark_item:hover {
  text-decoration: underline;
  color: #0256b3;
}

.portfolio__upload {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  font-weight: bold;

  .portfolio__upload_item {
    display: flex;
    flex-direction: column;
    max-width: 320px;
    font-weight: normal;
    font-size: 14px;
  }

  .block__select_value {
    max-width: 280px;

    .el-input__inner {
      width: 190px !important;
    }
  }
}

.portfolio__upload_checkbox {
  margin-top: 8px;
  margin-left: 1.2rem;
}

.portfolio__options {
  display: flex;
  margin-bottom: 1rem;


  .portfolio__options_item {
    margin-right: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: .5rem;
    margin-left: 2rem
  }

  .portfolio__option_img {
    display: flex;
    margin-bottom: 1rem;
    width: 55px;
    cursor: pointer;
  }

  .portfolio__watermark {
    display: flex;
    margin-left: 25rem;
  }

  .image-circle {
    margin-top: rem;
    margin-bottom: .5rem;
  }

  .portfolio__options_link {
    font-weight: 600;
    font-size: 12px;
  }

  .portfolio__options_link:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.header__table {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 50px;
}

.portfolio__option_img_icon {
  display: flex;
  margin-bottom: 1rem;
  margin-left: 1rem;
  width: 50px;
  cursor: pointer;
}

.portfolio__option_description {
  color: rgb(133, 133, 133);
  font-size: 12px;
  font-style: italic;
  margin-top: .5rem;
}

.portfolio__option_img {
  display: flex;
  margin-bottom: 1rem;
  width: 50px;
  cursor: pointer;
}

.portfolio__options_link {
  font-weight: bold;
}

.portfolio__options_link:hover {
  cursor: pointer;
  text-decoration: underline;
}

.portfolio__upload_checkbox-text {
  font-weight: bold;
  color: #2C2C2C
}

.title__silver {
  color: rgb(138, 138, 138);
}

.collection__background {
  border-bottom: 3px solid #64748F;
}

.user-drag {
  display: flex;

  .user-entry__upload {
    margin-right: 2rem;
    width: 250px;
  }
}

  .portfolio__option_img_print {
    width: 45px;
    margin-bottom: 1rem;
  }

//tablet
@media screen and (max-width: 820px) {
  .portfolio__options_item--edit {
    margin-right: 2rem;
    padding-left: 0.5rem;
    text-align: center;
  }

  .portfolio__options_item {
    margin-right: 1rem !important;
  }

  .drop-down-activator {
    padding-right: 0.5rem;
    text-align: center;
  }
}

//mobile
@media (max-width: 420px) {
  .portfolio__options {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    margin-top: 1.5rem;
  }

  .portfolio__options_item {
    margin-right: .5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: .5rem;
  }

  .portfolio__options_item--edit {
    margin: 0;
    max-width: 380px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .portfolio__option_description {
    margin-top: 2rem; 
    max-width: 330px;
  }

  .portfolio__options_item--edit {
    width: 120px;
    margin-top: 0;
    margin: 0 15px;

    .portfolio__options_link {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 140px
    }
  }

  .portfolio__option_img-item {
    width: 100px;
    margin-bottom: 1rem;
    margin-top: 1rem; 
  }

  .portfolio__option_img {
    width: 90px !important;
    height: 50px !important;
    margin-bottom: 1rem;
  }

  .watermark-icon {
    height: 60px !important;
  }

  .upload-modif {
    margin: .3rem 0 0 0;
  }

  .upload-link {
    margin: .1rem 0 0 0;
  }

  .portfolio__option_img_print {
    width: 100px !important;
    height: 55px !important;
    margin-bottom: .6rem;
  }

  .warning__image {
    display: flex;
    flex-direction: column;

    .warning__image_text {
      font-weight: normal;
      font-size: 10px;
      line-height: 1rem;

      .warning__note_red {
        color: red;
      }
    }
  }

  .drop-down-activator {
    padding: 0px 15px !important;
  }
}
</style>