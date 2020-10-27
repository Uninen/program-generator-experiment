<template>
  <div class="flex flex-1 mt-2">
    <div class="pr-3 text-xl font-semibold text-gray-600 cursor-move handle">
      {{ startTime(row.duration) }}
    </div>
    <div
      class="flex-1 pt-1 pb-2 pl-2 border-t border-l-8"
      :class="{
        'border-gray-300': row.type === 'text',
        'border-blue-300': row.type === 'song',
        'border-orange-300': row.type === 'jingle',
      }"
    >
      <div class="flex justify-between mr-1">
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
        <div class="">
          <a
            class="text-sm text-gray-400 uppercase select-none text-source"
            href=""
            @click.prevent="toggleSelected"
          >
            <template v-if="row.isSelected">De-select</template>
            <template v-else>Select</template>
          </a>
        </div>
      </div>

      <component :is="rowComponent" :row="row" />

      <div v-if="row.isSelected">
        <a href="" @click.prevent="deleteRow" class="text-sm text-red-600"
          >Delete</a
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, Component, PropType, computed } from 'vue'

import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'

import { useStore } from 'vuex'
import { key, State, ListRow } from '../store'

import SongItem from './SongItem.vue'
import TalkItem from './TalkItem.vue'
import JingleItem from './JingleItem.vue'

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
      store.commit('setRowIsSelected', {
        index: props.index,
        isSelected: !props.row.isSelected,
      })
    }

    const deleteRow = () => {
      store.commit('deleteRow', {
        index: props.index,
      })
    }

    return {
      rowComponent,
      formatDuration,
      startTime,
      toggleSelected,
      deleteRow,
    }
  },
})
</script>
