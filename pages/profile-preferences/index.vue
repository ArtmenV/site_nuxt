<template>
  <div class="profile-preference-page">
    <h3 class="header header--main">
      User preferences
    </h3>

    <div class="page-content" v-if="typeof user.email === 'string'">
      <div class="user-info">
        <h4 class="header">
          User information
        </h4>

        <div class="label">Email</div>
        <div class="value">
          <editable-field
            :value="user.email"
            @change="v => handleFieldChange(v, 'email')"
            type="email"
          />
        </div>

        <div class="label">First name</div>
        <div class="value">
          <editable-field
            :value="user.first_name"
            @change="v => handleFieldChange(v, 'first_name')"
          />
        </div>

        <div class="label">Last name</div>
        <div class="value">
          <editable-field
            :value="user.last_name"
            @change="v => handleFieldChange(v, 'last_name')"
          />
        </div>

        <!-- <div class="label">Location</div>
        <div class="value">
          <editable-field :value="'New York, USA'" />
        </div> -->

        <div class="label">Username</div>
        <div class="value">{{ user.username }}</div>

        <div class="label">Password</div>
        <div class="value">
          <editable-field 
            :value="'******'" 
            type="password"
          />
        </div>
      </div>

      <div class="user-profile">
        <h4 class="header">
          User Profile
        </h4>

        <div class="user-info">
          <div class="label">Gender</div>
          <div class="value">
            <editable-field
              :value="user.gender"
              type="gender"
              @change="v => handleFieldChange(v, 'gender')"
            />
          </div>

          <div class="label hole-line">Date of birth</div>
          <div class="value hole-line nav dob">

            <el-select
              :placeholder="'Not specified'"
              v-model="dob.month"
              size="small"
            >
              <el-option
                value="0"
                label="January"
              />

              <el-option
                value="1"
                label="February"
              />

              <el-option
                value="2"
                label="March"
              />

              <el-option
                value="3"
                label="April"
              />

              <el-option
                value="4"
                label="May"
              />

              <el-option
                value="5"
                label="June"
              />

              <el-option
                value="6"
                label="July"
              />

              <el-option
                value="7"
                label="August"
              />

              <el-option
                value="8"
                label="September"
              />

              <el-option
                value="9"
                label="October"
              />

              <el-option
                value="10"
                label="November"
              />

              <el-option
                value="11"
                label="December"
              />
            </el-select>

            <fg-input
              class="input--short"
              v-model="dob.day"
              placeholder="Day"
              style="margin: 0 10px;"
            />

            <fg-input
              class="input--short"
              v-model="dob.year"
              placeholder="Year"
            />
          </div>

          <div class="label">Website</div>
          <div class="value">
            <editable-field
              :value="user.website"
              @change="v => handleFieldChange(v, 'website')"
            />
          </div>

          <div class="label">Photo</div>
          <div class="value">
            <label
              class="drop-down-activator"
              for="upload-photo"
              v-loading="loadingPhoto"
            >
              Upload
            </label>

            <input
              @change="handlePhotoUpload"
              type="file"
              name="photo"
              id="upload-photo"
              ref="avatarUpload"
            />
            
            <div
              class="error"
              v-if="loadingPhotoStatus.type === 'error'"
            >
              {{ loadingPhotoStatus.message }}
            </div>

            <div
              class="success"
              v-if="loadingPhotoStatus.type === 'success'"
            >
              {{ loadingPhotoStatus.message }}
            </div>
          </div>
        </div>

        <h5 class="header header--subheader">
          Bio
        </h5>

        <Editor1
          :userBio="getUserBio"
          @newSignature="bioUser"
        />

        <h5 class="header header--subheader">
          Forum signature
        </h5>
        <Editor1
          :userSignature="getUserSign"
          @newSignature="sigUser"
        />
      </div>
        <item-list 
          type="cam"
          @updateUser="userUpdateInfo"
          :userCameras="resultCameras"
          :userLenses="resultLenses"
        /> 
      <div class="site-preferences">
        <h4 class="header">
          Site preferences
        </h4>

        <site-preferences
          :value="sitePreferences"
        />
      </div>

      <el-button
        plain
        type="primary"
        class="save-btn"
        :loading="loading"
        @click="handleSubmit"
      >
        Save
      </el-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { FormGroupInput as FgInput } from '~/components'
import { Button, Select, Option } from 'element-ui'

import { getObjectDifference, isObjectEmpty } from '~/helpers'

Vue.use(Button)
Vue.use(Select)
Vue.use(Option)


export default {
  meta: {
    authRequired: true
  },
  
  components: {
    DropDown: () => import('@/components/Dropdown.vue'),
    EditableField: () => import('~/components/custom/EditableField.vue/index.vue'),
    ItemList: () => import('./ItemList'),
    SitePreferences: () => import('./SitePreferences'),
    FgInput,
    Editor1: () => import('~/components/custom/TipTopEditor.vue'),
    Editor1: () => import('~/components/custom/TipTopEditor.vue')
  },

  data () {
    return {
      newPost: '',
      editor: null,
      linkUrl: null,
      linkMenuIsActive: false, 
      loading: false,
      errorPost: '',
      text: '',
      dob: {
        year: '',
        month: '',
        day: ''
      },      
      user: {},      
      userOldCopy: {},
      loading: false,
      loadingPhoto: false,
      loadingPhotoStatus: {
        type: '',
        message: ''
      },
      sitePreferences: {},
      sitePreferencesOldCody: null,
      resultCameras: [],
      resultLenses: []
    }
  },
  mounted () {
    this.updateProfileInfo()
    this.updateUserPreferences()
  },

  methods: {
    handlePhotoUpload () {
      const photo = this.$refs.avatarUpload.files[0]

      this.loadingPhoto = true

      this.loadingPhotoStatus.type = ''
      this.loadingPhotoStatus.message = ''

      this.$api
        .uploadUserPhoto({somefile: photo})
        .then(({ data: { result } }) => {
          this.$api
            .updateUserInfo({
              user_image: result.images[0]
            })
            .then(({ data }) => {
              this.$store.commit('user/setAvatar', data.result.user_image)

              this.loadingPhotoStatus.type = 'success'
              this.loadingPhotoStatus.message = 'Avatar has been changed'
            })
            .catch(e => {
              this.loadingPhotoStatus.type = 'error'
              this.loadingPhotoStatus.message = 'Error'
            })
            .finally(_ => {
              this.loadingPhoto = false
            })
        })
        .catch(e => {
          this.loadingPhotoStatus.type = 'error'
          this.loadingPhotoStatus.message = 'Error'
        })
        .finally(_ => {
          this.loadingPhoto = false
        })
    },
    updateUserPreferences () {
      this.$api
        .getUserPreferences()
        .then(({ data: { result } }) => {
          for (const prop in result) {
            this.$set(this.sitePreferences, prop, result[prop])
          }

          this.sitePreferencesOldCody = JSON.parse(JSON.stringify(this.sitePreferences))
        })
    },
    updateProfileInfo () {
      this.loading = true

      this.$api
        .getMyUserInfo()
        .then(({ data: { result } }) => {
          if (!this.user.bio) {
            this.user.bio = ''
          }

          this.resultCameras = result.cameras
          this.resultLenses = result.lenses

          for (const prop in result) {
            this.$set(this.user, prop, result[prop])
          }
          const dob = new Date(this.user.birth_date)

          this.dob.month = dob.getMonth().toString()
          this.dob.day = dob.getDate()
          this.dob.year = dob.getFullYear()

          this.userOldCopy = JSON.parse(JSON.stringify(this.user))
        })
        .finally(_ => {
          this.loading = false
        })
    },
    handleSubmit () {
      this.loading = true
      
      if (this.dob.month) {
        const currentDate = this.user.birth_date ? new Date(this.user.birth_date) : new Date()

        this.user.birth_date = (new Date(currentDate.setMonth(+this.dob.month))).toDateString()
      }

      if (this.dob.day) {
        const currentDate = this.user.birth_date ? new Date(this.user.birth_date) : new Date()

        this.user.birth_date = (new Date(currentDate.setDate(+this.dob.day))).toDateString()
      }

      if (this.dob.year) {
        const currentDate = this.user.birth_date ? new Date(this.user.birth_date) : new Date()

        this.user.birth_date = (new Date(currentDate.setFullYear(+this.dob.year))).toDateString()
      }

      const diffUser = getObjectDifference(this.user, this.userOldCopy)

      const diffSitePreferences = getObjectDifference(this.sitePreferences, this.sitePreferencesOldCody)

      const requests = []

      if (!isObjectEmpty(diffUser)) {
        requests.push(this.$api.updateUserInfo(diffUser))
      }

      if (!isObjectEmpty(diffSitePreferences)) {
        requests.push(this.$api.updateUserPreferences(diffSitePreferences))
      }

      Promise
        .all(requests)
        .finally(_ => {
          this.loading = false
        })
    },
    handleFieldChange (value, field) {
      this.user[field] = value
    },

    sigUser (data) {
      this.user.signature = data
    },

    bioUser (data) {
      this.user.bio = data
    },

    userUpdateInfo () {
      this.updateProfileInfo()
    }
  },

  computed: {
    getUserBio () {
      return this.user.bio
    },
    getUserSign () {
      return this.user.signature
    },
    getUserCameras () {
      return this.user.cameras
    },
    getUserLenses () {
      return this.user.lenses
    }
  }
}
</script>

<style lang="scss">
.ck-editor__editable_inline {
  min-height: 145px;
}

.dob {
  .el-input {    
    &__inner {
      height: 37px;
      width: 115px;
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
}
</style>

<style lang="scss" scoped>
#upload-photo {
  opacity: 0;
  position: absolute;
  z-index: -1;
  max-width: 100px;
}

.profile-preference-page {
  // margin-bottom: 50px;
  padding-bottom: 50px;
  overflow: hidden;

  max-width: 550px;
  margin: 0 auto;

  .header {
    font-size: 16px;
    
    &--main {
      font-size: 18px;
    }
  }

  .input--short {
    width: 80px;
  }

  .hole-line {
    // grid-column: 1 / 3;

    &.label {
      margin: 5px 0;
    }

    &.value {
      margin-bottom: 5px;
    }
  }

  .drop-down-activator {
    background-color: transparent;
    border: 1px solid #E3E3E3;
    border-radius: 3px;
    padding: 9px 18px 8px 18px;
    font-size: 0.8571em;

    &:hover {
      cursor: pointer;
    }
  }

  .user-info {
    max-width: 550px;

    display: grid;
    grid-template-columns: 150px 1fr;
    grid-column-gap: 10px;

    .header {
      grid-column: 1 / 3;

      margin-bottom: 10px;
      margin-top: 0;
    }

    .label {
      font-weight: bold;

      display: flex;
      align-items: center;
    }

    .value {
      transition: all .2s ease-in;

      height: 45px;

      display: flex;
      flex-wrap: wrap;
      word-break: break-all;
      align-items: center;

      .error,
      .success {
        margin-left: 10px;
      }
    }
  }

  .user-profile {
    max-width: 550px;
    padding-right: 10px;

    .header.header--subheader {
      margin-bottom: 5px;
      margin-top: 10px;
    }
  }

  .cameras,
  .lenses {
    max-width: 550px;

    .topbar {
      display: flex;
      justify-content: space-between;

      &__add {
        margin-top: auto;
        margin-bottom: 15px;
      }
    }
  }

  .site-preferences {
    max-width: 550px;
  }

  .save-btn {
    min-width: 100px;
    float: right;
    margin-top: 10px;
  }
}

.user-profile {
    padding-right: 0 !important;
  }

@media (min-width: 768px) {
  .user-profile {
    padding-right: 0 !important;
  }
}

@media (max-width: 480px) {
  .user-info {
    grid-template-columns: 110px 1fr !important;

    .value {
      flex-wrap: nowrap !important;
    }

    .hole-line {
      grid-column: 1 / 3;
      flex-wrap: nowrap;
    }
  }


}
</style>

//css for tiptop
<style lang="scss">
  .ProseMirror {
    height: 100%;
    width: 100%;

    p {
      margin-bottom: 0px;
    }

    a {
      cursor: pointer
    }
  }

blockquote {
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 5px 15px;
  background-color: #f7f8fa;
  position: relative;
  border-radius: 3px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  overflow: hidden;
  border-left: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background: #2172cd;
  }
}
</style>

<style lang="scss" scoped>
//tiptop -------
.editor {
  background-color: #fff;
  border: 1px solid silver;

  .menubar {
    background-color: rgb(233, 233, 233);
    padding: 4px;
    border-bottom: 1px solid silver;

    .is-active {
      color: #2172cd
    }

    .menubar__button_image {
      width: 25px;
      height: 25px;
      background-color: #fff;
      padding: 3px;
      border: none;
      cursor: pointer;
      margin-left: 10px;

      .icon_button {
        margin: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .menubar__button {
      width: 25px;
      height: 25px;
      background-color: #fff;
      padding: 3px;
      border: none;
      cursor: pointer;
      margin-top: 2px;

      .icon_button {
        margin: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  
  .editor__container {
    height: 180px;
    display: block;
    box-sizing: border-box;
    overflow: auto;
  }

    .input__link {
      display: flex;
      margin-top: 4px;
      margin-bottom: 2px;

    .menububble__input {
      border-radius: 2px;
      border: 1px solid silver;
      padding: 3px;
      padding-left: 8px;
      height: 25px;
    }

    .menubar__button-check {
      background-color: #ebebeb !important;
      border: none;
      margin-left: 7px;
      cursor: pointer;
    }

    .icon_button-check {
      color: green;
    }

    .icon_button-times {
      color: red
    }

    .menubar__button-times {
      width: 27px;
      background-color: #ebebeb !important;
      border: none;
      cursor: pointer;
    }
  }
}
</style>
