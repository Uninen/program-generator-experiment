import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export interface ListRow {
  type: 'song' | 'text'
  length: number
  song?: string
  text?: string
  comment?: string
}
export interface State {
  count: number
  rows: ListRow[]
}
export const key: InjectionKey<Store<State>> = Symbol()
export const store = createStore<State>({
  state: {
    count: 0,
    rows: [
      {
        type: 'song',
        length: 210,
        song: 'Foo Fighters - Learn To Fly',
      },
      {
        type: 'text',
        length: 60,
        text: 'Good Hello!',
      },
    ],
  },
  mutations: {
    increment(state) {
      // mutate state
      state.count++
    },

    addRow(state, payload: ListRow) {
      state.rows.push(payload)
    },
  },
})
