<template>
  <div class="px-8">
    <h1 class="mb-6 text-2xl font-bold font-source">Program Generator</h1>

    <add-form></add-form>

    <div>
      <h2 class="text-2xl font-semibold text-gray-900 font-source">Program</h2>

      <div>
        <list-item v-for="row in rows" :key="row" :row="row" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { key, State } from '../store'

import ListItem from './ListItem.vue'
import AddForm from './AddForm.vue'

export default defineComponent({
  components: {
    ListItem,
    AddForm,
  },
  setup() {
    // @ts-expect-error
    const store = useStore<State>(key)

    return {
      debug: process.env.NODE_ENV === 'development',
      rows: computed(() => store.state.rows),
    }
  },
})
</script>
