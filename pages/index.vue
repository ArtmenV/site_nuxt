<template>
  <div class="page__main">
    <!-- <main-page-top-bar
      v-if="isAuthorized"
      class="top-bar"
    /> -->
    <UserVotingStage 
      v-if="isAuthorized" 
    /> 

    <!-- Challenges with photos -->
    <latest-challenges />

    <!-- Lists with challenges -->
    <div class="challenge-lists">
      <challenge-list type="open-for-submission" />

      <challenge-list type="needing-your-votes" />
    </div>

    <!-- Latest forum acitivity -->
    <latest-forum-activity />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookie from 'js-cookie'
export default {

  components: {
    LatestChallenges: () => import('./_components/LatestChallenges'),
    ChallengeList: () => import('./_components/ChallengeList'),
    LatestForumActivity: () => import('./_components/LatestForumActivity'),
    MainPageTopBar: () => import('@/components/custom/MainPageTopBar'),
    UserVotingStage: () => import('@/components/custom/UserVotingStage/UserVotingStage'),
  },

  data () {
    return {
      userId: this.$store.state.user.userId,
      // UserVotingStage: Cookie.get('dpc_token') || false
    }
  },

  computed: {
    ...mapGetters([ 'isAuthorized' ]),
  },
}
</script>

<style lang="scss" scoped>
@media (max-width: 767px) {
  .challenge-lists {
    grid-template-columns: 1fr;
  }  
}

@media (min-width: 768px) {
  .challenge-lists {
    grid-template-columns: 1fr 1fr;

    max-width: 1300px;
  }
}

.top-bar {
  padding-bottom: 20px;
}

.challenge-lists {
  margin: 50px auto;

  display: grid;
  grid-column-gap: 75px;
}
</style>