<template>
  <!-- section--watermark -->
  <div
    class="portfolio__upload"
    v-loading="isLoading"
  >

    <div 
      class="portfolio__upload_checkbox"
    >
      <el-checkbox 
        @change="updateUserSettings"
        v-model="userSettingWatermark.is_auto"
      >
      <div class="portfolio__upload_checkbox-text">
        Automatically Watermark Future Challenge Entries
      </div> 
      </el-checkbox>
    </div>

    <div 
      class="portfolio__watermark"
    >
      <div class="portfolio__watermark_select">
        Color:
        <el-select 
          v-model="userSettingWatermark.color"
          @change="updateUserSettings"
          placeholder="Color"
          class="Select A Manufacturer:	"
          size="small"
        >
          <el-option
            v-for="item in colors"
            :key="item.id"
            :label="item.name"
            :value="item.color"
            class="select--camera"
          />
        </el-select>
      </div>
      <div class="portfolio__watermark_select">
        Opacity:
        <el-select 
          v-model="userSettingWatermark.opacity"
          @change="updateUserSettings" 
          placeholder="Select"
          size="small"
        >
          <el-option
            v-for="item in opacity"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </div>
      <div class="portfolio__watermark_select">
        <span>Position:</span>
        <el-select
          v-model="userSettingWatermark.position"
          @change="updateUserSettings" 
          placeholder="Select"
          size="small"
        >
          <el-option
            v-for="item in position"
            :key="item.id"
            :label="item.name"
            :value="item.position"
          />
        </el-select>
      </div>
    </div>

    <div class="portfolio__watermark_container">
      <div
        style="margin-top: .5rem; margin-bottom: .35rem"
      >
        Bulk Options:
      </div>
      <div class="watermark__alladd_list">
        <span
          @click="handleApplyAllWatermark(true)"
          class="portfolio__watermark_item link"
        >
          - Apply watermark to all existing entries
        </span>
      </div>
      <div>
        <span 
          @click="handleApplyAllWatermark(false)"
          class="portfolio__watermark_item link"
        >
          - Remove watermark from all existing entries
        </span>
      </div>
    </div>
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
  props: ['dataCollectionFolder'],

  data () {
    return {
      isLoading: false,
      path: '',
      valueAutoFutureWatermark: false,
      userSettingWatermark: [],

      windowWidth: 0,
      colors: [ 
        {
          name: 'White',
          color: '#ffffff',
          id: 1
        },
        {
          name: 'Black',
          color: '#000000',
          id: 2
        }
      ],

      opacity: [ 
        {
          name: 'Low',
          id: 1
        },
        {
          name: 'Medium',
          id: 2
        },
        {
          name: 'High',
          id: 3
        },
      ],

      position: [ 
        {
          name: 'Top-left',
          position: 'top_left',
          id: 1
        },
        {
          name: 'Top-right',
          position: 'top_right',
          id: 2
        },
        {
          name: 'Center',
          position: 'center',
          id: 3
        },  
        {
          name: 'Bottom-left',
          position: 'bottom_left',
          id: 4
        },
        {
          name: 'Bottom-right',
          position: 'bottom_right',
          id: 5
        },
        
      ]
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

    updateWatermarkOptions () {
      this.isLoading = true

      const body = {
        apply: this.valueAutoFutureWatermark,
      }

      this.$api.setWatermark(body)
      .then(({ data }) => {
        this.isLoading = false
      })
      .catch(e => {
        throw new Error
      }).finally(_ => {
          this.isLoading = false
      })
    },

    handleApplyAllWatermark (value) {

      const body = {
        apply: value === true ? true : false,
        apply_to_all: true,
        color: this.userSettingWatermark.color,
        is_auto: this.userSettingWatermark.is_auto,
        position: this.userSettingWatermark.position,
        opacity: this.userSettingWatermark.opacity.toLowerCase()
      }

      if ( value === true ) {
        this.$confirm(`
          This will apply the default watermark to all of your existing challenge entries.
          Depending on how many entries you could have, this could take a good while.

          Continue?`, 
            `Warning`, 
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          })
            .then(() => {
              this.isLoading = true
              this.$api.setWatermark(body)
              .then(({ data }) => {
                this.$emit('updateImage')
          })
            .catch(e => {
          })
            .finally(_ => {
              this.isLoading = false
          })
        })
      } else {
        this.$confirm(`
          This will remove watermarking from all of your existing challenge entries. 
          Depending on how many entries you could have, this could take a good while.

          Continue?`, 
            `Warning`, 
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          })
          .then(() => {
            this.isLoading = true
            this.$api.setWatermark(body)
            .then(({ data }) => {
              this.$emit('updateImage')
              this.isLoading = false
          })
          .catch(e => {
          }).finally(_ => {
              this.isLoading = false
          })
        })
      }
    },

    getUserWatermarkSettings () {
      this.isLoading = true
      this.$api.getUserWatermark()
        .then(({ data: { result } }) => {
          this.userSettingWatermark = result
          this.isLoading = false
      })
      .catch(e => {
      })
      .finally(_ => {
        this.isLoading = false
      })
    },

    updateUserSettings () {
      this.isLoading = true
      const data = {
        apply: true,
        color: this.userSettingWatermark.color,
        is_auto: this.userSettingWatermark.is_auto,
        position: this.userSettingWatermark.position,
        opacity: this.userSettingWatermark.opacity.toLowerCase()
      }
      this.$api.patchUserWatermark(data)
      .then(({ data }) => {
        this.isLoading = false
        this.getUserWatermarkSettings()
      })
      .catch(e => {
      })
      .finally(_ => {
        this.isLoading = false
      })
    }
  },

  watch: {
    valueAutoFutureWatermark (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.updateWatermarkOptions()
      }
    }
  },

  mounted () {
    this.getUserWatermarkSettings()
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
.el-checkbox__input.is-checked
.el-checkbox__inner {
  background-color:#003664 !important;
  border-color:#003664 !important;
}

.el-checkbox__input.is-focus
.el-checkbox__inner {
  border-color:#003664 !important;
}

.portfolio__watermark {
  .portfolio__watermark_select {
    .el-input__inner {
      margin: 3px 0 !important;
    }
  }
}

.el-input__inner {
  text-transform: capitalize;
}

@media (max-width: 420px) {
.portfolio__watermark {
  .portfolio__watermark_select {
    .el-select .el-input .el-input__inner {
      width: 260px;
      }
    }
  }
}

.el-checkbox__label {
  flex-wrap: wrap;
  white-space: normal
}

@media (max-width: 480px) {
  .el-message-box {
    width: 300px !important;
  }
}
</style>
  
<style lang="scss" scoped>
.portfolio__upload_checkbox {
  .portfolio__upload_checkbox-text {
    white-space: normal;
    display: flex;
    font-weight: bold;
    color: rgb(44, 44, 44);
    margin: .5rem 2rem 1rem 0;
  }
}

.el-input--inner {
  display: flex;
  justify-content: flex-start !important;
  align-items: flex-start !important;
  margin: 1px !important;
}

.portfolio__watermark {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  .portfolio__watermark_select {
    display: flex;
    flex-direction: column;
    margin-right: 1.5rem;
  }
}
//mobile
@media (max-width: 420px) {
.portfolio__watermark {
  display: flex;
  flex-direction: column;
  margin: 0 0 1.5rem 2rem;
  width: 280px !important;

  .portfolio__watermark_select {
    display: flex;
    flex-direction: column;
    margin-top: .7rem;

    .el-select .el-input .el-input__inner {
      width: 320px;
      .el-input__inner {
        width: 320px !important;
        }
      }
    }
  }

  input {
    width: 320px !important;
  }
  
  .el-checkbox__label {
    width: 280px;
    word-break: break-all
  }
}
</style>

<style lang="scss" scoped>
.portfolio__watermark_item {
  cursor: pointer;
  margin-left: 1.5rem;
}

.watermark__alladd_list {
  flex-direction: column;
}
</style>