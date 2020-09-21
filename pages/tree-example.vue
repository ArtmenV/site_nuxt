<template>
  <div 
    class="thread-page" 
  >
    <el-tree
      :data="data"
      :props="defaultProps"
      show-checkbox
      @check-change="handleCheckChange">
    </el-tree>
    asdasd
  </div>
</template>

<script>
import { Tree } from 'element-ui'
Vue.use
import 'element-ui/lib/theme-chalk/index.css';
export default {
  data() {
    return {
      data: [{
        id: 1,
        label: 'Level one 1',
        children: [{
          id: 3,
          label: 'Level two 2-1',
          children: [{
            id: 4,
            label: 'Level three 3-1-1'
          }, {
            id: 5,
            label: 'Level three 3-1-2',
            disabled: true
          }]
        }, {
          id: 2,
          label: 'Level two 2-2',
          disabled: true,
          children: [{
            id: 6,
            label: 'Level three 3-2-1'
          }, {
            id: 7,
            label: 'Level three 3-2-2',
            disabled: true
          }]
        }]
      }],
      defaultProps: {
          children: 'children',
          label: 'label',
          disabled: 'disabled',
      },
    };
  },

  methods: {
    handleCheckChange (data) {
      console.log('data', data)
    }
  }
}
</script>

<style lang="scss">

</style>
