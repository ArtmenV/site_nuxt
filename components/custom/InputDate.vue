<template>
  <div class="date-input">
    <div class="date-input__label">
      {{ label }}
    </div>

    <div class="date-input__inputs inputs">
      <fg-input
        class="inputs__day"
        v-model.number="dateObject.day"
        placeholder="Day"
      />

      <el-select
        v-model="dateObject.month"
        class="inputs__month"
      >
        <el-option
          v-for="n in 12"
          :key="n"
          :label="toMonthStr(n - 1)"
          :value="n - 1"
        />
      </el-select>

      <fg-input
        class="inputs__year"
        v-model.number="dateObject.year"
        placeholder="Year"
      />

      <div v-show="error" class="inputs__error">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import { FormGroupInput as FgInput } from '~/components'
import { Select, Option } from 'element-ui'

import { toMonthStr } from '~/helpers'

Vue.use(Select)
Vue.use(Option)

export default {
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: [ String, null ],
      required: false,
    },
  },

  components: {
    FgInput
  },
  
  data () {
    return {
      dateObject: {
        month: '',
        day: '',
        year: ''
      },

      error: ''
    }
  },

  mounted () {
    // const date = new Date(this.value)
    // this.timeImage()

    // this.dateObject.day = date.getDate()
    // this.dateObject.year = date.getFullYear()
    // this.dateObject.month = date.getMonth()
  },

  methods: {
    toMonthStr,

    // getISODate (dateObj) {
    //   try {
    //     const newDate = new Date()
  
    //     newDate.setFullYear(+dateObj.year)
    //     newDate.setMonth(+dateObj.month)
    //     newDate.setDate(+dateObj.day)
  
    //     this.$emit('change', newDate.toISOString())

    //     this.error = ''
    //   } catch (e) {
    //     this.error = 'Please, enter correct date'
    //   }
    // },

    // timeImage () {
    //   const time = new Date(this.value)
    //   this.dateObject.year = time.getFullYear()
    //   this.dateObject.month = time.getMonth()
    //   this.dateObject.day = time.getDate()
    // }
  },

  watch: {
    value (val) {
      const time = new Date(val)
      this.dateObject.year = time.getFullYear()
      this.dateObject.month = time.getMonth()
      this.dateObject.day = time.getDate()
    }
  }
}
</script>

<style lang="scss">
.date-input {
  .el-input {    
    &__inner {
      height: 37px !important;
      margin: 0 !important;
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
</style>

<style lang="scss" scoped>
.date-input {
  &__label {
    font-size: 12px;

    text-transform: uppercase;
  }

  .inputs {
    display: grid;

    grid-template-columns: 80px 1fr 90px;
    grid-column-gap: 10px;

    &__error {
      grid-column: 1 / 4;

      color: #FF3636;
      font-size: 80%;

      transform: translateY(-5px);
    }
  }
}
</style>
