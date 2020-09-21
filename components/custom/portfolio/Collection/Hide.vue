<template>
  <div 
    class="collection__add_hide"
    v-loading="isLoading"
    style="display: flex; flex-direction: column; margin-top: 1rem"
  >
  <div 
    class="add__hide-item" 
    style="display: flex; margin-bottom: 1rem"
  >
    <div 
      class="portfolio__watermark_select" 
      style="margin-top: .3rem"
    >
    <div>
      <strong style="margin-right: 1rem">Hide folder:</strong>
      <el-select 
        v-model="valueHideCurrentFolder" 
        placeholder="folder"
        size="small"
      >
        <el-option
          v-for="(item, index) in getNotHiddenFolders"
          :key="index"
          :label="item.name"
          :value="item.path"
        />
      </el-select>
      </div>
      <el-button 
        size="small"
        @click="hideFolder"
        style="margin-left: 1rem"
      >
        Hide
      </el-button>
    </div>

    <div 
      class="portfolio__watermark_select" 
      style="margin-top: .3rem; margin-left: 1.2rem"
    >
    <div>
      <strong style="margin-right: 1rem">Show folder:</strong>
        <el-select 
          v-model="valueShowCurrentFolder" 
          placeholder="folder"
          size="small"
        >
          <el-option
            v-for="(item, index) in getHiddenFolders"
            :key="index"
            :label="item.name"
            :value="item.path"
          />
        </el-select>
      </div>
      <el-button 
        size="small"
        @click="showFolder"
        style="margin-left: 1rem"
      >
        Show
      </el-button>
    </div>
  </div>

  <div class="add__hide-item" style="display: flex">
    <div 
      class="portfolio__watermark_select" 
      style="padding-top: .3rem; display: flex"
    >
    <div>
      <strong style="margin-right: 1rem">Hide image:</strong>
        <el-select 
          v-model="valueHideImage" 
          placeholder="Image"
          size="small"
        >
          <el-option
            v-for="(item, index) in getNotHiddenPhoto"
            :key="index"
            :label="item.title"
            :value="item.id"
          />
          
        </el-select>
      </div>
      <el-button 
        size="small"
        @click="hideImage"
        style="margin-left: 1rem"
      >
        Hide
      </el-button>
    </div>

      <div 
        class="portfolio__watermark_select" 
        style="padding-top: .3rem; margin-left: 1rem"
      >
      <div>
        <strong style="margin-right: 1rem">Show image:</strong>
          <el-select 
            v-model="valueShowImage" 
            placeholder="Image"
            size="small"
          >
            <el-option
              v-for="(item, index) in getHiddenPhoto"
              :key="index"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </div>
        <el-button 
          size="small"
          @click="showImage"
          style="margin-left: 1rem"
        >
          Show
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Option } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
export default {


  props: [
    'addCollectionFolder', 
    'allCurrentFolder', 
    'dataCollectionFolder', 
    'allFolderImage',
    'allImage',
    'allFolder',
    'getNotHiddenPhoto',
    'getHiddenFolders',
    'getNotHiddenFolders',
    'getHiddenPhoto',
  ],

  data () {
    return {
      isLoading: false,
      id: this.$store.state.user.userId,
      path: '',
      valueHideCurrentFolder: '',
      valueShowCurrentFolder: '',
      valueHideImage: '',
      valueShowImage: '',

      currentFolder: '',
      moveNewFolder: '',
      delCurrentFolder: '',
      valueDeleteImage: '',

      windowWidth: 0,
    }
  },

  methods: {
    hideFolder () {
      const path = this.dataCollectionFolder === '' ? this.path = '' : this.path = this.dataCollectionFolder.path
      const body = {
        path: this.valueHideCurrentFolder,
        // user_id: 70,
        hide: true
      }

      this.$api.updateHideFolder(body)
      .then(({ data: { result } }) => {
        this.$emit('UpdateDatas', path)
        this.valueHideCurrentFolder = ''
        })
        .catch(e => {
          throw e
        })
        .finally(_ => {
          this.loadingPhoto = false
        })
    },

    showFolder () {
      const path = this.dataCollectionFolder === '' ? this.path = '' : this.path = this.dataCollectionFolder.path
      const body = {
        path: this.valueShowCurrentFolder,
        // user_id: 70,
        hide: false
      }

      this.$api.updateHideFolder(body)
      .then(({ data: { result } }) => {
        this.$emit('UpdateDatas', path)
        this.valueShowCurrentFolder = ''
        })
        .catch(e => {
          throw e
        })
        .finally(_ => {
          this.loadingPhoto = false
        })
    },

    hideImage () {
      const path = this.dataCollectionFolder === '' ? this.path = '' : this.path = this.dataCollectionFolder.path
      const body = {
        photo_ids: [this.valueHideImage],
        // user_id: 70,
        hide: true
      }

      this.$api.hideImage(body)
      .then(({ data: { result } }) => {
        this.$emit('UpdateDatas', path)
        this.valueHideImage = []
        })
        .catch(e => {
          throw e
        })
        .finally(_ => {
          this.loadingPhoto = false
        })
    },


    showImage () {
      const path = this.dataCollectionFolder === '' ? this.path = '' : this.path = this.dataCollectionFolder.path
      const body = {
        photo_ids: [this.valueShowImage],
        // user_id: 70,
        hide: false
      }

      this.$api.hideImage(body)
      .then(({ data: { result } }) => {
        this.$emit('UpdateDatas', path)
        this.valueShowImage = []
        })
        .catch(e => {
          throw e
        })
        .finally(_ => {
          this.loadingPhoto = false
        })
    },

    handleSelectImage (id) {
      debugger
      const obj = this.allImage.find(item => {
        return item.id === id
        })
      this.valueForChangeImage = obj.title
    }
  },
}
</script>


<style lang="scss" scoped>
.collection__add_hide {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.portfolio__watermark_select {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .input--short {
    height: 30px;

    .form-control {
      height: 12px;
    }
  }
}
//mobile
@media (max-width: 420px) {
  .collection__add_hide {
    display: flex;
    justify-content: flex-end !important;
    align-items: flex-end !important;
    width: 320px;

    .add__hide-item {
      display: flex;
      flex-direction: column;

      .portfolio__watermark_select {
        display: flex;
        flex-direction: column;
        justify-content: flex-end !important;
        align-items: flex-end;
        margin-left: 0 !important; 
        margin-top: .1rem !important; 
        padding-top: 0;
      }
    }
  }
}
</style>