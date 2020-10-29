<template>
  <div class="text-lg text-gray-900 jingle-item" @click="toggleSelected">
    {{ row.text }}
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
