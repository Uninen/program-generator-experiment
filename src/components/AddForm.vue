<template>
  <div class="mb-6">
    <h3 class="text-xl font-semibold text-gray-900 font-source">Add Row</h3>

    <form action="" clasS="form">
      <div class="mt-4">
        <span class="font-bold text-gray-700 font-source">Type</span>
        <div class="mt-2">
          <label class="inline-flex items-center">
            <input
              type="radio"
              v-model="rowType"
              class="form-radio"
              name="accountType"
              value="song"
            />
            <span class="ml-2 font-source">Song</span>
          </label>
          <label class="inline-flex items-center ml-6">
            <input
              type="radio"
              v-model="rowType"
              class="form-radio"
              name="accountType"
              value="talk"
            />
            <span class="ml-2 font-source">Talk</span>
          </label>
        </div>
      </div>

      <label class="block">
        <span class="font-bold text-gray-700 font-source">Length</span>
        <input
          class="block w-full mt-1 form-input"
          placeholder="For example 03:30"
          v-model="length"
        />
      </label>

      <label v-if="rowType === 'song'" class="block">
        <span class="font-bold text-gray-700 font-source">{{ labelText }}</span>
        <input class="block w-full mt-1 form-input" v-model="song" />
      </label>
      <label v-else class="block">
        <span class="font-bold text-gray-700 font-source">{{ labelText }}</span>
        <input class="block w-full mt-1 form-input" v-model="text" />
      </label>

      <label class="block">
        <span class="text-gray-700 font-source">Comment</span>
        <input class="block w-full mt-1 form-input" v-model="comment" />
      </label>

      <button
        class="px-4 py-1 mt-4 font-semibold text-white bg-blue-500 border rounded-md shadow-md font-source"
        type="submit"
        @click.prevent="addRow"
      >
        Add
      </button>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { key, State } from '../store'

import ListItem from './ListItem.vue'

export default defineComponent({
  components: {
    ListItem,
  },
  setup() {
    // @ts-expect-error
    const store = useStore<State>(key)
    const rowType = ref('song')
    const length = ref(0)
    const song = ref('')
    const text = ref('')
    const comment = ref('')
    const labelText = computed(() => {
      if (rowType.value === 'song') {
        return 'Artist - Song title'
      } else {
        return 'Text'
      }
    })

    const addRow = () => {
      console.log('add row')
      store.commit('increment')
      store.commit('addRow', {
        type: rowType.value,
        length: length.value,
        song: song.value,
        text: text.value,
        comment: comment.value,
      })
    }

    return {
      rowType,
      labelText,
      addRow,
      rowCount: computed(() => store.state.rows.length),
      length,
      song,
      text,
      comment,
    }
  },
})
</script>
