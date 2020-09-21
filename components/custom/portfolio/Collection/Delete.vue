<template>
  <div 
    class="collection__add_delete"
    v-loading="isLoading"
    style="width: 470px; display: flex; flex-direction: column"
  >
    <div 
      class="portfolio__watermark_select" 
      style="margin-top: .3rem;"
    >
      <div>
        <strong style="margin-right: 1rem">Delete folder:</strong>
          <el-select 
            v-model="delCurrentFolder" 
            placeholder="Portfolio"
            size="small"
          >
            <el-option
              v-for="(item, index) in allFolder"
              :key="index"
              :label="item.name"
              :value="item.path"
            >
          </el-option>
        </el-select>
      </div>
      <el-button 
        size="small"
        @click="deleteFolder"
        style="margin-left: 1rem"
      >
        Delete Folder
      </el-button>
    </div>
    <div 
      class="portfolio__watermark_select" 
      style="padding-top: .3rem;"
    >
    <div>
      <strong style="margin-right: 1rem">Image:</strong>
        <el-select 
          v-model="valueDeleteImage" 
          placeholder="Image"
          size="small"
        >
          <el-option
            v-for="(item, index) in allImage"
            :key="index"
            :label="item.title"
            :value="item.id"
          >
        </el-option>
      </el-select>
    </div>
      <el-button 
        size="small"
        @click="deletePhoto"
        style="margin-left: 1rem"
      >
        Delete Image
      </el-button>
    </div>
  </div>
</template>

<script>
import { Option } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

export default {

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
      delCurrentFolder: '',
      valueDeleteImage: '',
      windowWidth: 0,
    }
  },

  methods: {
    deletePhoto () {
      const path = this.dataCollectionFolder === '' ? this.path = '' : this.path = this.dataCollectionFolder.path
      this.isLoading = true
      this.$api.deletePhoto({photo_ids: [this.valueDeleteImage]})
      .then(({ data: { result } }) => {
        this.$emit('UpdateDatas', path)
        this.isLoading = false
        this.valueDeleteImage = ''
        })
        .catch(e => {
          throw e
          this.isLoading = false
        })
        .finally(_ => {
          this.isLoading = false
        })
      },

    deleteFolder () {
      const path = this.dataCollectionFolder === '' ? this.path = '' : this.path = this.dataCollectionFolder.path
      this.$confirm('Are you sure you want to delete this file. All files that are inside it will also be lost.. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.isLoading = true
        this.$api.deletePortfolioFolder({ path: this.delCurrentFolder })
        .then(({ data: { result } }) => {
          this.$emit('UpdateDatas', path)
          this.isLoading = false
          this.delCurrentFolder = ''
          })
          .catch(e => {
            this.isLoading = false
            throw e
          })
          .finally(_ => {
            this.isLoading = false
          })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'Delete canceled'
              });          
            });
    },
  },
}
</script>

<style lang="scss">
@media (max-width: 420px) {
  .el-message-box {
    max-width: 290px;
  }
}
</style>
  
<style lang="scss" scoped>
.collection__add_delete {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  .portfolio__watermark_select {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem .1rem .1rem .1rem;

    .input--short {
      height: 30px;

      .form-control {
        height: 12px;
      }
    }
  }
}

//mobile
@media (max-width: 420px) {
  
  .collection__add_delete {
    width: 320px !important;
    display: flex;

    .portfolio__watermark_select {
      display: flex;
      flex-direction: column;
      justify-content: flex-end !important;
      align-items: flex-end;
      width: 340px;
    }
  }
}
</style>