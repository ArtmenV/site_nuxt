<template>
  <div class="post">
    <div class="post__header">
      <div class="header">
        <div
          class="header__avatar"
          :style="{'--ava': `url(${'https://images.dpchallenge.com/images_profile/65000-69999/65/67145.jpg'})`}"
        ></div>

        <div class="header__author silent-link">
          ResettingSSSss
        </div>

        <div class="header__date">
          6 Jan, 2019 <i class="edit el-icon-edit" />
        </div>
      </div>
    </div>

    <div class="post__body">
      I do not like. Choosing a template has become more difficult.
      Small thumbnails 80x80px were better.
    </div>

    <div class="post__footer">
      <div class="footer">
        <div class="footer__helpful">
          <span class="marked">
            Photographer found comment helpful.&nbsp;
          </span>

          <span class="marking">
            (unmark)
          </span>
        </div>

        <div class="footer__actions">
          <div class="actions">
            <div class="actions__spam">
              Spam
            </div>

            <div class="actions__report-post">
              Report post
            </div>

            <div class="actions__quote">
              Quote
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.post {
  display: grid;
  grid-row-gap: 10px;

  padding: 10px;

  background: #ffffff;
  border: 1px solid #c4c4c4;
  border-radius: 3px;

  &__header {
    .header {
      display: grid;
      grid-template-columns: 60px 1fr 100px;

      &__avatar {
        padding: 10px;
        border-radius: 100%;

        background: hsl(216, 38%, 47%);
        background: var(--ava);
        background-position: center center;
        background-size: cover;
        
        width: 40px;
        height: 40px;

        display: flex;
        align-items: center;
        justify-content: center;

        color: #ffffff;
        font-size: 20px;
        font-weight: bold;
      }

      &__date {
        justify-content: flex-end;
        font-size: 13px;

        .edit {
          color: hsl(216, 38%, 47%);
          margin-left: 5px;
          font-size: 14px;

          cursor: pointer;
        }
      }

      &__date,
      &__author {
        display: flex;
        align-items: center;
      }
    }
  }

  &__footer {
    .footer {
      display: flex;
      justify-content: space-between;
      padding: 3px 0;

      &::after {
        display: none;
      }

      &__actions {
        .actions {
          display: flex;

          > * {
            padding: 3px 9px;

            border-radius: 3px;

            font-size: 11px;
            font-weight: bold;

            text-transform: uppercase;
            user-select: none;

            color: white;

            &:hover {
              cursor: pointer;
            }
          }

          &__spam {
            background: hsl(358, 59%, 47%);
          }

          &__report-post {
            background: hsl(207, 58%, 47%);

            margin-left: 10px;
          }

          &__quote {
            background: hsl(217, 17%, 47%);

            margin-left: 10px;
          }
        }
      }

      &__helpful {
        font-size: 13px;

        display: flex;
        align-items: center;

        .marking {
          text-decoration: underline;

          cursor: pointer;
        }
      }
    }
  }
}

@media (max-width: 620px) {
  .footer {
    flex-direction: column;

    &__actions {
      margin-top: 10px;
    }
  }
}

img {
  width: 220px !important;
  height: auto;
}
</style>
