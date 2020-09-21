<template>
  <div class="details" v-loading="loading">
    <div class="details__header">
      {{ $route.path === "/edit-image" ? 'Edit image data' : 'Entry Details' }}
    </div>

    <div class="details__form">
      <input-info-block
        placeholder="Enter title..."
        v-model="form.title"
        label="Title"
        class="info__modif-item"
      />

      <comment
        @comment="dataComment"
        :challengeProps="descriptionDetails"
        light-label="Details"
        style="grid-column: 1 / 3; margin-bottom: 5px;"
      />

      <input-date
        label="Exposure Date"
        :value="form.date"
        @change="v => form.date = v"
        class="info__modif-time"
      />
  <!-- v-model="dateObject.month" -->

      <input-info-block
        placeholder="Enter location..."
        v-model="form.location"
        label="Location"
        class="info__modif-location"
      />

      <input-info-block
        placeholder="Enter keywords..."
        v-model="form.keywords"
        label="Keywords"
        class="info__modif-item"
      />

      <div 
        class="details__camera"
      >
        <div>
          <div class="date-input__label">
            Camera
          </div>
          <el-select
            v-model="form.camera"
            class="inputs__month"
            style="margin-right: .7rem"
            placeholder="Select"
          >
            <el-option
              v-for="camera in user.cameras"
              :label="camera.model"
              :key="camera.id"
              :value="camera.id"
            />
          </el-select>
        </div>

        <div 
          class="date-input__label"
          style="margin-top: 1.2rem"
        >
          Lens
        </div>
          <el-select
            v-model="form.lens"
            class="inputs__month"
          >
          <el-option
            v-for="lens in user.lenses"
            :value="lens.id"
            :key="lens.id"
            :label="lens.model"
          />
        </el-select>
      </div>

      <div class="info__modif-group">
        <input-info-block
          placeholder="Enter aperute..."
          v-model="form.aperture"
          label="Aperture"
        />

        <input-info-block
          placeholder="Enter ISO..."
          v-model="form.iso"
          label="ISO"
          class="info__modif-iso"
          style="margin-top: 1.2rem"
        />

        <input-info-block
          placeholder="Enter shutter speed..."
          v-model="form.shutterSpeed"
          label="Shutter speed"
          style="margin-top: 1.2rem"
        />
      </div>
        <div 
          v-if="isError"
          class="error-message"
        >
          <el-alert
            title="This photo participated in the challenge, you can't change it"
            type="error"
          />
        </div>


      <div class="btn--submit">
        <el-button
          v-if="$route.path !== '/edit-image'"
          class="update-btn"
          size="small"
          type="primary"
          plain
          :loading="updating"
          @click="setDetails"
        >
          Update details
      </el-button>

        <el-button
          v-if="$route.path === '/edit-image'"
          class="update-btn"
          size="small"
          type="primary"
          plain
          :loading="updating"
          @click="updateImage"
        >
          Update details
      </el-button>
      </div>
    </div>

    <div class="details__tip">
      * If you're not sure how to obtain these values, 

      <span class="link">
        &nbsp; check out our FAQ.
      </span>
    </div>
    <!-- <div 
      
      class="error-message"
    > -->

      
    <!-- </div> -->
  </div>
</template>

<script>
import InputInfoBlock from './InputInfoBlock'
import InputDate from './InputDate'
import Comment from './Comment'
import Vue from 'vue'
import { Button, Alert, Select, Options } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Button)
Vue.use(Alert)

export default {
  props: {
    clearSetting: {
      type: Boolean,
      required: false
    },
    agreed: {
      type: Boolean,
      required: false
    },
    isParticipant: {
      type: Boolean,
      required: false
    },
    imageData: {
      type: Object,
      required: false
    }
  },
  components: {
    InputInfoBlock,
    InputDate,
    Comment
  },
  data () {
    return {
      form: {
        camera: '',
        lens: '',
        title: '',
        location: '',
        keywords: '',
        aperture: '',
        iso: '',
        shutterSpeed: '',
        date: '',
        details: ''
      },

      descriptionDetails: '',

      user: {
        lenses: [],
        cameras: []
      },

      lenses: '',

      isError: false,
      errorMessage: "This photo participated in the challenge, you can't change it",

      id: this.$store.state.user.userId,

      camera: {},
      lens: {},

      time: {
        year: '',
        months: '',
        day: ''
      },

      timeDefault: '',

      loading: false,
      updating: false
    }
  },

  methods: {
    getDetails () {

      this.loading = true
      this.$api
        .getSubmittedEntry(this.$route.query.id)
        .then(({ data: { result } }) => {

          this.form.date = result.taken_date || new Date().toISOString()
          this.form.title = result.title || ''
          this.form.shutterSpeed = result.speed || ''
          
          this.form.aperture = result.aperture || ''
          this.form.keywords = result.keywords || ''
          this.form.location = result.location || ''
          this.form.iso = result.iso || ''
          this.descriptionDetails = result.description || ''

          if ( result.camera ) {
            this.camera = result.camera
            this.form.camera = result.camera.id
            this.form.cameraName = result.camera.id
          }

          if ( result.lens ) {
            this.lens = result.lens
            this.form.lens = result.lens.id
          }
        })
        .catch(err => {
          console.log("You are not participant of this challenge", err)
        })
        .finally(_ => {
          this.loading = false
          this.updateProfileInfo()
        })
    },

    updateProfileInfo () {
      this.loading = true
      this.$api
        .getUserInfo(this.id)
        .then(({ data: { result } }) => {
          this.user.lenses = result.lenses || []
          this.user.cameras = result.cameras || []          
        })
        .finally(_ => {
          this.loading = false
          this.cameraData()
          this.lensesData()
          this.dataComment()
        })
    },

    cameraData () {
      if ( this.user.cameras === [] ) {
        if ( Object.entries(this.camera).length !== 0 ) {
          this.user.cameras.push(this.camera)
        }
      }

      const notMatchedCamera = !this.user.cameras.some(item => item.id === this.camera.id) 

      if ( this.user.cameras && notMatchedCamera ) {
        if ( Object.entries(this.camera).length !== 0 ) {
          this.user.cameras.push(this.camera)
        }
      }
    },

    lensesData () {
      if ( this.user.lenses === [] ) {
        if ( Object.entries(this.lens).length !== 0 ) {
          this.user.lenses.push(this.lens)
        }
      }

      const notMatchedCamera = !this.user.lenses.some(item => item.id === this.lens.id) 

      if ( this.user.lenses && notMatchedCamera ) {
        if ( Object.entries(this.lens).length !== 0 ) {
          this.user.lenses.push(this.lens)
        }
      }
    },

    setDetails () {
      this.updating = true

      const payload = {
        challenge_id: this.$route.query.id
      }

      payload.title = this.form.title
      payload.aperture = this.form.aperture
      payload.iso = this.form.iso
      payload.speed = this.form.shutterSpeed
      payload.taken_date = this.form.date
      payload.description = this.form.details
      payload.camera_id = this.form.camera
      payload.lens_id = this.form.lens
      payload.location = this.form.location
      payload.keywords = this.form.keywords
    
      // if (this.form.title) {
      //   payload.title = this.form.title
      // }

      // if (this.form.aperture) {
      //   payload.aperture = this.form.aperture
      // }

      // if (this.form.iso) {
      //   payload.iso = this.form.iso
      // }

      // if (this.form.shutterSpeed) {
      //   payload.speed = this.form.shutterSpeed
      // }

      // if (this.form.date) {
      //   payload.taken_date = this.form.date
      // }

      // if (this.form.details) {
      //   payload.description = this.form.details
      // }

      // if (this.form.camera) {
      //   payload.camera_id = this.form.camera
      // }

      // if (this.form.lens) {
      //   payload.lens_id = this.form.lens
      // }

      // if (this.form.location) {
      //   payload.location = this.form.location
      // }

      // if (this.form.keywords) {
      //   payload.keywords = this.form.keywords
      // }


      this.$api
        .updateChallengeMeta(payload)
        .then(({ data: { result } }) => {
          this.getDetails()
        })
        .catch(e => {
        })
        .finally(_ => {
          this.updating = false
        })
    },

    dataComment (data) {
      this.form.details = data
    },

    getInfoImage () {

      this.gotEntry = false

      this.$api
        .getChallengeEntry(this.$route.query.id)
        .then(({ data: { result } }) => {
          
          this.form.date = result.taken_date || new Date().toISOString()

          this.form.title = result.title || ''
          this.form.shutterSpeed = result.speed || ''
          
          this.form.aperture = result.aperture || ''
          this.form.keywords = result.keywords || ''
          this.form.location = result.location || ''
          this.form.iso = result.iso || ''
          this.descriptionDetails = result.description || ''

          if ( result.camera ) {
            this.camera = result.camera
            this.form.camera = result.camera.id
            this.form.cameraName = result.camera.id
          }

          if ( result.lens ) {
            this.lens = result.lens
            this.form.lens = result.lens.id
          }
        })
        .catch(({ response }) => {
        })
        .finally(_ => {
          this.updateProfileInfo()
        })
    },

    updateImage () {
      this.updating = true
      this.isError = false

      const payload = {
        id: this.$route.query.id
      }

      payload.title = this.form.title
      payload.aperture = this.form.aperture
      payload.iso = this.form.iso
      payload.speed = this.form.shutterSpeed
      payload.taken_date = this.form.date
      payload.description = this.form.details
      payload.camera_id = this.form.camera
      payload.lens_id = this.form.lens
      payload.location = this.form.location
      payload.keywords = this.form.keywords
  
      this.$api
        .updateImageData(payload)
        .then(({ data: { result } }) => {
          // this.getDetails()
          this.getInfoImage()
          this.isError = false
        })
        .catch(e => {
          this.isError = true
          // console.log('error', e.status_code)=== 403
        })
        .finally(_ => {
          this.updating = false
        })
    }

  },
  watch: {
    clearSetting ( val ) {
      if ( val ) {
        this.form.date = new Date().toISOString()
        this.form.title = ''
        this.form.shutterSpeed = ''
        this.form.aperture = ''
        this.form.keywords = ''
        this.form.location = ''
        this.form.iso = ''
        this.descriptionDetails = ''

        this.camera = ''
        this.form.camera = ''
        this.form.cameraName = ''
        this.user.cameras = []
        this.user.lenses = []

        this.lens = ''
        this.form.lens = ''

      }
    },

    isParticipant: {
      handler: function (val) {
        if (val) {
          this.getDetails()
        }
      },
      deep: true
    },

    imageData: {
      handler (val) {
        debugger
        this.form.date = this.submission.taken_date || new Date().toISOString()
        this.form.title = val.title || ''
        this.form.shutterSpeed = this.submission.speed || ''
        
        this.form.aperture = val.aperture || ''
        this.form.keywords = val.keywords || ''
        this.form.location = val.location || ''
        this.form.iso = val.iso || ''
        this.descriptionDetails = val.description || ''

        if ( val.camera ) {
          this.camera = val.camera
          this.form.camera = val.camera.id
          this.form.cameraName = val.camera.id
        }

        if ( val.lens ) {
          this.lens = val.lens
          this.form.lens = val.lens.id
        }
      },
      deep: true
    },  

  },
  
  // computed: {
  //   getImageData () {
  //     if (this.submission) {
  //       this.form.date = this.submission.taken_date || new Date().toISOString()
  //       this.form.title = this.submission.title || ''
  //       this.form.shutterSpeed = this.submission.speed || ''
        
  //       this.form.aperture = val.aperture || ''
  //       this.form.keywords = val.keywords || ''
  //       this.form.location = val.location || ''
  //       this.form.iso = val.iso || ''
  //       this.descriptionDetails = val.description || ''

  //       if ( val.camera ) {
  //         this.camera = val.camera
  //         this.form.camera = val.camera.id
  //         this.form.cameraName = val.camera.id
  //       }

  //       if ( val.lens ) {
  //         this.lens = val.lens
  //         this.form.lens = val.lens.id
  //       }
        
  //     }
  //   }
  // },

  created () {
    if (this.isParticipant) {
      this.getDetails()
    }

    if (this.$route.path === "/edit-image") {
      this.getInfoImage()
    }
  }
}
</script>

<style lang="scss">
  .el-input {    
    &__inner {
      height: 37px !important;
      margin: 0 !important;
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
  }

  .details__camera {
    .inputs__month {
      width: 100%;
    }
    .el-input {    
      &__inner {
        height: 37px !important;
        margin: 0 !important;
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
        padding-right: 4px;
      }
    }
  }

  .details__lens {
    .inputs__month {
      width: 100%;
    }
    .el-input {  
      &__inner {
        height: 37px !important;
        margin: 0 !important;
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
        padding-right: 4px;
      }
    }
  }

  .el-select .el-input .el-select__caret {
    color: #2c2c2c !important
  }

.el-alert--error.is-light {
  .el-alert__title {
    padding-right: 1.2rem;
  }
}

</style>

<style lang="scss" scoped>
.error-message {
  grid-column: 1/3;
  font-weight: bold;
  max-width: 500px;
  align-self: start !important;
  align-items: start !important;
  justify-items: start !important;
  justify-self: end !important;
}

.details {
  .date-input__label {
    font-size: 12px;

    text-transform: uppercase;
  }
  &__header {
    font-size: 18px;
    font-weight: bold;

    color: #2c2c2c;

    padding-top: 20px;
    padding-bottom: 15px;
  }

  &__tip {
    font-size: 12px;
  }

  &__form {
    display: grid;
    grid-row-gap: 10px;

    .info__modif-location {
      grid-column: 1/3;
    }

    // .info__modif-shutter_speed {
    //   grid-column: 1/3;
    // }

    .info__modif-iso {
      grid-column: 2/3;
    }

    .info__modif-item {
      grid-column: 1/3;
      width: 100%;
    }

    .details__camera {
      display: flex;
      flex-direction: column;
    }

    .btn--submit {
      height: 37px;
      margin-right: 0 auto;
      grid-column: 1 / 3 !important;
      align-self: start !important;
      align-items: start !important;
      justify-items: start !important;
      justify-self: end !important;
    }

    .update-btn {
      height: 37px;
    }
  }
}

.details__tip {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: .5rem;
}

@media (min-width: 560px) {
  .details {
    &__form {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 30px;
    }
  }
}

@media (max-width: 560px) {
    .details {
      &__form {
        .details__camera {
          justify-content: space-between;
          grid-column: 1 / 3;

          .el-select.inputs__month {
            // width: 100%
          }
        }
        .date-input {
          grid-column: 1 / 3;
          // display: flex;

          .el-select.inputs__month {
            // flex-basis: 2;
            // max-width: 100%
          }
        }

        .info__modif-item {
          margin-right: 10px;
        }

        .info__modif-group {
          grid-column: 1 / 3;
        }
      }
    }
}
</style>