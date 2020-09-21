<template>
  <div 
    class="collection__move"
  >
    <div 
      class="portfolio__watermark_select" 
      style="margin-top: .3rem"
    >
      <div class="container--folder">
        <strong style="margin-right: 1rem">Folders:</strong>
        <div
          class="select--move" 
        >
          <treeselect  
            :options="allFolders" 
            @select="getCurrentFolder"
          />
        </div>
      </div>
      <div class="move--folder">
        <strong style="margin-right: 1rem">Move to:</strong>
        <div
          class="select--move" 
        >
          <treeselect 
            :options="options" 
            @select="newPathFolder"
          />
        </div>
      </div>
      <el-button 
        class="move-button"
        size="small"
        @click="moveFolder"
        style="margin-left: 1rem"
      >
        Move Folder
      </el-button>
    </div>
    <div 
      class="portfolio__watermark_select" 
      style="padding-top: .3rem"
    >
      <div class="container--folder">
        <strong 
          class="select-title"
          style="margin-right: 1rem"
        >
          Images:
        </strong>
        <div
          class="select--move" 
        >
          <treeselect 
            :options="allImages" 
            @select="getCurrentImage"
          />
        </div>
      </div>
      <div class="move--folder">
        <strong style="margin-right: 1rem">Move to:</strong>
        <div
          class="select--move" 
        >
          <treeselect 
            :options="options" 
            @select="newPathFolder"
          />
        </div>
      </div>
      <el-button
        class="move-button"
        size="small"
        @click="moveImage"
        style="margin-left: 1rem"
      >
        Move Image
      </el-button>
    </div>
  </div>
</template>

<script>
import { Option } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {

  components: {
    Treeselect 
  },

  props: [
    'dataCollectionFolder', 
    'allImage',
    'allFolder',
    'isPath',
    ],

  data () {
    return {
      isLoading: false,
      id: this.$store.state.user.userId,
      path: '',
      valueForMoveImage: '',
      valueForMoveImageFolder: "",
      moveNewFolder: '',
      windowWidth: 0,
      currentFolder: null,

      newFolderPath_: '',
      options: null
    }
  },

  methods: {
    moveFolder () {
      const path = this.dataCollectionFolder === '' ? this.path = '' : this.path = this.dataCollectionFolder.path
      const newPath = this.newFolderPath_ !== '' ? this.newFolderPath_ : ""
      const data = {
        destination_path: newPath,
        path: this.currentFolder
      }
      this.$api.updatePathFolder(data)
      .then(({ data }) => {
        this.$emit('UpdateDatas', path)
        this.currentFolder = ''
        this.moveNewFolder = ''
      })
        .catch(e => {
          throw e
      })
        .finally(_ => {
          this.loadingPhoto = false
      })
    },

    moveImage () {
      const path = this.dataCollectionFolder === '' ? this.path = '' : this.path = this.dataCollectionFolder.path
      const newPath = !this.newFolderPath_ ? "" : this.newFolderPath_ 
      // if (newPath) {}
      const data = {
        photo_id: this.valueForMoveImage,
        path: newPath
      }
      this.$api.updatePathImage(data)
      .then(({ data }) => {
        this.$emit('UpdateDatas', path)
        this.valueForMoveImage = ''
        this.valueForMoveImageFolder = ''
      })
        .catch(e => {
          this.loadingPhotoStatus.type = 'error'
          this.loadingPhotoStatus.message = 'Error'
      })
        .finally(_ => {
          this.loadingPhoto = false
      })
    },

    getTreeFolder () {

        const data = {
          user_id: this.id
        }

        this.$api.getUserTreeFolder(data)
          .then(({ data: { result } }) => {

            this.options = [{...result.tree}]
            // console.log('result',result)
          })
          .catch(err => {
            console.log('err', err)
          })
      },

    getCurrentFolder (node) {
      // debugger
      this.currentFolder = node.path
    },

    newPathFolder (node) {
      this.newFolderPath_ = node.path
    },

    getCurrentImage (node) {
      this.valueForMoveImage = node.id
    },

    loadOptions (data) {
      console.log('data', data)
    }
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
    },

    allImages () {
      if(this.allImage) {
        return this.allImage.map((item) => {
          return {
            ...item,
            label: item.title
          }     
        })
      }
    }
  },

  mounted() {
    this.getTreeFolder()
  },
}
</script>

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
.container--folder {
  display: flex;
  justify-content: center;
  align-items: center;
}

.select--move {
  max-width: 240px;
  height: 32px
}

.move--folder {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
}

.collection__add_item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.collection__add_delete {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.portfolio__watermark_select {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem .1rem .1rem .1rem;
  margin-bottom: 1rem;

  .input--short {
    height: 30px;

    .form-control {
      height: 12px;
    }
  }
}
//desktop
@media screen and (max-width: 860px) {
  .portfolio__watermark_select {
    display: flex !important;
    align-items: flex-end;

    .container--folder {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      margin-right: 1rem;

      .select-title {
        margin-left: 0;
      }
    }

    .move--folder {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      margin-left: 0;
    }
  }
}
//mobile
@media (max-width: 420px) {
.collection__move {
  .portfolio__watermark_select {
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start ;
    align-items: flex-end;

      .container--folder {
        margin-right: 0;
        margin-bottom: .5rem;
      } 

      .select--move {
        max-width: 100%;
      }
        
      .move-button {
        margin-top: .7rem;
      }
    }
  }
}
</style>