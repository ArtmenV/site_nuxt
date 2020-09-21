<template>
  <div class="page page--new-thread">
    <h3>
      Create new thread
    </h3>
    
    <input-info-block
      label="Subject"
      v-model="subject"
    />

    <TipTopEditor
      @newPost="DataPost"
    />
      <!-- :clearFieldEditor="clearEditor"
      :editingPost="editing"
      :editValue="editValue" -->

    <div class="submit">
      <el-button
        plain
        type="primary"
        class="submit__btn"
        :loading="loading"
        @click="handleSubmit"
      >
        Create thread
      </el-button>

      <el-alert
        v-if="error"
        class="submit__error"
        :title="error"
        type="error"
        :closable="false"
      />
    </div>
  </div>
</template>

<script>
import InputInfoBlock from '~/components/custom/InputInfoBlock.vue'

export default {
  components: {
    InputInfoBlock,
    TipTopEditor: () => import(`~/components/custom/TipTopEditor.vue`)
  },
  data () {
    return {
      threadPost: '',
      subject: '',
      error: '',
      loading: false
    }
  },
  methods: {
    handleSubmit () {
      this.loading = true
      this.error = ''

      this.$api.makeForumThread({
        title: this.subject,
        text: this.threadPost,
        section_id: this.$route.query.section_id
      })
        .then(({ data: { result } }) => {
          const { id } = result

          this.$router.push('/thread?id=' + id)
        })
        .catch(({ response: { data } }) => {
          console.error(data)

          const { status_code } = data

          switch (status_code) {
            case 403:
              this.error = 'Access denied'
              break
            
            default:
              this.error = 'Something went wrong'
          }
        })
        .finally(_ => {
          this.loading = false
        })
    },

    DataPost (data) {
      this.threadPost = data
    }
  }
}
</script>

<style lang="scss" scoped>
.page.page--new-thread {
  max-width: 600px;
  margin: 0 auto;

  .submit {
    margin-top: 10px;
    
    display: grid;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
  }
}

@media (min-width: 600px) {
  .submit {
    grid-template-columns: 1fr 2fr;
  }
}
</style>
