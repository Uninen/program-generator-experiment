<template>
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
