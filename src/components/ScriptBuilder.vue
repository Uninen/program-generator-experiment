<template>
  <div class="px-8 scriptbuilder">
    <h1 class="mb-6 text-2xl font-bold font-source">Radio Script Builder 0.1a</h1>

    <div class="flex flex-col w-full md:flex-row-reverse">
      <div class="md:w-4/12">
        <show-details-form />

        <add-form></add-form>
      </div>
      <div class="md:w-8/12">
        <div class="px-4 py-3 mr-6 bg-white rounded-sm shadow">
          <h3>Program for {{ showDetails.title }}</h3>

          <list-item v-for="row in rows" :key="row" :row="row" />
        </div>
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
import ShowDetailsForm from './ShowDetailsForm.vue'

export default defineComponent({
  components: {
    ListItem,
    AddForm,
    ShowDetailsForm,
  },
  setup() {
    // @ts-expect-error
    const store = useStore<State>(key)

    return {
      debug: process.env.NODE_ENV === 'development',
      rows: computed(() => store.state.rows),
      showDetails: computed(() => store.state.showDetails),
    }
  },
})
</script>
<style lang="postcss">
.scriptbuilder h3 {
  @apply text-xl font-semibold text-gray-900 font-source;
}

.scriptbuilder .required {
  @apply font-bold;
}

.scriptbuilder .label,
.scriptbuilder label {
  @apply text-gray-700 font-source;
}

.scriptbuilder .btn {
  @apply px-4 py-1 mt-4 font-semibold text-white bg-blue-500 border rounded-md shadow-md font-source;
}
.scriptbuilder .btn:hover {
  @apply bg-blue-600 shadow-none;
}
</style>
