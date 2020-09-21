<template>
  <div class="editable-field">
    <el-select
      :placeholder="gender(value)"
      v-model="newValue"
      v-if="type === 'gender'"
      @change="handleSubmitClick"
      size="small"
    >
      <el-option
        :value="0"
        label="Not specified"
      />

      <el-option
        :value="1"
        label="Male"
      />

      <el-option
        :value="2"
        label="Female"
      />
    </el-select>

    <div v-else-if="!edit" class="view">
      <div class="view__text">
        <span v-if="value">
          {{ value }}
        </span>

        <not-specified
          v-else
        />
      </div>

      <div class="view__icon" v-if="type !== 'gender'">
        <el-button 
          type="text" 
          icon="el-icon-edit" 
          @click="handleEditClick"
        />
      </div>
    </div>

    <div v-else class="edit">
      <fg-input 
        class="edit__input"
        :class="{'input--short': type === 'password'}"
        v-model="newValue"
        :placeholder="type === 'password' ? 'New password' : ''"
      />

      <fg-input 
        v-if="type === 'password'"
        class="edit__input input--short"
        v-model="newValueConfirm"
        placeholder="Confirm password"
        style="margin-left: 10px;"
      />

      <el-button 
        class="edit__submit"
        type="text" 
        icon="el-icon-check" 
        @click="handleSubmitClick"
      />

      <el-button 
        class="edit__cancel"
        type="text" 
        icon="el-icon-close" 
        @click="handleCancelClick"
      />
    </div>
  </div>
</template>

<script>
import { FormGroupInput as FgInput } from '~/components'

import NotSpecified from '~/components/custom/NotSpecified'

import { prettier } from '~/utils'

import { Button, Select, Option } from 'element-ui'

import Vue from 'vue'

Vue.use(Button)
Vue.use(Select)
Vue.use(Option)

export default {
  components: { FgInput, NotSpecified },

  props: [ 'value', 'type' ],

  data () {
    return {
      edit: false,

      newValue: '',
      newValueConfirm: ''
    }
  },

  mounted () {
    if (this.type === 'gender') {
      this.newValue = this.value
    }
  },

  methods: {
    handleEditClick () {
      this.edit = true

      if (this.type === 'password') {
        this.newValue = ''
      } else {
        this.newValue = this.value || ''
      }
    },

    handleSubmitClick () {
      this.$emit('change', this.newValue)

      this.edit = false
    },

    handleCancelClick () {
      this.edit = false
    },

    ...prettier
  }
}
</script>

<style lang="scss">
.editable-field {
  .el-input {    
    &__inner {
      height: 37px;
      margin: 0;

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
.editable-field {
  .view {
    display: flex;
    align-items: center;

    &__icon {
      margin-left: 10px;

      button {
        font-size: 18px;
      }
    }
  }

  .edit {
    display: flex;
    align-items: center;

    &__input {
      margin-bottom: 0;

      &.input--short {
        width: 150px;
      }
    }

    &__submit,
    &__cancel {
      font-size: 18px;
      margin-left: 10px;

      padding: 0;
    }

    &__submit {
      color: green;
    }

    &__cancel {
      color: red;
    }
  }
}
</style>
