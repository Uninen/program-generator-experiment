<template>
  <div class="mt-2">
    <div
      class="font-normal text-gray-900 border-b font-source"
      :class="{
        'border-gray-300': row.type === 'text',
        'border-blue-300': row.type === 'song',
        'border-orange-300': row.type === 'jingle',
      }"
    >
      {{ formatDuration(row.duration) }}
    </div>
    <div
      class="pl-2 border-l-8"
      :class="{
        'border-gray-300': row.type === 'text',
        'border-blue-300': row.type === 'song',
        'border-orange-300': row.type === 'jingle',
      }"
    >
      <component :is="rowComponent" :row="row" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, Component, PropType } from 'vue'

import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'

import { ListRow } from '../store'

import SongItem from './SongItem.vue'
import TalkItem from './TalkItem.vue'
import JingleItem from './JingleItem.vue'

dayjs.extend(duration)
dayjs.extend(utc)

export default defineComponent({
  props: {
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
    }
  },
})
</script>
