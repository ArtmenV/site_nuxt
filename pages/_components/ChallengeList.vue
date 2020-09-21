<template>
  <div class="challenge-list" v-loading="loading">
    <!-- <div class="header silent-link"  @click="$router.push('/challenges')"
    >
    {{ title }}
    </div> -->
    <nuxt-link
      class="header link link--bold silent-link"
      to="/challenges"
    >
      {{ title }}
    </nuxt-link>

    <div class="list" :class="{'list--short': list.length >= 2 && screenType !== 'desktop'}">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="item__icon">
          <i class="el-icon-user"></i>
        </div>

        <div class="item__title">
          <div class="name text--bold">{{ item.title }}</div>
        </div>

        <div class="item__description">{{ item.description }}</div>

        <div class="item__info">
          <div class="time-left text--bold">
            {{
            type === 'open-for-submission' ?
            timeLeft(item.submission_end_date) :
            timeLeft(item.vote_end_date)
            }}
          </div>

          <div
            v-if="item.entries_count"
            class="received"
          >{{ item.entries_count }} {{ item.entries_count === 1 ? 'entry' : 'entries' }} received</div>

          <div v-else class="received">No entries received</div>

          <nuxt-link
            class="link link--bold"
            :to="type === 'open-for-submission' ? '/challenge-submission?id=' + item.id : '/voting-entries?id=' + item.id"
          >{{ type === 'open-for-submission' ? 'Enter this challenge' : 'Begin voting' }}</nuxt-link>
        </div>
      </div>

      <div class="text--muted" v-if="!list.length">There are no opened challenges yet.</div>
    </div>

    <div
      class="view-more"
      :class="{'hidden': screenType === 'desktop', 'view-less': showAllItems }"
      v-if="list.length >= 2"
      @click="handleViewMoreClick"
    >
      <i class="el-icon-arrow-down" />
      <h6>{{ showAllItems ? 'View less' : 'View more' }}</h6>
    </div>
  </div>
</template>

<script>
import { timeLeft } from "~/utils/datePrettier.js";

export default {
  props: ["type"],

  data() {
    return {
      loading: false,

      title: "",

      list: [],

      showAllItems: false,

      windowWidth: 0
    };
  },

  mounted() {
    this.updateList();

    this.$nextTick(_ => {
      this.windowWidth = window.innerWidth;
      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth;
      });
    });
  },

  watch: {
    screenType(val) {
      if (val === "desktop") {
        this.showAllItems = true;
      }
    }
  },

  computed: {
    screenType() {
      const vw = this.windowWidth;

      if (vw < 1300 && vw > 768) {
        return "tablet";
      } else if (vw < 768) {
        return "mobile";
      } else {
        return "desktop";
      }
    },

    getSort() {
      console.log("list", this.list);
    }
  },

  methods: {
    updateList() {
      this.loading = true;

      switch (this.type) {
        case "open-for-submission":
          this.title = "Challenges Open for Submission";
          break;
        case "needing-your-votes":
          this.title = "Challenges Needing Your Votes";
          break;
      }

      const apiMethod =
        this.type === "open-for-submission"
          ? this.$api.getOpenForSubmissionChallengesResult
          : this.$api.getOpenForVotingChallengesResult;

      apiMethod()
        .then(({ data: { result } }) => {
          result.items.forEach(el => {
            this.list.push(el);
          });
        })
        .finally(_ => {
          this.loading = false;
          this.sortData();
        });
    },

    sortData() {
      switch (this.type) {
        case "open-for-submission":
          this.list.sort((a, b) => {
            const dateA = new Date(a.submission_end_date),
              dateB = new Date(b.submission_end_date);
            return dateA - dateB;
          });
          break;

        case "needing-your-votes":
          this.list.sort((a, b) => {
            const dateA = new Date(a.vote_end_date),
              dateB = new Date(b.vote_end_date);
            return dateA - dateB;
          });
          break;
      }
    },

    handleViewMoreClick() {
      this.showAllItems = !this.showAllItems;
    },

    timeLeft: timeLeft
  }
};
</script>

<style lang="scss" scoped>
.challenge-list {
  .header {
    font-size: 18px;
    font-weight: bold;
    color: #2C2C2C;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .list {
    margin: 10px 5px;

    display: grid;
    grid-row-gap: 30px;

    .item {
      // margin-top: 20px;

      display: grid;
      grid-template-columns: 24px 1fr;
      grid-column-gap: 10px;
      grid-row-gap: 5px;

      &__icon {
        grid-row: 1 / 4;

        display: flex;
        align-items: flex-start;
        justify-content: center;

        margin-top: 3px;

        font-size: 24px;
      }

      &__title {
        display: flex;

        .name {
          margin-right: 10px;
        }
      }

      &__info {
        display: flex;

        .received {
          margin: 0 10px;
          padding: 0 10px;
        }
      }
    }
  }
}

@media (max-width: 1080px) {
  .item__info {
    // flex-direction: column;
    flex-wrap: wrap;

    .received {
      margin: 0 !important;
    }
  }
}

.view-more {
  display: flex;
  padding-bottom: 10px;
  padding-top: 5px;
  margin-bottom: 10px;
  // align-items: center;
  justify-content: center;
  user-select: none;

  &:hover {
    cursor: pointer;
  }

  &.right {
    justify-content: flex-end;
    margin-right: 5px;
  }

  &.view-less {
    i {
      transform: rotate(180deg);
    }
  }

  i {
    margin-right: 5px;
    margin-top: 1px;
    height: 14px;

    transition: all 0.2s ease-in;
  }

  &.hidden {
    display: none;
  }
}
</style>