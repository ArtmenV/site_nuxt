<template>
  <div class="cameras-column">
    <div class="cameras--title">
      <h3 class="title--head">
        {{ currentCamera.vendor_name }}: {{ currentCamera.model }}
      </h3>
    </div> 

    <div 
      class="item"
    >
      <div class="item__picture">
        <img src="https://media.4rgos.it/i/Argos/8065779_R_Z001A?w=750&h=440&qlt=70">
      </div>
      <div class="item__name">

      <h5 class="cameras__info--card">
        <strong>Camera Information</strong>
      </h5>

       <div class="item--row">
          <span class="cameras__info--card__model">
            Model:
          </span> {{ currentCamera.model }}
        </div>
        <div class="item--row">
          <span class="cameras__info--card__model">
            Megapixels:
          </span>  {{ currentCamera.mega_pixels }}
        </div>
        <div class="item--row">
          <span class="cameras__info--card__model">
            Owners:
          </span> {{ currentCamera.owners_count }}
        </div>
        <div class="item--row">
          <span class="cameras__info--card__model">
            Viewed:
          </span> {{ currentCamera.views }}
        </div>
      </div>
    </div>
    <div class="cameras--title__browse">
      <h3 class="title--head">
        Highest Rated Photographs (Browse)
      </h3>
    </div>
      <div class="rated__photo">
        <div
          v-for="item in dataPhoto"
          :key="item.id"
          class="rated__photo--item"
        >
          <img :src="'https://demo-dpchallengeapi.zimalab.com/' + item.thumbnail" alt="photo">
          <div class="rated__photo__description"> 
            <nuxt-link
              class="row-item silent-link highlighted text--bold"
              :to="'/profile?id=' + item.owner.id"
            > 
              {{item.owner.username}}
            </nuxt-link>
            <div class="row-item link item--desktop">
              {{ item.title || 'challene not open' }}
            </div>
            <div class="row-item item--desktop">
            {{ item.avg_score || 0 }}
          </div>
        </div>
      </div> 
    </div> 
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css';
import { FormGroupInput as FgInput } from '~/components'
import { Table } from 'element-ui'
export default {

  data () {
    return {
        id: Number(this.$route.query.id),
        idCam: Number(this.$route.query.idCam),
        cameras: [],
        camera: null,
        dataPhoto: [],
        dataPhoto1: [],
        dataPhoto2: [],
      }
    },
  
  methods: {
    getDataEquipmentsCam () {
      this.$api.getDataEquipment(this.id, 'camera')
      .then(({ data : { result }}) => {
        this.cameras = result.items
      }) 
    },

    getCurrentEquipmentCard () {
      this.$api.getCurEquipmentForCard(this.idCam)
      .then(({ data : { result }}) => {
        this.dataPhoto = result.photos.items
        this.dataPhoto1 = result.photos.items
        this.dataPhoto2 = result.photos.items
        this.dataPhoto = 
        [
        ...this.dataPhoto1, 
        ...this.dataPhoto2,
        ...this.dataPhoto1, 
        ...this.dataPhoto2,
        ...this.dataPhoto1, 
        ...this.dataPhoto2
        ]
      }) 
    },
  },

  computed: {
    currentCamera () {
      if (this.cameras.length) {
        const res = this.cameras.find(item => {
        return item.id == this.idCam
      })
        return res
      } else return {}
    }
  },

  created () {
    this.getDataEquipmentsCam(),
    this.getCurrentEquipmentCard()
  },

  watch: {
    id: {
      handler: function(val) {
        if ( val !== this.$route.query.id ) {
          this.id = this.$route.query.id;
        }
      },
      deep: true
    },

    idCam: {
      handler: function(val) {
        if (val !== this.$route.query.idCam ) {
          this.idCam = this.$route.query.idCam;
        }
      },
      deep: true
    },
  },
}
</script>


<style lang="scss" scoped>
.cameras-container {
  display: flex;
  justify-content: center;
  max-width: 960px;

  .cameras-column {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }

  .cameras--title {
    width: 100%;
    text-align: center; 
    padding: 0;

    .title {
      color: #000;
      padding-top: 0;
      padding-left: 15px;
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 5px;
      padding-top: 0;
    }
  }

.cameras__info--card {
  margin-left: 15px;
  font-size: 21px;
  margin-left: 1.5rem;
  margin-bottom: .6rem;
}

.cameras__info--card__model {
  margin-right: 8px;
  margin-left: 0.8rem;
}

  .list {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    .list--items {
      display: flex;

      .input--short {
        margin: 0 15px 0 0;
      } 
    }
  }
}

.rated__photo {
  display: flex;
  margin-top: 2rem;
  flex-direction: wrap;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .rated__photo--item {
    display: flex;
    flex-direction: column;
    margin-right: 4rem;
    justify-content: center;
    align-items: center;
    
    .rated__photo__description {
      margin-top: 8px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      line-height: 1rem;
      margin-bottom: 2rem;
    }

    img {
      width: auto;
      height: 140px;
      box-shadow: 0px 0px 7px 7px rgb(236, 236, 236);
      margin-bottom: .1rem;
    }
  }
}

.cameras--title__browse {
  .title--head {
    display: flex;
    justify-content: center;
    margin-left: -5.5rem;
  }
}

.header__table {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 30px;
}

.cameras--title__browse {
  width: 1200px;
  padding: 0;
  margin-top: 2.5rem;

  .title--footer {
    margin: 5px 0 5px 15px;
    font-weight: normal;
    color: #000;
    padding-bottom: 8px;
    border-bottom: 4px solid #DDDDDD
  }
}

.item {
    display: flex;
    justify-content: center;
    margin-top: 3rem;

  .item__picture {
    width: 320px;
    height: auto;
    overflow: hidden;
    box-shadow: 0px 0px 7px 7px rgb(236, 236, 236);
  }

  .item__name {
    color: black;
    width: 340px;
    height: 35px;

    .item--row {
      margin-left: 10px;
      padding: 3px;
      color: #000;
      font-size: 16px;
    }
  }
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  border-bottom: 1px solid #ddd;
  min-height: 50px;
  
  &.row--header {
    background: #63748F;
    color: white;
    font-weight: bold;
    border-bottom: none;
  }
  .row-item {
    padding-left: 10px;
    display: flex;
    align-items: center;
    line-height: 1.9rem;
  }
}

.row-item {
  margin-top: 5px;
}

@media (min-width: 1200px) {
  .list__item {
    margin-right: 30px;
  }
}

@media (max-width: 960px) {
  .cameras--title__browse {
    width: 100%;
    margin-top: 2rem;
  }
  .item {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    margin-top: .5rem;

    .item--row {
      color: #000;
      font-size: 11px;
    }
  }

  .item--row {
    color: #000;
    font-size: 10px;
  }

  .cameras--title {
    width: 100%;
    text-align: center; 
    margin-bottom: 2.5rem;
    padding: 0;
  }
}

.cameras__list {
  display: flex;
  flex-direction: column;
}

.lists--column {
  width: 1200px;
  .column {
    column-count: 4
  }
}

.title--head {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-top: 25px;
}

.title--head--card {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  margin-left: 1.5rem;
}

.info--card--text {
  font-weight: normal;
}
</style>
