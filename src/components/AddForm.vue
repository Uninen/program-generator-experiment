<template>
  <div class="mb-6">
    <h3 class="text-xl font-semibold text-gray-900 font-source">Add Row</h3>

    <form action="" class="form">
      <div class="mt-4">
        <span class="required label">Type</span>
        <div class="mt-2">
          <label class="inline-flex items-center mr-3 cursor-pointer">
            <input
              type="radio"
              v-model="rowType"
              class="cursor-pointer form-radio"
              name="accountType"
              value="talk"
            />
            <span class="ml-2">Talk</span>
          </label>
          <label class="inline-flex items-center mr-3 cursor-pointer">
            <input
              type="radio"
              v-model="rowType"
              class="cursor-pointer form-radio"
              name="accountType"
              value="song"
            />
            <span class="ml-2 font-source">Song</span>
          </label>
          <label class="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              v-model="rowType"
              class="cursor-pointer form-radio"
              name="accountType"
              value="jingle"
            />
            <span class="ml-2 font-source">Jingle</span>
          </label>
        </div>
      </div>

      <label class="block">
        <span class="required">Duration</span>
        <input
          class="block w-full mt-1 form-input"
          placeholder="For example 03:30"
          v-model="duration"
        />
      </label>

      <label v-if="rowType === 'song'" class="block">
        <span class="required">{{ labelText }}</span>
        <input class="block w-full mt-1 form-input" v-model="song" />
      </label>
      <label v-else class="block">
        <span class="required">{{ labelText }}</span>
        <input class="block w-full mt-1 form-input" v-model="text" />
      </label>

      <label class="block">
        <span>Comment</span>
        <input class="block w-full mt-1 form-input" v-model="comment" />
      </label>

      <button class="btn" type="submit" @click.prevent="addRow">Add</button>
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
    const rowType = ref('talk')
    const duration = ref(0)
    const song = ref('')
    const text = ref('')
    const comment = ref('')
    const labelText = computed(() => {
      if (rowType.value === 'song') {
        return 'Artist - Song title'
      } else {
        return 'Topic'
      }
    })

    const addRow = () => {
      console.log('add row')
      store.commit('increment')
      store.commit('addRow', {
        type: rowType.value,
        duration: duration.value,
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
      duration,
      song,
      text,
      comment,
    }
  },
})
</script>
