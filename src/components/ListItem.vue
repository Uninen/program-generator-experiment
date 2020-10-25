<template>
  <div class="flex flex-1 mt-2">
    <div class="pr-3 text-xl font-semibold text-gray-600">
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
      <div>
        <span class="text-sm font-semibold tracking-wide text-gray-500 uppercase font-source"
          >{{ row.type }}
        </span>
        <span class="mx-1 text-gray-500">&middot;</span>
        <span class="text-sm text-gray-500">{{ formatDuration(row.duration) }}</span>
      </div>

      <component :is="rowComponent" :row="row" />
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
    let rowComponent: Component
    // @ts-expect-error
    const store = useStore<State>(key)
    const showDetails = computed(() => store.state.showDetails)

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
        return showDetails.value.startTime
      } else {
        return '00:00'
      }
    }

    const formatDuration = (dur: string) => {
      if (dayjs.duration(dur, 'seconds').asMinutes() > 59) {
        return dayjs.utc(dayjs.duration(dur, 'seconds').asMilliseconds()).format('HH:mm:ss')
      } else {
        return dayjs.utc(dayjs.duration(dur, 'seconds').asMilliseconds()).format('mm:ss')
      }
    }

    return {
      rowComponent,
      formatDuration,
      startTime,
    }
  },
})
</script>
