<template>
  <div class="provide-feedback">
    <info-block-big>
      <template #header>
        Provide Feedback
      </template>

      <template>
        Have a suggestion? Found a bug? Please
        <a
          href="http://getsatisfaction.com/dpchallenge"
          class="link"
          target="_blank"
        >
          click here visit our site over GetSatisfaction
        </a>
        and let your voice be heard!
      </template>
    </info-block-big>
  </div>
</template>

<script>
import InfoBlockBig from '~/components/custom/InfoBlockBig'
export default {
  components: { InfoBlockBig }
}
</script>
