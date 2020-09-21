<template>
  <div class="challenge-submission-page" v-loading="loading.info">
    <div class="header" v-if="challengeInfo">
      <span class="text--bold">
        Challenge Details
      </span> 
      
      - {{ challengeInfo.title }}
    </div>

    <div class="challenge-info" v-if="challengeInfo">
      <div class="challenge-info__block">
        <div class="title">
          Challenge Details:
        </div>

        <div class="value">
          {{ challengeInfo.description }}
        </div>
      </div>

      <div class="challenge-info__block">
        <div class="title">
          Challenge Type:
        </div>

        <div class="value">
          {{ decodeChallengeType(challengeInfo.type) }}
        </div>
      </div>

      <div class="challenge-info__block">
        <div class="title">
          Challenge Rules:
        </div>

        <div class="value link">
          {{ decodeChallengeRules(challengeInfo.ruleset) }}
        </div>
      </div>

      <div class="challenge-info__block">
        <div class="title text--red">
          Extra Rules:
        </div>

        <div class="value">
          {{ challengeInfo.extra_rules }}
        </div>
      </div>

      <div class="challenge-info__block">
        <div class="title">
          Submission Deadline:
        </div>

        <div class="value">
          {{ ISOToReadableString(challengeInfo.submission_end_date) }} 
          (began {{ ISOToReadableString(challengeInfo.submission_start_date) }})
        </div>
      </div>

      <div class="challenge-info__block">
        <div class="title">
          Voting Dates:
        </div>

        <div class="value">
          {{ ISOToReadableString(challengeInfo.vote_start_date) }} 
          - 
          {{ ISOToReadableString(challengeInfo.vote_end_date) }}
        </div>
      </div>
    </div>

    <div
      v-if="submission.thumbnail"
      class="preview__container"
    >
      <div class="header--image text--bold">
        Your entry thumbnail
      </div>

      <div
        class="user-entry__preview"
        style="margin-bottom: 1rem"
      >
        <img
          :src="$api.resolveImageUrl(submission.thumbnail)"
        >
      </div>

      <nuxt-link
        class="link link--bold link__button"
        :to="'voting-preview?id=' + submission.id"
      >
        Preview your entry
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
      :isParticipant="isParticipant"
      :agreed="agreed"
      :clearSetting="clearSetting"
      class="details-form"
      v-if="showDetailsForm"
    />

    <div class="uploading">
      <div>
        <div class="header">
          <span class="text--bold">
            {{ submission ? 'Update your entry photo' : 'Upload Your Entry'}}
          </span>
        </div>

        <div class="user-entry" @click="handleChangeImage">
          <el-upload
            class="avatar-uploader user-entry__upload"
            drag
            :http-request="uploadPhoto"
            action="undefined"
            v-loading="loading.photo"
            :disabled="!!submission.thumbnail"
          >
          <!-- :file-list="array" -->
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
            <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 700kb</div>
          </el-upload>
        </div>
        <div v-if="isAddNotification">
          <small style="color: red"> {{ notificationText }} </small> 
        </div>
      </div> 

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

    <div class="agreement">
      <el-checkbox
        v-model="agreed"
      />

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
      type="primary"
      :disabled="!agreed"
      class="submit-btn"
      @click="handleSubmit"
    >
      Submit
    </el-button>

    <div 
      v-if="isError"
      class="error-message"
    >
      <el-alert
        title="Error: you have already joined the challenge or the challenge submission is no longer relevant"
        type="error"
      />
    </div>

    <div class="tip">
      * Not abiding by these rules may result in disqualification of your submission and possibly a suspension of your account.
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Upload, Checkbox, Button } from 'element-ui'
import SubmitChallengeDetails from '~/components/custom/SubmitChallengeDetails'
import 'element-ui/lib/theme-chalk/index.css';

import { ISOToReadableString, ISOTimeForChallenge, ISOToDateOfBirth, decodeChallengeType, decodeChallengeRules  } from '~/helpers'

Vue.use(Upload)
Vue.use(Checkbox)
Vue.use(Button)

export default {
  components: {
    SubmitChallengeDetails
  },

  data () {
    return {
      showDetailsForm: true,
      submissionDeleted: false,

      imagePath: '',
      imagePaths: '',
      folderPreview: '',
      fullString: '',

      agreed: false,
      isParticipant: false,

      challengeInfo: null,

      submission: {},
      clearSetting: false,
      isError: false,

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
    this.getChallengeInfo()
  },

  methods: {
    ISOToReadableString,
    ISOTimeForChallenge,
    ISOToDateOfBirth,
    decodeChallengeType,
    decodeChallengeRules,

    uploadPhoto (payload) {
      this.loading.photo = true

      const {
        file,
        onSuccess,
        onError,
        onProgress
      } = payload 

      this.$api
        .uploadPhoto({
          filename: file
        })
        .then(({ data: { result } }) => {
          this.folderPreview = result.path
          this.imagePaths = `${result.images[0]}`
          this.imagePath = `${result.images[0]}`
          this.fullString = `${this.folderPreview}/${this.imagePaths}`
          
          this.showDetailsForm = true
          payload.onSuccess()
        })
        .catch(e => {
          this.$notify.error({
            title: 'Error',
            message: 'photo upload failed'
          });
        })
        .finally(_ => {
          this.loading.photo = false
          this.showSubmitThumbnail = true
          this.clearSetting = false
        })
    },

    getChallengeInfo () {
      this.loading.info = true
      this.$api
        .getChallengeMeta(this.$route.query.id)
        .then(({ data: { result } }) => {
          this.challengeInfo = result.items[0]
          this.isParticipant = result.items[0].is_participant
          if (this.isParticipant) {
            this.getChallengeEntry()
          }          
        })
        .catch(e => {
           this.$notify.error({
            title: 'Error',
            message: 'This challenge submission not found'
          });
        })
        .finally(_ => {
          this.loading.info = false
        })
    },

    handleSubmit () {
      this.loading.info = true
      this.isError = false

      const apiMethod = this.submission.thumbnail
        ? this.$api.updateChallengeMeta
        : this.$api.setChallengeMeta
      apiMethod({
        image_name: this.imagePath,
        challenge_id: this.$route.query.id
      })
        .then(({ data: { result } }) => {
          this.getChallengeInfo()
        })
        .catch(err => {
          this.$notify.error({
            title: 'Error',
            message:  'Error: you have already joined the challenge or the challenge submission is no longer relevant'
          });
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
          alert("You are not participant of this challenge", e)
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
        
        this.$confirm('If you want to change the image, the previous one will be deleted, continue?')
          .then(_ => {
            const { id } = this.submission

            this.$api
              .deleteChallengeSubmission(id)
              .then(({ data: { result } }) => {
                this.keyData++
                this.imagePath = ''
                this.array = []
                this.isParticipant = false

                this.submissionDeleted = false
                this.submission.thumbnail = ''

                this.agreed = false
                this.imagePaths = false
                this.clearSetting = true
              })
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
.challenge-submission-page {
  .el-alert__content {
    margin-right: .5rem;
  }
}
</style>

<style lang="scss" scoped>
.challenge-submission-page {
  max-width: 900px;
  margin: 0 auto;

  padding-bottom: 30px;

  .error-message {
    margin-bottom: 1rem;
    max-width: 540px;
  }

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