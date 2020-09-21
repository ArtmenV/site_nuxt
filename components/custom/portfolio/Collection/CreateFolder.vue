<template>
  <div 
    class="collection__add_folder"
  >
    <div class="portfolio__watermark_select" >
      <div class="add_folder-item">
      <strong style="margin-right: 1rem">Name:</strong>
        <fg-input
          style="margin-right: 1rem"
          class="input--short"
          v-model="namePath"
          placeholder="Collection"
        /> 
        <el-button 
          size="small"
          @click="createFolder"
        >
          Add collection
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css';
import { FormGroupInput as FgInput } from '~/components'
export default {

  components: {
    FgInput,
  },

  props: [
    'addCollectionFolder', 
    'dataCollectionFolder', 
    'isPath',
    ],

  data () {
    return {
      isLoading: false,
      id: this.$store.state.user.userId,
      namePath: '',
      path: '',
      windowWidth: 0,
    }
  },

  methods: {
    createFolder () {
      const path = this.dataCollectionFolder === '' ? this.path = '' : this.path = this.dataCollectionFolder.path
      const data = {
        path: (this.$route.query.path || "") + `/${this.namePath}`,
        description: this.namePath
      }
        this.$api.createPortfolioFolder(data)
        .then(({ data }) => {
          this.$emit('UpdateDatas', path)
          this.namePath = ''
        })
        .catch(e => {
        })
        .finally(_ => {
          this.loadingPhoto = false
        })
      }
    },
}
</script>
  
<style lang="scss" scoped>
.collection__add_folder {
  display: flex;

  .portfolio__watermark_select {
    display: flex;

    .add_folder-item {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

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

@media (max-width: 420px) {
  .portfolio__options_item {
    .collection__add_container {
      max-width: 370px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
  }

  .collection__add_folder {
    .portfolio__watermark_select {
      display: flex;
    }
  }
}
</style>