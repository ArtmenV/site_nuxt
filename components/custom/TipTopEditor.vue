<template>
  <div v-loading="isLoading">    
    <no-ssr>
      <div class="editor">
        <editor-menu-bar  
          @hide="hideLinkMenu" 
          :editor="editor" 
          v-slot="{ commands, isActive, getMarkAttrs }"
        >
          <div class="menubar">
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.bold() }"
              @click="commands.bold"
            >
              <font-awesome-icon 
                :icon="['fas', 'bold']" 
                class="icon_button"
              />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.italic() }"
              @click="commands.italic"
            >
              <font-awesome-icon 
                :icon="['fas', 'italic']" 
                class="icon_button"
              />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 3 }) }"
              @click="commands.heading({ level: 1 })"
            >
            <font-awesome-icon 
              :icon="['fas', 'heading']" 
              class="icon_button"
            /> 
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.strike() }"
              @click="commands.strike"
            >
            <font-awesome-icon 
              :icon="['fas', 'strikethrough']" 
              class="icon_button"
            />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.underline() }"
              @click="commands.underline"
            >
              <font-awesome-icon 
                :icon="['fas', 'underline']" 
                class="icon_button"
              />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.bullet_list() }"
              @click="commands.bullet_list"
            >
              <font-awesome-icon 
                :icon="['fas', 'list']"
                class="icon_button"
              />
            </button>

            <button
              class="menubar__button"
              @click="commands.horizontal_rule"
            >
              <font-awesome-icon 
                :icon="['fas', 'minus']"
                class="icon_button"
              />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.blockquote() }"
              @click="commands.blockquote"
            >
              <font-awesome-icon 
                :icon="['fas', 'quote-right']"
                class="icon_button"
              />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.code() }"
              @click="commands.code"
            >
              <font-awesome-icon 
                :icon="['fas', 'thumbtack']"
                class="icon_button"
              />
            </button>

            <button
              class="menubar__button_image"
              @click="showImagePrompForLink()"
            >
              <font-awesome-icon 
                :icon="['fas', 'image']" 
                class="icon_button"
              />
            </button>

            <!-- <button
              class="menubar__button_image"
              @click="showImagePrompt(commands.image)"
            >
              <font-awesome-icon 
                :icon="['fas', 'image']" 
                class="icon_button"
              />
            </button>  -->

            <button
              class="menubar__button_image-id"
              style="margin-left: 0"
              @click="showImageChallenge()"
            >
              <font-awesome-icon 
                :icon="['fas', 'file-image']" 
                class="icon_button"
              />
            </button> 

            <div
              v-if="linkMenuIsActive"
              class="input__link" 
            >
              <form 
                @submit.prevent="setLinkUrl(commands.link, linkUrl)"
              >
                <input class="menububble__input" 
                  type="text" v-model="linkUrl" 
                  placeholder="https://" ref="linkInput" 
                  @keydown.esc="hideLinkMenu"
                />
              </form>

              <button 
                class="menubar__button-check" 
                @click="setLinkUrl(commands.link, linkUrl)" 
                type="button"
              >
                <font-awesome-icon 
                  :icon="['fas', 'check']" 
                  class="icon_button-check"
                />
              </button>

              <button 
                class="menubar__button-check" 
                @click="setLinkUrl(commands.link, null)"
              >
                <font-awesome-icon 
                  :icon="['fas', 'times']" 
                  class="icon_button-times"
                />
              </button>
            </div>
              
            <template v-else>
              <button
                class="menubar__button"
                @click="showLinkMenu(getMarkAttrs('link'))"
                :class="{ 'is-active': isActive.link() }"
              >
                <font-awesome-icon 
                  :icon="['fas', 'link']" 
                  class="icon_button"
                />
              </button>
            </template>

          </div>
        </editor-menu-bar>
        <editor-content 
          :editor="editor"
          @keydown.enter="newYourEditor"
          class="editor__container"
        /> 
      </div>
      
    </no-ssr>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import axios from 'axios'
import { 
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image,
  Placeholder
  } from "tiptap-extensions";

export default {
  props: [
    'postData', 
    'clearFieldEditor',
    'editingPost',
    'editValue',
    'userSignature',
    'userBio',
    'lastActivePostText',
    'challengeProps'
    ],

  data () {
    return {
      isLoading: false,
      newPost: '',
      editor: null,
      linkUrl: null,
      linkMenuIsActive: false, 
      loading: false,
      errorPost: '',
      text: '',
      teps: '',
      dataImage: '',
      text: '',
      stateID: '',
    }
  },

  components: {
    EditorMenuBar,
    EditorContent,
  },

  mounted () {
    this.editor = new Editor({
      onUpdate: ({ state, getHTML, getJSON, transaction, view, event }) => {
        this.editingPost = true
        this.newPost = getHTML()
        this.textContentFake = getHTML()
        this.$emit('newPost', getHTML())
        this.$emit('comment', getHTML())
        this.$emit('newBio', getHTML())
        this.$emit('newSignature', getHTML())
      },
      content: this.editValue || this.userBio || this.userSignature || this.dataImage || this.text,
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading(),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
        new Image(),
        new Placeholder({
          emptyEditorClass: 'is-editor-empty',
          emptyNodeClass: 'is-empty',
          emptyNodeText: this.$route.path === '/voting' ? 'Enter your comment here, and then cast your vote...' : "",
          showOnlyWhenEditable: true,
          showOnlyCurrent: true,
        }),
      ],
      autoFocus: true,
    });

    this.editor.setContent(this.lastActivePostText)
  },

  beforeDestroy() {
    this.editor.destroy()
  },

  methods: {
    showImagePrompForLink () {
      const src = prompt("Enter the url of your image here");
      
      if ( src ) {
        this.isLoading = true
          axios.get(`
            https://cors-anywhere.herokuapp.com/${src}`
          )
          .then((response) => {
            
          const data = `<img src=${src}>`
            this.editor.setContent(this.newPost + `${data}`)
            this.$emit('newPost', (this.newPost + `${data}`))
            this.isLoading = false
          })
          .catch(err => {
            this.editor.setContent(this.newPost + `<em>Image not found</em>`)
            this.isLoading = false
          })
      }
    },

    showImageChallenge () {
      const marks = prompt("Enter the ID of the image (found after ?IMAGE_ID= on an image page's URL):");
      if ( marks ) {
        this.isLoading = true

        const data = {
          id: marks
        }

        this.$api.getPhotoForRedactor(data)
        .then(({ data: { result }}) => {

          const data = `
          <a href=/image?id=${marks}> 
            <img src=${this.$api.resolveImageUrl(result.thumbnail)}> 
          </a>`

          this.$emit('newPost', (this.newPost + ` ${data}`))
          
          if ( this.challengeProps ) {
            this.$emit('comment', (this.newPost + ` ${data}`))
          }

          this.editor.setContent(this.newPost + ` ${data}`)
          this.isLoading = false
        })
        .catch(e => {
          this.editor.setContent(this.newPost + `<em>Image not found</em>`)
          this.isLoading = false
        })
        .finally(_ => {
          this.isLoading = false
        })
      }
    },

    showLinkPrompt(command) {
      const src = prompt("Enter the url of your image here");
      if (src !== null) {
        command({ src });
      }
    },

    showLinkMenu(attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
      this.$refs.linkInput.focus()
      })
    },

    hideLinkMenu() {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },

    setLinkUrl(command, url) {
      command({ href: url })
      this.hideLinkMenu()
    },
  },

  watch: {
    clearFieldEditor: {
      handler: function(val) {
        if ( val === true ) {
          this.editor.clearContent()
        }
      },
      deep: true
    },

    dataImage: {
      handler: function(val) {
        if ( val !== null ) {
          this.content = this.dataImage
        }
      },
      deep: true
    },

    lastActivePostText: {
      handler: function (val) {
        this.editor.setContent(val)
      },
      deep: true
    },

    challengeProps: {
      handler: function (val) {
        this.editor.setContent(val)
      },
      deep: true
    },
  }
}
</script>

<style lang="scss">

.editor__container {
  height: 180px;
  display: block;
  box-sizing: border-box;
  overflow: auto;

  .ProseMirror {
    height: 100%;
    width: 100%;

    // p::first-letter {
    //   text-transform: capitalize;
    // }


    p {
      margin-bottom: 0px;
      padding: 3px 0 0 3px;
      tab-size: 4;

      img {
        max-width: 120px !important;
      }
      em {
        color: #63738c;
        font-weight: bold;
      }
      a {
        cursor: pointer
      }
    }
  }
}

p {
  img {
    max-width: 120px !important;
  }
}

blockquote {
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 5px 15px;
  background-color: #f7f8fa;
  position: relative;
  border-radius: 3px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  overflow: hidden;
  border-left: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background: #2172cd;
  }
}

.editor p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}
</style>

<style lang="scss" scoped>
.editor {
  background-color: #fff;
  border: 1px solid silver;
  border-radius: 3px;

  .menubar {
    background-color: rgb(233, 233, 233);
    padding: 4px;
    border-bottom: 1px solid silver;
    position: relative;    

    .is-active {
      color: #2172cd
    }

    .menubar__button_image {
      width: 25px;
      height: 25px;
      background-color: #fff;
      padding: 3px;
      border: none;
      cursor: pointer;
      margin-left: 10px;

      .icon_button {
        margin: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .menubar__button_image-id {
      width: 25px;
      height: 25px;
      background-color: #fff;
      padding: 3px;
      border: none;
      cursor: pointer;
      margin: 0 auto;
      padding-left: 4px;
      margin-left: 15px;

      .icon_button {
        margin: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .menubar__button {
      width: 25px;
      height: 25px;
      background-color: #fff;
      padding: 3px;
      border: none;
      cursor: pointer;
      margin-top: 2px;

      .icon_button {
        margin: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  
  .editor__container {
    height: 180px;
    display: block;
    box-sizing: border-box;
    overflow: auto;
  }

    .input__link {
      background-color: rgb(226, 226, 226);
      width: 18.5rem;
      height: 2.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 4px;
      margin-bottom: 2px;
      position: absolute;
      z-index: 100;
      left: 20%;
      top: -130%;
      border: 1px solid rgb(180, 180, 180);

    .menububble__input {
      margin: 0 auto;
      border-radius: 2px;
      border: 1px solid silver;
      padding: 3px;
      padding-left: 8px;
      height: 25px;
    }

    .menubar__button-check {
      background-color: #ffffff !important;
      border: 1px solid #fff;
      margin-left: 7px;
      cursor: pointer;
    }

    .menubar__button-check {
      width: 25px;
      height: 1.5rem;
    }

    .icon_button-check {
      color: green;
    }

    .icon_button-times {
      color: red
    }

    .menubar__button-times {
      width: 27px;
      background-color: #ebebeb !important;
      border: none;
      cursor: pointer;
    }
  }
}
</style>