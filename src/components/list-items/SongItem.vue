<template>
  <div class="flex flex-row justify-between song-item">
    <div class="text-lg text-gray-900" @click="toggleSelected">
      {{ row.song }}
    </div>
    <div
      v-if="row.bpm > 0"
      class="text-base text-gray-400 select-none"
      @click="toggleSelected"
    >
      {{ row.bpm }} BPM
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ListRow } from '../../store'

export default defineComponent({
  props: {
    row: {
      type: Object as PropType<ListRow>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  inject: ['toggleSelected'],
})
</script>
