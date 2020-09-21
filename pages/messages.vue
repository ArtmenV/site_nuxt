<template>
  <section class="messages-page">
    <h3>Private messaging</h3>
    <div class="messages-nav">
      <el-tabs v-model="activeName">
        <el-tab-pane label="Inbox" name="inbox">
          <MessageTable
            direction="From"
          >
            <template slot-scope="props">
              <MessageItem 
                v-for="message in inbox"
                :key="message.id"
                direction="For"
                :selected="props.selected"
                :unreadMessage="message.is_read"
                :date="message.last_post.created_at"
                :address="message.last_post.created_by_username"
                :text="message.last_post.text"
                :replies="message.post_count"
                :id="message.thread_id"
              />
            </template>
          </MessageTable>
        </el-tab-pane>
        <el-tab-pane label="Sentbox" name="sentbox">
          <MessageTable
            direction="To"
            type="sent"
          >
            <template slot-scope="props">
              <MessageItem
                direction="To"
                type="sent"
                v-for="message in sentbox"
                :key="message.id"
                :selected="props.selected"
                :unreadMessage="message.is_read"
                :date="message.last_post.created_at"
                :address="message.last_post.created_by_username"
                :text="message.last_post.text"
                :replies="message.post_count"
                :id="message.thread_id"
              />
            </template>
          </MessageTable>
        </el-tab-pane>
      </el-tabs>
      <div class="messages-toolbar">
        <el-button-group>
          <el-button
            @click="createMessage"
            type="primary"
            icon="el-icon-edit"
            size="mini"
            title="New message"
          />

          <!-- <el-button
            class="desctop-button"
            @click="delSelectedMessages"
            type="primary"
            icon="el-icon-delete"
            size="mini"
            title="Delete selected"
          /> -->
        </el-button-group>
      </div>
    </div>
    <div class="pagination-block">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="totalPages"
        :current-page="currentPage"
        @current-change="handlePageChange"
        hide-on-single-page
      />
    </div>

    <el-dialog
      :visible.sync="creatingNewMessage"
      title="Compose new message"
      width="300px"
    >
      <new-message />
    </el-dialog>
  </section>
</template>

<script>
import Vue from 'vue'
import MessageTable from '~/components/custom/Messages/MessageTable.vue'
import MessageItem from '~/components/custom/Messages/MessageItem.vue'
import NewMessage from '~/components/custom/Messages/NewMessage'
import { Tabs, TabPane, ButtonGroup, Pagination, Dialog } from 'element-ui'
import { mapActions, mapGetters } from 'vuex'
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(ButtonGroup)
Vue.use(Pagination)
Vue.use(Dialog)
export default {
  components: {
    MessageTable,
    MessageItem,
    NewMessage
  },
  data () {
    return {
      activeName: 'inbox',
      creatingNewMessage: false
    }
  },
  computed: {
    ...mapGetters({
      inbox: 'messaging/inbox',
      sentbox: 'messaging/sentbox',
      inboxPage: 'messaging/inboxPage',
      sentboxPage: 'messaging/sentboxPage',
      inboxPageCount: 'messaging/inboxPageCount',
      sentboxPageCount: 'messaging/sentboxPageCount'
    }),
    currentPage () {
      return this.activeName === 'inbox'
        ? this.inboxPage
        : this.sentboxPage
    },
    totalPages () {
      return this.activeName === 'inbox'
        ? this.inboxPageCount
        : this.sentboxPageCount
    },
  },
  mounted () {
    this.fetchSentbox()
    this.fetchInbox()
    this.checkUnreadMessage()
  },
  methods: {
    ...mapActions({
      fetchSentbox: 'messaging/fetchSentbox',
      fetchInbox: 'messaging/fetchInbox',
      checkUnreadMessage: 'messaging/checkUnreadMessage'
    }),
    delSelectedMessages () {
      // Your code...
    },
    createMessage () {
      this.creatingNewMessage = true
    },
    handlePageChange (page) {
      if (this.activeName === 'inbox') {
        this.fetchInbox(page)
      } else {
        this.fetchSentbox(page)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.messages-page{
  width: 100%;
  margin: 0 auto;
  padding-bottom: 30px;
}
.messages-page h3{
  text-align: center;
}
.messages-nav{
  position: relative;
}
.messages-toolbar{
  position: absolute;
  right: 0;
  top: 0;
}
.desctop-button{
  display: none;
}
.pagination-block{
  margin-top: 15px;
  display: flex;
  justify-content: center;
}

@media (min-width: 768px) {
  .messages-page{
    max-width: 700px;
  }
  .desctop-button{
    display: block;
  }
}

@media (min-width: 992px) {
  .messages-page{
    max-width: 900px;
  }
}
</style>