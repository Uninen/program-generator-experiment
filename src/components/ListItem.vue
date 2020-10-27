<template>
  <div
    class="flex flex-1"
    :class="{
      'mt-4 mb-3': row.type === 'section',
      'mt-2': row.type !== 'section',
    }"
  >
    <div
      class="text-lg font-semibold text-gray-700 cursor-move handle"
      :class="{ 'pr-3': row.type !== 'section' }"
    >
      {{ startTime(row.duration) }}
    </div>
    <div
      class="flex-1 pl-2"
      :class="{
        'pt-1 pb-2 border-t border-l-8 border-gray-300': row.type === 'talk',
        'pt-1 pb-2 border-t border-l-8 border-blue-300': row.type === 'song',
        'pt-1 pb-2 border-t border-l-8 border-orange-300':
          row.type === 'jingle',
      }"
    >
      <div v-if="row.type !== 'section'" class="flex justify-between mr-1">
        <div @click.prevent="toggleSelected">
          <span
            class="text-sm font-semibold tracking-wide text-gray-500 uppercase select-none font-source"
            >{{ row.type }}
          </span>
          <span class="mx-1 text-gray-500 select-none">&middot;</span>
          <span class="text-sm text-gray-500 select-none">{{
            formatDuration(row.duration)
          }}</span>
        </div>
        <div class="hidden">
          <a
            class="text-sm text-gray-400 uppercase select-none text-source"
            href=""
            @click.prevent="toggleSelected"
          >
            <template v-if="row.isSelected">Deselect</template>
            <template v-else>Select</template>
          </a>
        </div>
      </div>

      <component :is="rowComponent" :row="row" :index="index" />

      <div v-if="row.isSelected">
        <div class="inline-block mr-2">
          <button @click="deleteRow" class="btn delete">Delete</button>
        </div>

        <div v-if="row.type === 'song'" class="inline-block">
          <tempo-button v-on:bpm="updateBpm" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, Component, PropType, computed, provide } from 'vue'

import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'

import { useStore } from 'vuex'
import { key, State, ListRow } from '../store'

import SongItem from './list-items/SongItem.vue'
import TalkItem from './list-items/TalkItem.vue'
import JingleItem from './list-items/JingleItem.vue'
import SectionItem from './list-items/SectionItem.vue'
import TempoButton from './TempoButton.vue'

import { setRowIsSelected } from '../composition'

dayjs.extend(duration)
dayjs.extend(utc)

export default defineComponent({
  props: {
    index: {
      type: Number,
      required: true,
    },
    row: {
      type: Object as PropType<ListRow>,
      required: true,
    },
  },
  components: {
    SongItem,
    TalkItem,
    JingleItem,
    SectionItem,
    TempoButton,
  },
  setup(props) {
    // @ts-expect-error
    const store = useStore<State>(key)
    const showDetails = computed(() => store.state.showDetails)
    let rowComponent: Component
    const startDate = dayjs(
      `2020-01-01 ${showDetails.value.startTime}`,
      'YYYY-MM-DD HH:mm'
    )

    switch (props.row.type) {
      case 'song':
        rowComponent = SongItem
        break
      case 'talk':
        rowComponent = TalkItem
        break
      case 'jingle':
        rowComponent = JingleItem
        break
      case 'section':
        rowComponent = SectionItem
        break
      default:
        rowComponent = SongItem
        break
    }

    const startTime = () => {
      if (props.index === 0) {
        if (store.state.ui.displaySeconds) {
          return startDate.format('HH:mm:ss')
        } else {
          return startDate.format('HH:mm')
        }
      } else {
        let fromStart = 0
        let rowIndex = props.index - 1

        for (let i = 0; i <= rowIndex; i++) {
          fromStart += store.state.rows[i].duration
        }

        if (store.state.ui.displaySeconds) {
          return startDate.add(fromStart, 'second').format('HH:mm:ss')
        } else {
          return startDate.add(fromStart, 'second').format('HH:mm')
        }
      }
    }

    const formatDuration = (dur: string) => {
      if (dayjs.duration(dur, 'seconds').asMinutes() > 59) {
        return dayjs
          .utc(dayjs.duration(dur, 'seconds').asMilliseconds())
          .format('HH:mm:ss')
      } else {
        return dayjs
          .utc(dayjs.duration(dur, 'seconds').asMilliseconds())
          .format('mm:ss')
      }
    }

    const toggleSelected = () => {
      setRowIsSelected(store, props.index, !props.row.isSelected)
    }

    const deleteRow = () => {
      if (confirm('Are you sure?')) {
        store.commit('DELETE_ROW', {
          index: props.index,
        })
      }
    }

    const updateBpm = (newBpm: number) => {
      store.commit('SET_ROW_ATTR', {
        index: props.index,
        attr: 'bpm',
        value: newBpm,
      })
    }

    provide('toggleSelected', toggleSelected)

    return {
      rowComponent,
      formatDuration,
      startTime,
      toggleSelected,
      deleteRow,
      updateBpm,
    }
  },
})
</script>
