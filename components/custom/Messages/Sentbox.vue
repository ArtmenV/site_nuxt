<template>
  <div>
    <MessageTable direction="To">
      <div>
        <MessageItem 
          date="12 Jan, 2019"
          address="ResettingSSSsss"
          replies="2"
          direction="To"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
        />
        <MessageItem 
          date="10 Oct, 2015"
          address="trump@gmaiil.com"
          replies="5"
          direction="To"
          message="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea "
        />
        <MessageItem 
          date="25 Jan, 2017"
          address="keklol@yandex.ru"
          replies="10"
          direction="To"
          message="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui"
        />
      </div>
    </MessageTable>
  </div>
</template>

<script>
import MessageItem from '~/components/custom/Messages/MessageItem.vue'
import MessageTable from '~/components/custom/Messages/MessageTable.vue'
import Vue from 'vue'
import { Checkbox } from 'element-ui'

Vue.use(Checkbox)


export default {
  components: {
    MessageItem,
    MessageTable
  },

  data () {
    return {
      
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
input[name=checkall]{
  vertical-align: middle;
}
.align-centre{
  text-align: center;
}
.ellipsis{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  .inbox-table{
    max-width: 700px;
  }
  .inbox-table-headers{
    display: flex;
  }
}

@media (min-width: 992px) {
  .inbox-table{
    max-width: 900px;
  }
}
</style>

