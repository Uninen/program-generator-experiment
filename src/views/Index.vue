<template>
  <div class="px-8 scriptbuilder">
    <h1 class="mb-6 text-2xl font-bold font-source">Radio Script Builder</h1>

    <div class="flex flex-col w-full md:flex-row-reverse">
      <div class="md:w-4/12">
        <div class="mb-6">
          <h3>Show Details</h3>

          <show-details-form v-if="showDetailsFormOpen" />
          <div v-else>
            <ul class="text-gray-800 font-source">
              <li>
                <span class="font-semibold">Title</span>:
                {{ showDetails.title }}
              </li>
              <li>
                <span class="font-semibold">Start time</span>:
                {{ showDetails.startTime }}
              </li>
              <li><span class="font-semibold">Duration</span>: 2h</li>
            </ul>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-semibold text-gray-900 font-source">
            Add Row
          </h3>

          <add-form></add-form>
        </div>

        <div class="mb-6">
          <tempo-button />
        </div>
      </div>
      <div class="md:w-8/12">
        <div class="px-4 py-3 bg-white rounded-sm shadow md:mr-6">
          <h2 class="mb-6 text-2xl font-semibold font-source">
            Program for {{ showDetails.title }}
          </h2>

          <ol id="programlist">
            <li v-for="(row, index) in rows" :key="row">
              <list-item :index="index" :row="row" />
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Sortable from 'sortablejs'

import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { key, State } from '../store'

import ListItem from '../components/ListItem.vue'
import AddForm from '../components/AddForm.vue'
import ShowDetailsForm from '../components/ShowDetailsForm.vue'
import TempoButton from '../components/TempoButton.vue'

export default defineComponent({
  components: {
    ListItem,
    AddForm,
    ShowDetailsForm,
    TempoButton,
  },
  setup() {
    // @ts-expect-error
    const store = useStore<State>(key)

    onMounted(() => {
      const el = document.getElementById('programlist')
      Sortable.create(el!, {
        handle: '.handle',
        onEnd: function (/**Event*/ evt) {
          console.log(`changed ${evt.oldIndex} to ${evt.newIndex}`)
          store.commit('swapRows', {
            from: evt.oldIndex,
            to: evt.newIndex,
          })
        },
      })

      // [ list[y], list[x] ] = [ list[x], list[y] ]
    })

    return {
      debug: process.env.NODE_ENV === 'development',
      rows: computed(() => store.state.rows),
      showDetails: computed(() => store.state.showDetails),
      showDetailsFormOpen: computed(() => store.state.ui.showDetailsFormOpen),
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
