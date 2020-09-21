<template>
  <div class="search-container" @click="isOpen ? null : isOpen = true" ref="container">
    <i class="el-icon-search"></i>

    <div class="search-form" :class="{'search-form--open': isOpen}">
      <div class="search-form__close" @click.stop="handleClose">
        <i class="el-icon-close"></i>
      </div>

      <div class="search-form__input">
        <input
          class="input"
          type="text"
          v-model="search"
          placeholder="Type for search..."
          @keyup.enter="handleSubmit"
          @keyup.esc="handleClose"
        >
      </div>

      <div class="search-form__submit" @click.stop="handleSubmit">
        <i class="el-icon-search"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: '',

      isOpen: false
    }
  },

  methods: {
    handleSubmit () {
    },

    handleClose () {
      this.isOpen = false
      this.$refs.container.blur()
    }
  }
}
</script>

<style lang="scss" scoped>
@media (hover: none) {
  .search-container {
    &:hover {
      background: #00000000 !important;

      cursor: pointer;
    }
  }
}
.search-container {
  height: 70px;
  width: 70px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  transition: background .2s ease-in;

  &:hover {
    background: #0000001a;

    cursor: pointer;
  }

  i {
    font-size: 32px;
  }

  .search-form {
    background: #ddd;

    z-index: 990;

    position: absolute;
    top: 0;
    right: 0;

    height: 70px;
    width: 0;
    max-width: 100vw;

    display: grid;
    grid-template-columns: 70px 1fr 70px;

    transition: width .3s ease-in;

    border-bottom: 2px solid #023664;

    overflow: hidden;

    &.search-form--open {
      width: 500px;

      box-shadow: -7px 0px 10px 0px rgba(0,0,0,0.14);
    }

    &__input,
    &__close,
    &__submit {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__close,
    &__submit {
      
      background: #0000000c;

      transition: background .2s ease-in;

      &:hover {
        background: #0000001a;
      }
    }

    &__input {
      background: rgb(235, 235, 235);

      .input {
        background: #00000000;
        box-shadow: none;
        border: none;
        outline: none;

        font-size: 20px;

        width: 100%;

        margin: 0 10px;

        color: #2c2c2c;
      }
    }
  }
}
</style>