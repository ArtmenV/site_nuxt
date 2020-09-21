<template>
  <div
    class="select--move" 
  >

    <treeselect 
      :multiple="false" 
      :options="allFolders" 
      @select="updateValue"
    />

    <treeselect 
      :multiple="false" 
      :options="options" 
      @select="updateValue"
    />

  </div>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    components: { Treeselect },
    props: {
      allFolder: {
        type: Array,
        required: false
      }
    },
    data() {
      return {
        userId: this.$store.state.user.userId,
        tree: null,

        options: null
      }
    },

    methods: {
      getTreeFolder () {

        const data = {
          user_id: this.userId
        }

        this.$api.getUserTreeFolder(data)
          .then(({ data: { result } }) => {

            this.options = [{...result.tree}]
            
          })
          .catch(err => {
            console.log('err', err)
          })
      },

      updateValue (node) {
        const data = node
        this.$emit('newPath', data)
      },     
    },

    mounted() {
      this.getTreeFolder()
    },

    computed: {
      allFolders () {
        if(this.allFolder) {
          return this.allFolder.map((item) => {
            return {
              ...item,
              label: item.name
            }     
          })
        }
      }
    },

    watch: {
      allFolder(val) {
        console.log('val', val)
      }
    }
  }
</script>

//css for tiptop
<style lang="scss">
.vue-treeselect__control {
  height: 32px;
  background: #F5F5F5;
  color: black;

  .vue-treeselect__placeholder {
    color: black;
    font-size: 0.8571em;
    line-height: 1.35em;
    margin-top: .5rem;
    align-items: center;
  }
}
</style>

<style lang="scss" scoped>
.select--move {
  max-width: 240px;
  height: 32px
}
</style>