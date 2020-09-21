<template>
  <div class="inbox-table">
    <div class="inbox-table-headers">
      <!-- <div class="header flex-basis-5">
        <el-checkbox 
          v-model="checkedAll"
          @change="checkAll" 
          class="no-margin"  
        />
      </div> -->
      <div class="header flex-basis-25">{{ direction }}</div>
      <div class="header flex-basis-35">Message</div>
      <div class="header flex-basis-15 align-centre">Replies</div>
      <div class="header flex-basis-20 align-centre">Date</div>
    </div>
    <div class="inbox-table-body">
      <slot :selected="selected"></slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Checkbox } from 'element-ui'

Vue.use(Checkbox)

export default {
  props: {
    direction: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'inbox'
    }
  },

  data () {
    return {
      checkedAll: false,
      selected: [],
    }
  },

  methods: {
    checkAll () {
      if (this.type === 'sent') {
        this.$store.commit('messaging/selectSentMessages', this.checkedAll)
      } else {
        this.$store.commit('messaging/selectInboxMessages', this.checkedAll)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.inbox-table{
  width: 100%;
}
.inbox-table-headers{
  display: none;
  font-weight: bold;
}
.header{
  padding: 10px 15px;
}
.align-centre{
  text-align: center;
}
.no-margin{
  margin-bottom: 0;
}
.flex-basis-5{
  flex-basis: 5%;
}
.flex-basis-10{
  flex-basis: 10%;
}
.flex-basis-15{
  flex-basis: 15%;
}
.flex-basis-20{
  flex-basis: 20%;
}
.flex-basis-25{
  flex-basis: 25%;
}
.flex-basis-30{
  flex-basis: 30%;
}
.flex-basis-35{
  flex-basis: 35%;
}

// Media qiures
@media (min-width: 768px) {

  .inbox-table-headers{
    display: flex;
  }
}

</style>
