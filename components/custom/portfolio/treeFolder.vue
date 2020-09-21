<template>
  <div>
    <no-ssr>
      <el-tree
        class="filter-tree link"
        node-key="id"
        default-expand-all
        show-checkbox
        ref="setRef"
        :filter-node-method="filterNode"
        
        :current-node-key="currentFolder"
        :default-checked-keys="[folder]"
        :highlight-current="true"

        :data="options"
        @node-click="handleNodeClick" 
      >
      </el-tree>
    </no-ssr>
  </div>
</template>

<script>
  export default {
    props: {
      folderCollection: {
        type: Number,
        required: false
      },
      folderName: {
        type: String,
        required: false
      },
      submission: {
        type: Object,
        required: false
      }
    },
    watch: {
      filterNode(val) {
        console.log('val', val)
        this.$refs.tree.filter(val);
      },
      options(val) {
        console.log('val')
         this.getCurrent()
      },
      folderCollection(val) {
        this.currentFolder = val
        this.folder = val
        this.getCurrent()
      },
      folderName(val) {
        this.currentNameFolder = val
        this.getCurrent()
      },
      currentNameFolder(val) {
        this.currentNameFolder = val
        this.getCurrent()
      },
    },
    data() {
      return {
        userId: this.$store.state.user.userId,
        currentFolder: 0,
        folder: 1,
        isLoading: false,
        filterText: '',
        options: [],
        checked: [67],

        currentNameFolder: '',

        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      change (data) {
          console.log('dad', )
      },
      filterNode(value, data) {
        console.log('val1', value)
        console.log('val2', data)
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
        getCurrent () {
          console.log()
          setTimeout(() => {
            const result = [...document.querySelectorAll(".is-checked + span")]
            .filter(el => el.innerText === (this.currentNameFolder || this.folderName || 'Portfolio'))
            .map(el => el.classList.add('is-active'));
            return result
        }, 50)
      },

      getTreeFolder () {
        this.isLoading = true

        const data = {
          user_id: this.$route.query.user_id || this.userId
        }

        this.$api.getUserTreeFolder(data)
          .then(({ data: { result } }) => {

            this.options = [{...result.tree}]
            this.isLoading = false
          })
          .catch(err => {
            console.log('err', err)
            this.isLoading = false
          })
          .finally(_ => {
            this.isLoading = false
          })
      },

      handleNodeClick (node) {
        this.checked.push(node.id)
        if (this.$route.path === "/portfolio/user") {
          if (node.path) {
            this.$router.push(`/portfolio/user?user_id=${this.$route.query.user_id}&path=` + encodeURIComponent(node.path))
          } else {
            this.$router.push(`/portfolio/user?user_id=${this.$route.query.user_id}&path=portfolio`)
          }
        } else {
          if (node.path) {
            this.$router.push('/portfolio/path?path=' + encodeURIComponent(node.path))
          } else {
            this.$router.push('/portfolio')
          }
        }
      } 
    },
    mounted() {
      if (this.folderCollection) {
        this.folder = this.folderCollection
      }
      if (this.$route.path === '/portfolio') {
        this.currentNameFolder = 'Portfolio'
      }
      if (this.$route.fullPath === '/portfolio/user?user_id=70&path=portfolio') {
        this.currentFolder = 0
        this.currentNameFolder = 'Portfolio'
      }
      this.getTreeFolder()
    }
  };
</script>

<style lang="scss">
.el-tree-node__expand-icon {
  color: #334d79
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
  background-color: whitesmoke !important;
}
.filter-tree {
  .el-checkbox {
    display: none !important;
  }
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: whitesmoke !important;
  }
  .el-tree-node__label.is-active{
    font-weight: bold;
    font-size: 15.5px;
  }
  .el-tree-node__content:hover {
    background-color: whitesmoke;
  }
  .el-tree-node__label:hover {
    text-decoration: underline;
  }
}
</style>

<style lang="scss" scoped>
.filter-tree {
  margin-bottom: 2rem;
}
.el-tree {
  background: none
}
.link {
  color: #334d79
}
.link:hover {
  background-color: none;
}
</style>