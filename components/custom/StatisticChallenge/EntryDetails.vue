<template>
  <div class="details">
    <div class="details__comment">
      <details-block>
        <div
          slot="header"
          class="header"
        >
          Photographer's Comments
        </div>

        <div
          v-if="entry.description"
          class="body"
          v-html="entry.description"
        ></div>

        <div v-else class="body" style="padding: 10px 0;">
          N/A
        </div>
      </details-block>

      <details-block dq v-if="entry.is_disqualified">
        <div
          slot="header"
          class="header"
        >
          Disqualification Details
        </div>

        <div class="body">
          {{ entry.disqualifications_reason }}
        </div>
      </details-block>
    </div>

    <div class="details__info">
      <details-block>
        <div
          slot="header"
          class="header"
        >
          Photograph Information
        </div>

        <div class="body">
          <info-block
            label="Challenge:"
          >
            <nuxt-link
              :to="'voting-entries?id=' + entry.challenge.id"
              class="link"
            >
              {{ entry.challenge.title }}
            </nuxt-link>
          </info-block>

          <info-block
            label="Location:"
          >
            <span v-if="entry.location">
              {{ entry.location }}
            </span>

            <not-specified v-else />
          </info-block>

          <info-block
            label="Date:"
          >
            <span v-if="entry.taken_date">
              {{ ISOToReadableString(entry.taken_date, {year: true}) }}
            </span>

            <not-specified v-else />
          </info-block>

          <info-block
            label="Aperture:"
          >
            <span v-if="entry.aperture">
              {{ entry.aperture }}
            </span>

            <not-specified v-else />
          </info-block>

          <info-block
            label="ISO:"
          >
            <span v-if="entry.iso">
              {{ entry.iso }}
            </span>

            <not-specified v-else />
          </info-block>

          <info-block
            label="Shutter:"
          >
            <span v-if="entry.speed">
              {{ entry.speed }}
            </span>

            <not-specified v-else />
          </info-block>

          <info-block
            label="Date Uploaded:"
          >
            <span v-if="entry.uploaded_date">
              {{ ISOToReadableString(entry.uploaded_date, {year: true}) }}
            </span>

            <not-specified v-else />
          </info-block>
        </div>
      </details-block>
    </div>

    <div class="details__stat">
      <details-block>
        <div
          slot="header"
          class="header"
        >
          Statistics
        </div>

        <div class="body">
          <info-block
            label="Avg (all users):"
          >
            {{ entry.avg_score || 'N/A' }}
          </info-block>

          <info-block
            label="Avg (participants):"
          >
            {{ entry.avg_score_participants || 'N/A' }}
          </info-block>

          <info-block
            label="Avg (non-participants):"
          >
            {{ entry.avg_score_non_participants || 'N/A' }}
          </info-block>

          <info-block
            label="Views during voting:"
          >
            {{ entry.views_during_voting || 'N/A' }}
          </info-block>

          <info-block
            label="Favorites:"
          >
            {{ entry.in_favorites_count || '0' }}
            
            <span class="silent-link">
              (view)
            </span>
          </info-block>          
        </div>
      </details-block>
    </div>

    <div
      class="details__voting-breakdown"
      v-if="isAuthorized"
    >
      <details-block>
        <div
          slot="header"
          class="header"
        >
          Voting Breakdown
        </div>

        <div class="body">
          <voting-breakdown />
        </div>
      </details-block>
    </div>
  </div>
</template>

<script>
import DetailsBlock from '~/components/custom/DetailsBlock'
import InfoBlock from '~/components/custom/InfoBlock.vue'
import VotingBreakdown from '~/components/custom/VotingBreakdown.vue'
import NotSpecified from '~/components/custom/NotSpecified'
import { ISOToReadableString } from '~/helpers'
import { mapGetters } from 'vuex'
export default {
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  components: {
    DetailsBlock,
    InfoBlock,
    VotingBreakdown,
    NotSpecified
  },
  computed: {
    ...mapGetters([ 'isAuthorized' ])
  },
  data () {
    return {
      votingBreakdown: null,
      loading: false
    }
  },
  methods: {
    ISOToReadableString
  }
}
</script>

<style lang="scss" scoped>
.details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;

  &__voting-breakdown,
  &__comment {
    grid-column: 1 / 3;
  }

  &__comment {
    display: grid;
    grid-row-gap: 10px;
  }
}

@media (max-width: 630px) {
  .details {
    &__info,
    &__stat {
      grid-column: 1 / 3;
    }
  }
}
</style>
