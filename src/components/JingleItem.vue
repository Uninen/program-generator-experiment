<template>
  <div class="text-sm font-semibold tracking-wide text-gray-400 uppercase font-source">Jingle</div>
  <div class="text-lg text-gray-900">{{ row.text }}</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ListRow } from '../store'

export default defineComponent({
  props: {
    row: {
      type: Object as PropType<ListRow>,
      required: true,
    },
  },
})
</script>
