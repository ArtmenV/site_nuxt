<template>
  <div class="latest-forum-activity-container">
    <div class="header">
      Recent Forum Activity
    </div>

    <div class="table" v-if="list">
      <div class="table-row row--header">
        <div class="row-item">Subject</div>
        <div class="row-item item--desktop">Posted by</div>
        <div class="row-item item--desktop">Section</div>
        <div class="row-item item--desktop">Date</div>
      </div>

      <div 
        v-for="item in list.filter(el => !!el.last_post)"
        :key="item.id"
        class="table-row"
      >
        <nuxt-link
          class="row-item silent-link highlighted text--bold"
          :to="'/thread?id=' + item.id"
        >
          {{ item.title }}
        </nuxt-link>

        <nuxt-link
          class="row-item link item--desktop"
          :to="'/profile?id=' + item.last_post.creator_id"
        >
          {{ item.last_post.creator_username }}
        </nuxt-link>

        <nuxt-link
          class="row-item link item--desktop"
          :to="'/threads?section_id=' + item.section.id"
        >
          {{ item.section.title || 'N/A' }}
        </nuxt-link>

        <div class="row-item item--desktop">
          {{ timeAgo(item.last_post.created_at) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { timeAgo } from '~/utils/datePrettier.js'

export default {
  data () {
    return {
      list: [],

      loading: false
    }
  },
  mounted () {
    this.updateList()
  },
  methods: {
    timeAgo,

    updateList () {
      this.loading = true

      this.$api
        .getLatestForumThreads()
        .then(({ data: { result } }) => {
          result.threads.items.forEach(el => {
            this.list.push(el)
          })
        })
        .finally(_ => {
          this.loading = false
        })        
    }    
  }
}
</script>

<style lang="scss" scoped>
.latest-forum-activity-container {
  max-width: 1300px;
  margin: 0 auto;

  margin-bottom: 40px;

  .header {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .table-row {
    display: grid;
    grid-template-columns: 1fr 200px 280px 180px;

    border-bottom: 1px solid #ddd;

    min-height: 50px;

    &.row--header {
      background: #63748F;
      color: white;
      font-weight: bold;

      border-bottom: none;
    }

    .row-item {
      padding-left: 10px;

      display: flex;
      align-items: center;
    }
  }

  .table-row:last-child {
    border-bottom: none;
  }
}

@media (max-width: 900px) {
  .table {
    .table-row {
      grid-template-columns: 1fr;
    }

    .item--desktop {
      display: none !important;
    }
  }
}
</style>