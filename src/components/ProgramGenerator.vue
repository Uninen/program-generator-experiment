<template>
  <div class="px-8 prose">
    <h1 class="font-source">Program Generator</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'
import { globalState } from '../store'

export default defineComponent({
  setup() {
    return {
      count: toRef(globalState, 'count'),
    }
  },
})
</script>
