<template>
  <div class="px-2 md:px-4 lg:px-8 scriptbuilder">
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
              <li>
                <span class="font-semibold">Duration</span>:
                {{ showDetails.duration }} min
              </li>
              <li>Currently scripted: {{ totalProgramMinutes }} min</li>
              <li>
                Time to fill: {{ emptyProgramMinutes }} min (~{{
                  neededSongsEstimate
                }}
                songs)
              </li>
            </ul>
          </div>
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
            <li>
              <div
                class="mt-2 text-lg font-semibold text-gray-500 cursor-pointer select-none font-source"
                @click="toggleAddForm"
              >
                <template v-if="!addFormOpen">+</template>
                <template v-else>-</template>
                Add row
              </div>
              <div v-if="addFormOpen" class="mb-6">
                <add-form></add-form>
              </div>
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
import { key, State, ListRow } from '../store'

import ListItem from '../components/ListItem.vue'
import AddForm from '../components/AddForm.vue'
import ShowDetailsForm from '../components/ShowDetailsForm.vue'

export default defineComponent({
  components: {
    ListItem,
    AddForm,
    ShowDetailsForm,
  },
  setup() {
    // @ts-expect-error
    const store = useStore<State>(key)
    const addFormOpen = computed(() => store.state.ui.addFormOpen)

    onMounted(() => {
      const el = document.getElementById('programlist')
      Sortable.create(el!, {
        handle: '.handle',
        onEnd: function (/**Event*/ evt) {
          console.log(`changed ${evt.oldIndex} to ${evt.newIndex}`)
          store.commit('SWAP_ROWS', {
            from: evt.oldIndex,
            to: evt.newIndex,
          })
        },
      })
    })
    const totalProgramSeconds = computed(() => {
      return store.state.rows.reduce((sum: number, row: ListRow) => {
        return sum + row.duration
      }, 0)
    })

    const totalProgramMinutes = computed(() => {
      return Math.round(totalProgramSeconds.value / 60)
    })

    const emptyProgramSeconds = computed(() => {
      return store.state.showDetails.duration * 60 - totalProgramSeconds.value
    })

    const emptyProgramMinutes = computed(() => {
      return store.state.showDetails.duration - totalProgramMinutes.value
    })

    const neededSongsEstimate = computed(() => {
      return Math.round(
        emptyProgramSeconds.value / store.state.showDetails.averageSongLength
      )
    })

    const toggleAddForm = () => {
      store.commit('SET_UI_ATTR', {
        attr: 'addFormOpen',
        value: !store.state.ui.addFormOpen,
      })
    }

    return {
      debug: process.env.NODE_ENV === 'development',
      rows: computed(() => store.state.rows),
      showDetails: computed(() => store.state.showDetails),
      showDetailsFormOpen: computed(() => store.state.ui.showDetailsFormOpen),
      totalProgramMinutes,
      emptyProgramMinutes,
      neededSongsEstimate,
      addFormOpen,
      toggleAddForm,
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

.scriptbuilder .btn.delete {
  @apply bg-red-600;
}
.scriptbuilder .btn.delete:hover {
  @apply bg-red-600;
}
</style>
