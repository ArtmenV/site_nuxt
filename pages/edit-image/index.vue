<template>
  <div class="challenge-submission-page" v-loading="loading.info">
    <TreeFolder 
      :folderCollection="folderCollection"
      :folderName="folderName"
      :submission="submission.collection"
    />
    <div
      v-if="submission.thumbnail"
      class="preview__container"
    >
      <div
        class="user-entry__preview"
        style="margin-bottom: 1rem"
      >
        <nuxt-link
          class="link link--bold link__button return-link"
          :to="'image?id=' + imageData.id"
        >
          <img
            :src="$api.resolveImageUrl(submission.thumbnail)"
          >
        </nuxt-link>
      </div>
        <nuxt-link
          class="link link--bold link__button return-link"
          :to="'image?id=' + imageData.id"
        >
          Return to image page
        </nuxt-link>
      <span
        class="link link--bold link__button"
        @click="unsubmit"
      > 
        Unsubmit your photograph
      </span>
    </div>

    <submit-challenge-details
      :key="keyData"
      :imageData="imageData"
      :isParticipant="isParticipant"
      :agreed="agreed"
      :clearSetting="clearSetting"
      class="details-form"
      v-if="showDetailsForm"
    />

    <div 
      v-if="submission.is_photo_in_submission || typeof submission.is_photo_in_submission !== 'boolean'"
      class="uploading"
      >
      <div>
        <div class="header">
          <span class="text--bold">
            {{ submission ? 'Update your entry photo' : 'Upload Your Entry'}}
          </span>
        </div>
        <!-- <span v-if="submission.thumbnail">
          <strong>Note:</strong>
          you can replace the image but the current one will be lost?
        </span> -->


        <div class="user-entry">
          <el-upload
            class="avatar-uploader user-entry__upload"
            drag
            :http-request="uploadPhoto"
            action="undefined"
            v-loading="loading.photo"
            
          > 
          <!-- :disabled="!!submission.thumbnail" -->
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
            <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 700kb</div>
          </el-upload>
        </div>
        <div v-if="isAddNotification">
          <small style="color: red"> {{ notificationText }} </small> 
        </div>
      </div> 
      <!-- :file-list="array"  -->

      <!-- preview image -->
      <div
        v-if="imagePaths && showSubmitThumbnail"
        class="user-entry__preview"
        style="margin-bottom: 1rem"
        v-loading="loading.photo"
      >
        <div 
          class="user-entry__preview-container"
          style="margin-top: .5rem"
        >
          <img
            :src="$api.resolveImageUrl(fullString)"
            v-loading="loading.photo"
          >
          <span 
            style="margin-top: .5rem"
          >
            Preview image
          </span>
        </div>
      </div>
    </div>


    <div
      v-if="submission.is_photo_in_submission || typeof submission.is_photo_in_submission !== 'boolean'"
    >
      <div 
        class="agreement"
        v-if="submission.is_photo_in_submission"
      >
        <el-checkbox v-model="agreed"/>

        <div class="agreement__text">
          I submit that my entry was based on photograph(s) taken with a digital camera on or between
          {{ challengeInfo ? ISOTimeForChallenge(challengeInfo.submission_start_date) : ISOToDateOfBirth(new Date()) }} 
          and
          {{ challengeInfo ? ISOTimeForChallenge(challengeInfo.submission_end_date) : ISOToDateOfBirth(new Date()) }}.
          If requested, I will provide the unedited, original file from my digital camera within 48 hours.
          I have followed the <span class="link">Standard Editing rule set</span>, taking into account any extra rules listed above.*
        </div>
      </div>

      <el-button
        v-if="submission.is_photo_in_submission"
        type="primary"
        :disabled="!agreed"
        class="submit-btn"
        @click="handleSubmit"
      >
        Submit
      </el-button>

      <el-button
        style="marginTop: 1rem"
        v-if="!submission.is_photo_in_submission"
        :disabled="!newImage"
        type="primary"
        class="submit-btn"
        @click="handleSubmit"
      >
        Submit
      </el-button>

      <!-- <el-button
        v-if=""
        type="primary"
        class="submit-btn"
        @click="updateCollectionPhoto"
      >
        Submit
      </el-button> -->

      <div class="tip">
        * Not abiding by these rules may result in disqualification of your submission and possibly a suspension of your account.
      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import { Upload, Checkbox, Button } from 'element-ui'
import SubmitChallengeDetails from '~/components/custom/SubmitChallengeDetails'

import { ISOToReadableString, ISOTimeForChallenge, ISOToDateOfBirth, decodeChallengeType, decodeChallengeRules  } from '~/helpers'

Vue.use(Upload)
Vue.use(Checkbox)
Vue.use(Button)

export default {
  components: {
    SubmitChallengeDetails,
    TreeFolder: () => import('~/components/custom/portfolio/treeFolder')
  },

  data () {
    return {
      showDetailsForm: true,
      submissionDeleted: false,

      imagePath: '',
      imagePaths: '',
      folderPreview: '',
      fullString: '',
      entry: {},
      imageData: {},
      newImage: null,
      folderCollection: null,
      folderName: '',

      agreed: false,
      isParticipant: false,

      challengeInfo: null,

      submission: {},
      clearSetting: false,

      array: [],

      loading: {
        photo: false,
        details: false,
        info: false
      },

      startSubmissionDate: '',
      endSubmissionDate: '',

      showSubmitThumbnail: false,

      keyData: 1,
      isCanUpload: false,
      isAddNotification: false,
      notificationText: 'You need delete previous photo to handle upload new photo'
    }
  },

  mounted () {
    // this.getChallengeInfo()
    // this.getChallengeEntry()
    this.getEntryInfo()
  },

  methods: {
    ISOToReadableString,
    ISOTimeForChallenge,
    ISOToDateOfBirth,
    decodeChallengeType,
    decodeChallengeRules,

    async uploadPhoto (payload) {

    this.loading.photo = true

    const {
      file,
      onSuccess,
      onError,
      onProgress
    } = payload 

    this.newImage = payload.file

      if ( this.submission.thumbnail ) {
        try {
          await this.$confirm('Are you sure you want to replace previos image?')
          const { data:  {result} } = await this.$api.uploadPhoto({ photo: file })
          this.folderPreview = result.path
          this.imagePaths = `${result.images[0]}`
          this.imagePath = `${result.images[0]}`
          this.fullString = `${this.folderPreview}/${this.imagePaths}`
          
          this.showDetailsForm = true
          payload.onSuccess()
        } catch {
          throw e
        } finally {
          this.loading.photo = false
          this.showSubmitThumbnail = true
          this.clearSetting = false
        }
      }
    },

    getEntryInfo () {
      // this.loading = true

      this.gotEntry = false

      this.$api
        .getChallengeEntry(this.$route.query.id)
        .then(({ data: { result } }) => {
          this.imagePath = result.thumbnail
          // console.log(result)
          for (const prop in result) {
            this.$set(this.submission, prop, result[prop])
          }

          if (result.collection.id) {
            this.folderCollection = result.collection.id 
            this.folderName = result.collection.name 
          } else {
            this.folderCollection = 0
            this.folderName = "Portfolio"
          }

          

          this.imageData = result

          // for (const prop in result) {
          //   this.$set(, prop, result[prop])
          // }

          this.gotEntry = true
        })
        .catch(({ response }) => {
        })
        .finally(_ => {
          // this.loading = false

          if (this.entry.thread_id) {
            // this.getThreadPosts()
          } else {
            this.posts = []
          }
        })
    },

    // getChallengeInfo () {
    //   this.loading.info = true

    //   this.$api
    //     .getChallengeMeta(this.$route.query.id)
    //     .then(({ data: { result } }) => {
    //       this.challengeInfo = result.items[0]
    //       this.isParticipant = result.items[0].is_participant

    //     })
    //     .catch(e => {
    //     })
    //     .finally(_ => {
    //       this.loading.info = false
    //       // this.getChallengeEntry()
    //     })
    // },

    handleSubmit () {
      this.loading.info = true
      let data = {}
      const id = Number(this.$route.query.id)
      let apiMethod

      if (this.submission.is_photo_in_submission) {
          apiMethod = this.$api.updateChallengeMeta
          data = {
          image_name: this.imagePath,
          challenge_id: this.submission.challenge.id
        }
      } else {
          apiMethod = this.$api.replaceImage
          data = {
          photo: this.newImage,
          id
        }
      }
      // const apiMethod = this.submission.thumbnail
      //   ? this.$api.updateChallengeMeta
      //   : this.$api.setChallengeMeta

      apiMethod(data)
        .then(({ data: { result } }) => {
          this.getEntryInfo()
        })
        .catch(e => {
        })
        .finally(_ => {
          this.loading.info = false
          this.showSubmitThumbnail = false
          this.fullString = false
        })
    },

    getChallengeEntry () {
      this.loading.details = true
      this.$api
        .getSubmittedEntry(this.$route.query.id)
        .then(({ data: { result } }) => {
          this.imagePath = result.thumbnail
          for (const prop in result) {
            this.$set(this.submission, prop, result[prop])
          }
        })
        .catch(e => {
          console.log("You are not participant of this challenge", e)
        })
        .finally(_ => {
          this.loading.details = false
        })
    },

    unsubmit () {
      this.$confirm('Are you sure you want to unsubmit your photograph?')
        .then(_ => {
          const { id } = this.submission

          this.$api
            .deleteChallengeSubmission(id)
            .then(({ data: { result } }) => {
              this.imagePath = ''
              this.array = []

              this.submissionDeleted = false
              this.submission.thumbnail = ''

              this.agreed = false
              this.imagePaths = false
              this.clearSetting = true
            })
        })
    },

    handleChangeImage () {
      if ( this.submission.thumbnail ) {
        
        this.$confirm('Are you sure you want to replace the image?')
          .then(_ => {
            // const { id } = this.submission

            // this.$api
            //   .deleteChallengeSubmission(id)
            //   .then(({ data: { result } }) => {
            //     this.keyData++
            //     this.imagePath = ''
            //     this.array = []
            //     this.isParticipant = false

            //     this.submissionDeleted = false
            //     this.submission.thumbnail = ''

            //     this.agreed = false
            //     this.imagePaths = false
            //     this.clearSetting = true
            //   })
            // this.uploadPhoto()
          })
      }
    }
  },

  computed: {
    uploadNewPhoto () {
      if ( this.submission.thumbnail ) {
        return this.isCanUpload = true
      } else {
        return this.isCanUpload = false
      }
    },
  },

  watch: {
    submission : {
      handler: function ( val ) {
        if ( this.submission.thumbnail ) {
          this.keyData++
        }
      },
      deep: true
    },

    isParticipant: {
      handler: function (val) {
        if (val) {
          this.getChallengeEntry()
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
@media (max-width: 475px) {
  .challenge-submission-page {
    .el-upload-dragger {
      width: calc(100vw - 40px);
    }
  }

  .el-message-box {
    max-width: 220px;
  }
}

.el-upload-list__item-name {
  width: 220px !important;
}

.user-entry__upload {
  max-width: 360px !important;
  .el-upload-list.el-upload-list--text {
    display: none
  }
}


</style>

<style lang="scss" scoped>
.challenge-submission-page {
  max-width: 900px;
  margin: 0 auto;

  padding-bottom: 30px;

  .preview__container {
    display: flex;
    flex-direction: column;
  }

  .details-form {
    margin-top: 20px;
  }

  .user-entry {
    display: grid;
    grid-row-gap: 10px;
    grid-column-gap: 30px;
  }

  .header {
    padding-top: 20px;
    padding-bottom: 15px;
    font-size: 18px;
    color: #2c2c2c;
  }

  .header--image {
    padding-top: 2rem;
    padding-bottom: 15px;
    font-size: 18px;
    color: #2c2c2c;
  }

  .challenge-info {
    margin: 0;
    padding: 0;

    display: grid;
    grid-row-gap: 10px;

    .title {
      padding-top: 0;
    }
  }

// .return-link {
//   display: flex;
//   flex-direction: column;
// }

  .agreement {
    margin: 20px 0;

    display: grid;
    grid-template-columns: 30px 1fr;
  }

  .submit-btn {
    margin-bottom: 20px;
  }

  .tip {
    font-size: 12px;
  }
}

.uploading {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;

  .el-upload__tip {
    width: 240px;
  }

  .user-entry__preview {
    display: flex;
    max-width: 200px;
    max-height: 400px;
    flex-direction: column;
    align-items: left;
    // justify-content: flex-end;
    align-self: center;
    // margin-bottom: 2rem !important;
    text-align: center;
    margin-top: 3.5rem;

    .user-entry__preview-container {
      
      height: 200px;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-self: flex-start;
    }

    img {
      max-height: 80%;
      max-width: auto;
    }

    & > span {
      margin-top: .5rem;
      text-align: left;
    }
  }
}

.text--center {
  text-align: left;
}

.link__button {
  max-width: 230px;
}

@media (max-width: 475px) {
  .submit-btn {
    width: 100%;
  }
}

@media (min-width: 475px) {
  .challenge-info {
    &__block {
      display: grid;
      grid-template-columns: 180px 1fr;      
    }
  }
}

@media (min-width: 700px) {
  // .user-entry {
  //   // grid-template-columns: 1fr 1fr;
  // }
}

@media (min-width: 1000px) {
  .uploading {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 30px;
  }
}

@media (max-width: 620px) {
  .uploading {
    display: grid;
    grid-template-columns: 1fr;

    .user-entry__preview {
      display: flex;
      max-width: 200px;
      height: 200px;
      flex-direction: column;
      align-items: left;
      justify-content: center;
      align-self: center;
      margin-bottom: 0rem !important;
      margin-left: 1.6rem;
      text-align: center;

      .user-entry__preview-container {
        height: 200px;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-self: flex-start;
      }

      img {
        max-height: 80%;
        max-width: auto; 
      }

      & > span {
        margin-top: .5rem;
        text-align: left;
      }
    }
  }

}
</style>
        .uploading {
          .user-entry__preview > img {
            height: 180px;
          }
        }