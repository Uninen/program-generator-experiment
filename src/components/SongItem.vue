<template>
  <div class="font-semibold font-source">Song:</div>
  <div>{{ row.song }}</div>
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
