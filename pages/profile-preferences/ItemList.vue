<template>
  <div class="list-container">
    <div class="list">

    <!-- add cameras -->
    <div class="value hole-line nav cameras cameras-tems">
      <h4 class="title--head">
        Cameras
      </h4>

        <div 
          class="list"
        >
          <div 
            class="item"
            v-for="item in userCameras"
            :key="item.id"
          >
            <div class="item__picture">
              <img :src="item.image" >
            </div>

            <div class="item__name silent-link text--bold">
              {{ item.model }}
            </div>

            <div class="item__actions">
              <!-- <el-button 
                plain 
                type="info" 
                size="small"
                disabled
              >
                Default {{ type === 'cam' ? 'camera' : 'lens' }}
              </el-button> -->

              <el-button 
                plain 
                type="danger" 
                icon="el-icon-delete"
                size="small"
                @click="deleteCamera(item.id)"
                v-loading="isLoading"
              >
                Remove
              </el-button>
            </div>
          </div>
        </div>

        <el-button 
          type="primary" 
          icon="el-icon-plus"
          plain
          size="mini"
          class="topbar__add"
          @click="addCamera"
        >
          Add Camera
        </el-button>
        <div class="select-item"
          v-if="addCemeras"
          v-loading="isLoading"
        >
          <el-select 
            v-model="value" 
            placeholder="Select A Manufacturer:"
            class="select--cameras"
          >
            <el-option
              v-for="item in camerasData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              class="select--camera"
            >
            </el-option>
          </el-select>

          <!-- current camera -->
          <el-select 
            v-if="camera"
            v-model="valueCurrentCamera" 
            placeholder="Select A Model:"
            size="small"
            class="select__item-camera"
          >
            <el-option
              v-for="item in camera.items"
              :key="item.id"
              :label="item.model"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>

      <!-- add linses -->
    <div 
      class="value hole-line nav cameras cameras-tems"
    >
      <h4 class="title--head">
        Lenses
      </h4>
        <div class="list">
          <div 
            class="item"
            v-for="item in userLenses"
            :key="item.id"
          >
            <div class="item__picture">
              <img :src="item.image" >
            </div>

            <div class="item__name silent-link text--bold">
              {{ item.vendor_name }}
            </div>

            <div class="item__actions">
              <!-- <el-button 
                plain 
                type="info" 
                size="small"
                disabled
              >
                Default {{ type === 'cam' ? 'camera' : 'lens' }}
              </el-button> -->

              <el-button 
                plain 
                type="danger" 
                icon="el-icon-delete"
                size="small"
                @click="deleteLens(item.id)"
              >
                Remove
              </el-button>
            </div>
          </div>
        </div>
        <el-button 
          type="primary" 
          icon="el-icon-plus"
          plain
          size="mini"
          class="topbar__add"
          @click="addLenses"
        >
          Add Lens
        </el-button>
        <div 
          class="select-item"
          v-if="addLens"
          v-loading="isLoading"
        >
          <el-select 
            v-if="lensesData"
            v-model="valueLenses" 
            placeholder="Lens"
            class="Select A Manufacturer:	"
          >
            <el-option
              v-for="item in lensesData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              class="select--camera"
            >
            </el-option>
          </el-select>

          <!-- current lenses -->
          <el-select 
            v-if="lensa"
            v-model="valueCurrentLenses" 
            placeholder="Select A Model:"
            size="small"
            class="select__item-lens"
          >
            <el-option
              v-for="item in lensa.items"
              :key="item.id"
              :label="item.model"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button, Select, Loading } from 'element-ui'

Vue.use(Button)
Vue.use(Loading)

export default {
  props: [ 
    'type', 
    'userCameras', 
    'userLenses' 
  ],

  data () {
    return {
      addCemeras: false,
      camerasData: null,
      value: null,
      camera: null,
      valueCurrentCamera: null,
      cameras: [],
      deleteCameras: [],
      deleteLenses: [],
      
      addLens: false,
      lensesData: null,
      valueLenses: null,
      lensa: null,
      valueCurrentLenses: null,
      lenses: [],
      isLoading: false,
      lensDateValue: false,
    }
  },
    
  methods: {
    camerasItem () {
      this.$api
        .getAllCameras()
        .then(({ data : { result }}) => {
          this.camerasData = result.items
        })
    },

    getDataEquipmentsCam () {
      this.$api.getDataEquipment(this.value, 'camera')
      .then(({ data : { result }}) => {
        this.camera = result
      })
    },

    addCamera () {
      this.addCemeras = true
    },

    lensesItem () {
      this.$api
        .getAllCameras()
        .then(({ data : { result }}) => {
          this.lensesData = result.items
        })
    },

    getDataEquipmentsLens () {
      this.$api.getDataEquipment(this.valueLenses, 'lens')
      .then(({ data : { result }}) => {
        this.lensa = result
      })      
    },

    addLenses () {
      this.addLens = true
    },

    updateUserCameras () {
      this.isLoading = true
      const data = {
        cameras: this.cameras,
        equipments_to_remove: this.deleteCameras
      }
      this.$api.updateUserInfo(data)
      .then(r => {
        this.deleteCameras = []
        this.cameras = []
        this.value = null
        this.isLoading = false
        this.$emit('updateUser')
        this.addCemeras = false
      })
      .catch(({ response }) => {
      })
      .finally(_ => {
        this.loading = false
      })
    },

    updateUserLenses () {
      this.isLoading = true
      const data = {
        lenses: this.lenses,
        equipments_to_remove: this.deleteLenses
      }
      this.$api.updateUserInfo(data)
      .then(r => {
        this.deleteLenses = []
        this.lenses = []
        this.valueLenses = null
        this.isLoading = false
        this.$emit('updateUser')
        this.addLens = false
      })
      .catch(({ response }) => {
      })
      .finally(_ => {
        this.loading = false
      })
    },

    deleteCamera (data) {
      this.deleteCameras.push(data)
      this.updateUserCameras()
    },

    deleteLens (data) {
      this.deleteLenses.push(data)
      this.updateUserLenses()
    }
  },

  mounted () {
    this.camerasItem()
    this.lensesItem()
  },

  watch: {
    value: {
      handler: function(val) {
        if ( val !== null ) {
          this.getDataEquipmentsCam()
        }
      },
      deep: true
    },

    valueLenses: {
      handler: function(val) {
        if ( val !== null ) {
          this.getDataEquipmentsLens()
        }
      },
      deep: true
    },

    valueCurrentCamera: {
      handler: function(val, oldVal) {
        if ( val !== null & val !== oldVal & val !== undefined ) {
          this.cameras.push(val)
          this.updateUserCameras()
        }
      },
      deep: true
    },

    valueCurrentLenses: {
      handler: function(val, oldVal) {
        if ( val !== null && val !== oldVal && val !== undefined  ) {
          this.lenses.push(val)
          this.updateUserLenses()
        }
      },
      deep: true
    }
  },
}
</script>

<style lang="scss">
.select--cameras {
  width: 220px;
}

.select--camera {
  color: black;
}

.ProseMirror {
  img {
    width: 150px;
    height: auto;
    margin: 5px 5px 5px 0;
  }
}

.el-input__inner {
  color: #000;
}

.el-select .el-input .el-input__inner {
  background-color: #F5F5F5;
  border: 1px solid rgb(218, 217, 217);
  color: #000;
}

.cameras {
  display: flex;
  flex-direction: column;

  .topbar__add {
    margin: 10px 0 8px 3px;
    width: 135px
  }
  .el-input {    
    &__inner {
      height: 37px;
      width: 220px;
      margin: 0;
      padding-left: 10px !important;

      background: transparent !important;
      border: 1px solid #E3E3E3 !important;
      color: #2c2c2c !important;

      &::placeholder {
        color: #2c2c2c !important;
      }

      &:hover {
        box-shadow: none !important;
      }
    }

    .el-input__suffix {
      padding-top: 4px;
    }
    
    .el-select__caret {
      color: #2c2c2c !important;
    }
  }
}

.el-select--small {
  width: 160px;
}

.el-input--small {
  .el-input__inner {
    width: 160px;
    margin-top: 0;
    
  }
}

.el-select--small {
  .el-input__inner {
    color: #000;
    margin-top: 0;
    padding: 50px 0px 0px 0px;
  }
}

</style>

<style lang="scss" scoped>
.list-container {
  .item {
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-column-gap: 10px;
    margin-bottom: 15px;

    &__picture {
      grid-row: 1 / 3;
      border: 1px solid silver;
      height: 70px;  
    }

    &__actions {
      display: flex;
      margin-top: auto;
    }
  }
}

.select-item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  .select__item-lens {
    margin-top: .5rem;
  }

  .select__item-camera {
    margin-top: .5rem;
  }
}

.header {
  margin: 10px 0 0 0;
}

.title--head {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0px;
  margin-top: 25px;
}

</style>