<template>
  <div class="site-preferences-container">
    <h6 class="subheader">
      My Home Preferences
    </h6>

    <div class="option">
      <div class="option__value">
        <fg-input class="input--short"
          v-model="value.recent_forum_threads_count"
        />
      </div>

      <div class="option__title">
        Recent Forum Activity Threads
      </div>

      <div class="option__description">
        Max 30. 0 = Off. Number of thread links displayed.
      </div>
    </div>

    <div class="option">
      <div class="option__value">
        <el-checkbox
          v-model="value.show_average_score_for_my_submission"
        />
      </div>

      <div class="option__title">
        My Scores
      </div>

      <div class="option__description">
        Show average score for my submissions during voting week.
      </div>
    </div>

    <h6 class="subheader">
      E-Mail Preferences
      <br><span class="tip">
        * Note: Your email address, no matter what preferences chosen, will never be given or sold to any third parties.
      </span>
    </h6>

    <!-- <div class="option">
      <div class="option__value">
        <el-checkbox />
      </div>

      <div class="option__title">
        HTML E-Mail
      </div>

      <div class="option__description">
        My e-mail client supports HTML.
      </div>
    </div> -->

    <div class="option">
      <div class="option__value">
        <el-checkbox
          v-model="value.weekly_update"
        />
      </div>

      <div class="option__title">
        Weekly Update
      </div>

      <div class="option__description">
        Send me the weekly update including challenge winners, new challenges, and site news every wednesday morning
      </div>
    </div>

    <div class="option">
      <div class="option__value">
        <el-checkbox
          v-model="value.email_on_photo_comments"
        />
      </div>

      <div class="option__title">
        Recent Comments
      </div>

      <div class="option__description">
        E-mail me when I receive a comment on any of my images that are not in voting.
      </div>
    </div>

    <div class="option">
      <div class="option__value">
        <el-checkbox
          v-model="value.email_on_private_message"
        />
      </div>

      <div class="option__title">
        Private Message Notifications
      </div>

      <div class="option__description">
        E-mail me when I receive a private message on DPChallenge.
      </div>
    </div>

    <div class="option">
      <div class="option__value">
        <el-checkbox
          v-model="value.email_on_speed_challenges"
        />
      </div>

      <div class="option__title">
        Speed Challenges
      </div>

      <div class="option__description">
        E-mail me when there's a 24- or 48-Hour Challenge I can compete in.
      </div>
    </div>

    <div class="option">
      <div class="option__value">
        <el-checkbox
          v-model="value.email_on_submission"
        />
      </div>

      <div class="option__title">
        Confirmations
      </div>

      <div class="option__description">
        Send me e-mail confirmations when I submit to a challenge.
      </div>
    </div>

    <div class="option">
      <div class="option__value">
        <el-checkbox
          v-model="value.public_email"
        />
      </div>

      <div class="option__title">
        Display E-Mail Address
      </div>

      <div class="option__description">
        Show my e-mail address on my profile page.
      </div>
    </div>

    <h6 class="subheader">
      Forum / Discussion Preferences
    </h6>

    <div class="option">
      <div class="option__value">
        <fg-input
          class="input--short"
          v-model="value.posts_per_page"
        />
      </div>

      <div class="option__title">
        Posts Per Page
      </div>

      <div class="option__description">
        Min 5. Max 200. Number of replies shown per page when reading a thread.
      </div>
    </div>

    <div class="option">
      <div class="option__value">
        <el-checkbox
          v-model="value.hide_profile_photos"
        />
      </div>

      <div class="option__title">
        Hide Profile Photos
      </div>

      <div class="option__description">
        Do not display user's profile photos beside their name.
      </div>
    </div>

    <div class="option">
      <div class="option__value">
        <el-checkbox
          v-model="value.hide_signatures"
        />
      </div>

      <div class="option__title">
        Hide Signatures
      </div>

      <div class="option__description">
        Hide other user's signatures from forum listings.
      </div>
    </div>

    <div class="option">
      <div class="option__value">
        <el-checkbox
          v-model="value.reverse_replies"
        />
      </div>

      <div class="option__title">
        Reverse Replies
      </div>

      <div class="option__description">
        Show replies in order of most-recent first.
      </div>
    </div>

    <h6 class="subheader">
      Image Preferences
    </h6>

    <div class="option">
      <div class="option__value">
        <fg-input class="input--short"
          v-model="value.image_per_row"
        />
      </div>

      <div class="option__title">
        Images Per Row
      </div>

      <div class="option__description">
        Min 3. Max 10. Number of images shown per row on thumbnail-view pages (1 will be subtracted for those pages with content on the left).
      </div>
    </div>

    <div class="option">
      <div class="option__value">
        <fg-input class="input--short"
          v-model="value.rows_per_page"
        />
      </div>

      <div class="option__title">
        Rows Per Page
      </div>

      <div class="option__description">
        Min 3. Max 100. How many rows of images shown per page in thumbnail-view.
      </div>
    </div>

    <div class="option">
      <div class="option__value">
        <el-checkbox
          v-model="value.hide_adult"
        />
      </div>

      <div class="option__title">
        Hide Adult Content
      </div>

      <div class="option__description">
        After voting, do not show thumbnails flagged as adult content. Do not show forum posts flagged as adult content.
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import { Checkbox } from 'element-ui'
import { FormGroupInput as FgInput } from '~/components'

Vue.use(Checkbox)

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  components: { FgInput }
}
</script>

<style lang="scss" scoped>
.site-preferences-container {
  .subheader {
    margin: 10px 0;
    .tip {
      text-transform: none;
      font-weight: normal;
    }
  }

  .option {
    display: grid;
    grid-template-columns: 55px 1fr;
    grid-column-gap: 10px;

    &__value {
      grid-row: 1 / 3;

      display: flex;
      align-items: flex-start;
      justify-content: flex-end;

      padding-top: 1px;

      .input--short {
        width: 52px;
        margin-bottom: 0;
      }
    }

    &__title {
      font-weight: bold;
    }
  }
}
</style>
