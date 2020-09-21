<template>
  <div
    @click="myClick"
    class="table-row"
    :class="{ unredMessage: !unreadMessage}"
  >
    <!-- <div
      @click.stop="checkboxPrevent"
      class="table-cell table-checkbox flex-basis-5 align-centre"
    >
      <el-checkbox 
        class="no-margin" 
        name="check-message"  
        v-model="checked"
        @change="checkMessage"
        :value="id" 
      />
    </div> -->
    <div 
      class="table-cell flex-basis-25"
    >
      <span class="mobile-column-name"><b>{{ direction }}:</b></span>
      <span 
        class="address"
      >
        {{ address }}
      </span>
    </div>
    <div 
      class="table-cell table-message flex-basis-35 ellipsis"
    >
      <span class="mobile-column-name"><b>Message:</b></span>
      <span v-html="text" />
    </div>
    <div 
      class="table-cell table-replies flex-basis-15 align-centre"
    >
      <span class="mobile-column-name"><b>Replies:</b></span>
      {{ replies }}
    </div>
    <div 
      class="table-cell table-date flex-basis-20 align-centre"
    >
      {{ prettyDate(date) }}
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import { Checkbox, Button } from 'element-ui'
import { ISOToReadableString } from '~/helpers'
Vue.use(Checkbox)
Vue.use(Button)
export default {
  props: {
    date: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    replies: {
      type: Number,
      required: true
    },
    direction: {
      type: String,
      required: true
    },
    id: {
      type: [String, Number],
      required: true
    },
    selected: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'inbox'
    },
    unreadMessage: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      checked: this.selected,
    }
  },
  computed: {
    allInboxMessagesSelected () {
      return this.$store.state.messaging.allInboxMessagesSelected
    },
    allSentMessagesSelected () {
      return this.$store.state.messaging.allSentMessagesSelected
    },
  },
  watch: {
    allInboxMessagesSelected (val) {
      if (this.type === 'inbox') {
        this.checked = val
      }
    },
    allSentMessagesSelected (val) {
      if (this.type === 'sent') {
        this.checked = val
      }
    }
  },
  methods: {
    myClick () {
      this.$router.push('/messaging?thread_id=' + this.id)
    },
    checkboxPrevent () {},
    deleteMessage () {
      // Your code...
    },
    checkMessage () {
    },
    prettyDate: date => ISOToReadableString(date, {year: true, shortMonth: true})
  },
}
</script>

<style lang="scss" scoped>
.table-row{
  display: flex;
  position: relative;
  padding: 15px 20px;
  flex-direction: column;
  background: #fff;
  margin-bottom: 15px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  box-shadow: 0 5px 5px -5px;
  cursor: pointer;
  transition: 0.3s;
}
.table-row:hover{
  background: #f1f1f1;
}
.table-cell.align-centre{
  text-align: left;
}
.table-checkbox{
  display: none;
  position: relative;
}
.table-checkbox input{
  vertical-align: middle;
}
.mobile-column-name{
  margin-right: 3px;
}
.table-date{
  position: absolute;
  right: 15px;
  color: rgb(135, 141, 150);
}
.table-date, .table-replies{
  font-size: 13px;
}
.table-message{
  width: 80%;
  margin-top: 5px;
}
.table-replies{
  order: -1;
}
.address{
  color: #63748f;
}
.align-centre{
  text-align: center;
}
.ellipsis{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

.unredMessage {
  background-color: rgb(221, 221, 221);
}

// Media qiures
@media (min-width: 768px) {
  .table-row{
    flex-direction: row;
    padding: 0;
  }
  .table-cell{
    padding: 15px;
  }
  .mobile-column-name{
    display: none;
  }
  .table-checkbox{
    display: block;
  }
  .table-cell.align-centre{
    text-align: center;
  }
  .table-date{
    position: static;
    color: #000;
  }
  .table-replies{
    order: 0;
  }
  .table-date, .table-replies{
    font-size: 14px;
  }
  .table-message{
    width: 100%;
    margin-top: 0;
  }
  .button-delete-message{
    display: none;
  }
}

</style>