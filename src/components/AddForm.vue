<template>
  <form action="" class="form">
    <div class="mt-4">
      <span class="required label">Type</span>
      <div>
        <label class="inline-flex items-center mr-3 cursor-pointer">
          <input
            type="radio"
            v-model="rowType"
            class="cursor-pointer form-radio"
            name="row-type"
            value="song"
          />
          <span class="ml-2 font-source">Song</span>
        </label>
        <label class="inline-flex items-center mr-3 cursor-pointer">
          <input
            type="radio"
            v-model="rowType"
            class="cursor-pointer form-radio"
            name="row-type"
            value="talk"
          />
          <span class="ml-2">Talk</span>
        </label>
        <label class="inline-flex items-center mr-3 cursor-pointer">
          <input
            type="radio"
            v-model="rowType"
            class="cursor-pointer form-radio"
            name="row-type"
            value="jingle"
          />
          <span class="ml-2 font-source">Jingle</span>
        </label>
        <label class="inline-flex items-center cursor-pointer">
          <input
            type="radio"
            v-model="rowType"
            class="cursor-pointer form-radio"
            name="row-type"
            value="section"
          />
          <span class="ml-2 font-source">Section</span>
        </label>
      </div>
    </div>

    <div class="mt-1" v-if="rowType !== 'section'">
      <label class="block">
        <span class="required">Duration (seconds)</span>
        <input
          class="block w-full mt-1 form-input"
          v-model="duration"
          name="duration"
        />
      </label>
    </div>

    <div class="mt-2">
      <label v-if="rowType === 'song'" class="block">
        <span class="required">{{ labelText }}</span>
        <input
          class="block w-full mt-1 form-input"
          v-model="song"
          name="songtext"
        />
      </label>
      <label v-else class="block">
        <span class="required">{{ labelText }}</span>
        <input
          class="block w-full mt-1 form-input"
          v-model="text"
          name="text"
        />
      </label>
    </div>

    <div class="mt-2" v-if="rowType !== 'section'">
      <label class="block">
        <span>Comment</span>
        <input class="block w-full mt-1 form-input" v-model="comment" />
      </label>
    </div>

    <button class="btn" type="submit" @click.prevent="addRow">Add</button>
  </form>
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
    const duration = ref('')
    const song = ref('')
    const text = ref('')
    const comment = ref('')
    const labelText = computed(() => {
      if (rowType.value === 'song') {
        return 'Artist - Song'
      } else if (rowType.value === 'jingle') {
        return 'Name'
      } else if (rowType.value === 'section') {
        return 'Text'
      } else {
        return 'Topic'
      }
    })

    const resetRow = () => {
      rowType.value = 'song'
      duration.value = ''
      song.value = ''
      text.value = ''
      comment.value = ''
      store.commit('SET_UI_ATTR', {
        attr: 'addFormOpen',
        value: false,
      })
    }

    const addRow = () => {
      let dur = parseInt(duration.value)
      if (rowType.value === 'section') {
        dur = 0
      }
      store.commit('ADD_ROW', {
        type: rowType.value,
        duration: dur,
        song: song.value,
        text: text.value,
        comment: comment.value,
      })
      resetRow()
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
