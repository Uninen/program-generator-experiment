<template>
  <div class="mb-6">
    <h3>Show Details</h3>

    <form action="" clasS="form">
      <label class="block">
        <span class="required">Title</span>
        <input class="block w-full mt-1 form-input" v-model="title" />
      </label>

      <label class="block">
        <span class="required">Start Time</span>
        <input
          class="block w-full mt-1 form-input"
          placeholder="In 24-hour format. For example noon: 12:00"
          v-model="startTime"
        />
      </label>

      <label class="block">
        <span class="required">Duration</span>
        <input
          class="block w-full mt-1 form-input"
          placeholder="For example 03:30"
          v-model="duration"
        />
      </label>

      <button class="btn" type="submit" @click.prevent="updateDetails">Update</button>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { key, State } from '../store'

export default defineComponent({
  setup() {
    // @ts-expect-error
    const store = useStore<State>(key)
    const title = ref('')
    const startTime = ref('')
    const duration = ref('')

    const updateDetails = () => {
      console.log('update details')
    }

    return {
      title,
      duration,
      startTime,
      updateDetails,
    }
  },
})
</script>
