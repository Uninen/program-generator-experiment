<template>
  <div>
    <div class="font-normal font-source">00:00 ({{ row.length }})</div>
    <component :is="comp" :row="row" />
  </div>
</template>
<script lang="ts">
import { defineComponent, Component, PropType } from 'vue'
import { ListRow } from '../store'

import SongItem from './SongItem.vue'
import TalkItem from './TalkItem.vue'

export default defineComponent({
  props: {
    row: {
      type: Object as PropType<ListRow>,
      required: true,
    },
  },
  components: {
    SongItem,
    TalkItem,
  },
  setup(props) {
    let comp: Component

    if (props.row.type === 'song') {
      comp = SongItem
    } else {
      comp = TalkItem
    }

    return {
      comp,
    }
  },
})
</script>
