<template>
  <div>
    <button @click="tapTempo" class="btn">Tap tempo</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup(_, { emit }) {
    const tempo = ref(0)

    let diffs: number[] = []
    var timer: NodeJS.Timeout
    let previousTime: number = 0

    const resetTimer = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        diffs = []
        previousTime = 0
        tempo.value = 0
      }, 2000)
    }

    const tapTempo = () => {
      const time = Date.now()
      if (previousTime) {
        diffs.push(time - previousTime)

        if (diffs.length > 2) {
          let average =
            diffs.reduce((result, diff) => {
              return result + diff
            }) / diffs.length
          tempo.value = Math.round((1 / (average / 1000)) * 60)
          emit('bpm', tempo.value)

          if (diffs.length > 9) {
            diffs.shift()
          }
        }
      }
      previousTime = time
      resetTimer()
    }
    return {
      tempo,
      tapTempo,
    }
  },
})
</script>
