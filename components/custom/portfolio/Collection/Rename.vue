<template>
  <div 
    class="collection__add"
  >
    <div 
      style="display: flex; 
        flex-direction: column; 
        margin-top: 1rem"
    >
      <div 
        style="display: flex; justify-content: flex-start; align-items: center"
        class="collection__rename_item"
      >
        <div class="collection__rename_container">
          <strong 
            style="margin-right: 1rem"
            class="rename__select"
          >
            Folder:
          </strong>
          <el-select 
            v-model="valueRenameFolder" 
            placeholder="List folders"
            size="small"
            class="select__item"
          >
            <el-option
              v-for="(item, index) in allFolder"
              :key="index"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </div>
        <div style="display: flex; 
          justify-content: flex-end; 
          align-items: center"
        >
          <strong style="margin-right: 1rem; margin-left: 1rem">New name:</strong>
          <fg-input
            class="input--short"
            v-model="renameFolder"
            placeholder="Collection"
          />
        </div>
        <el-button 
          size="small"
          @click="renameFolderFunc"
          style="margin-left: 1rem"
        >
          Rename Folder
        </el-button>
      </div>
        <div>
          <div 
            class="rename__image_container" 
            style="display: flex; justify-content: flex-start; align-items: center"
          >
          <div>
            <strong style="margin-right: 1rem">Image:</strong>
            <el-select 
              v-model="valueRenameImage"
              @change="handleSelectImage" 
              placeholder="List folders"
              size="small"
            >
              <el-option
                v-for="(item, index) in allImage"
                :key="index"
                :label="item.title"
                :value="item.id"
              />
            </el-select>
          </div> 
          <div style="display: flex; justify-content: flex-start; align-items: center">
            <strong style="margin-right: 1rem; margin-left: 1rem">New name:</strong>
            <fg-input
              v-model="valueForChangeImage"
              class="input--short"
              placeholder="Collection"
            />
          </div>
          <el-button 
            @click="renameImageFunc"
            size="small"
            class="rename__image_button"
            style="margin-left: 1rem"
          >
            Rename Image
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Option } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import { FormGroupInput as FgInput } from '~/components'
export default {

  components: {
    FgInput,
  },

  props: [
    'dataCollectionFolder', 
    'allFolderImage',
    'allImage',
    'allFolder',
    'isPath',
  ],

  data () {
    return {
      isLoading: false,
      id: this.$store.state.user.userId,
      path: '',
      renameFolder: '',
      valueRenameFolder: '',
      valueRenameImage: '',
      valueForChangeImage: '',
      renameImage: '',
      windowWidth: 0,
    }
  },

  methods: {
    renameFolderFunc () {
      const body = {
        path: this.$route.query.path + `/${this.valueRenameFolder}`,
        new_path: this.$route.query.path + '/' + this.renameFolder,
      }
      this.$api.updatePortfolioFolder(body)
        .then(({ data: { result } }) => {
          this.$emit('UpdateDatas', this.$route.query.path)
          this.renameFolder = ""
          this.valueRenameFolder = ""
          })
          .catch(e => {
            throw e
          })
          .finally(_ => {
            this.loadingPhoto = false
          })
      },

    renameImageFunc () {
      const path = this.dataCollectionFolder === '' ? this.path = '' : this.path = this.dataCollectionFolder.path
        const body = {
          id: this.valueRenameImage,
          title: this.valueForChangeImage,
        }
        this.$api.renameImage(body)
          .then(({ data: { result } }) => {
            this.$emit('UpdateDatas', path)
            this.valueForChangeImage = ""
            this.valueRenameImage = ''
          })
          .catch(e => {
            throw e
          })
          .finally(_ => {
            this.loadingPhoto = false
          })
    },

    handleSelectImage (id) {
      const obj = this.allImage.find(item => {
        return item.id === id
        })
      this.valueForChangeImage = obj.title
    },
  },

  watch: {
    valueRenameFolder (val) {
      if (this.valueRename !== '') {
        this.renameFolder = val
      }
    },
  },
}
</script>
  
<style lang="scss" scoped>
.collection__add {
  margin-left: 1.5rem;
}
//mobile
@media (max-width: 420px) {
  .collection__add {
    margin-left: 0;
    display: flex;
    flex-direction: column;
    max-width: 340px;

    .rename__image_container {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end !important;
      margin-right: 0 !important;
    }

    .collection__rename_item {
      max-width: 320px;
      display: flex;
      align-items: flex-end !important;
      flex-direction: column;

      .collection__rename_container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 0 !important;

        .rename__select {
          margin-right: 1rem !important;
        }

        .select__item {
          margin-right: 0 !important;
        }

        .form-group .input--short {
          margin-right: 0px !important;
        }
      }
    }
  }
}
</style>