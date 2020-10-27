import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export interface ShowDetails {
  title: string
  startTime: string
  duration: number
}

export interface ListRow {
  type: 'song' | 'talk' | 'jingle'
  isSelected: boolean
  isFixed: boolean
  duration: number
  song?: string
  text?: string
  comment?: string
}
export interface State {
  ui: {
    showDetailsFormOpen: boolean
    displaySeconds: boolean
  }
  showDetails: ShowDetails
  rows: ListRow[]
}

export const key: InjectionKey<Store<State>> = Symbol()
export const store = createStore<State>({
  state: {
    ui: {
      showDetailsFormOpen: false,
      displaySeconds: false,
    },
    showDetails: {
      title: 'RetroWaveStation #1',
      startTime: '22:00',
      duration: 7200,
    },
    rows: [
      {
        type: 'song',
        isFixed: false,
        isSelected: false,
        duration: 324,
        song: 'The Midnight - Days of Thunder',
      },
      {
        type: 'jingle',
        isFixed: false,
        isSelected: false,
        duration: 5,
        text: 'RWS #1',
      },
      {
        type: 'talk',
        isFixed: false,
        isSelected: false,
        duration: 60,
        text: 'Good Hello!',
      },
      {
        type: 'song',
        isFixed: false,
        isSelected: false,
        duration: 254,
        song: 'Jessie Frye w/ Timecop1983 - Faded Memory',
      },
      {
        type: 'song',
        isFixed: false,
        isSelected: false,
        duration: 348,
        song: 'The 1975 - Somebody Else',
      },
      {
        type: 'talk',
        isFixed: false,
        isSelected: false,
        duration: 30,
        text: 'Welcome listeners, talk about the theme',
      },
      {
        type: 'song',
        isFixed: false,
        isSelected: false,
        duration: 223,
        song: 'Michael Oakley - California',
      },
      {
        type: 'song',
        isFixed: false,
        isSelected: false,
        duration: 291,
        song: 'Le Cassette - Digital Power',
      },
    ],
  },
  mutations: {
    addRow(state, payload: ListRow) {
      state.rows.push(payload)
    },
    deleteRow(
      state,
      payload: {
        index: number
      }
    ) {
      state.rows.splice(payload.index, 1)
    },
    setRowIsSelected(
      state,
      payload: {
        index: number
        isSelected: boolean
      }
    ) {
      state.rows[payload.index].isSelected = payload.isSelected
    },
    swapRows(
      state,
      payload: {
        from: number
        to: number
      }
    ) {
      ;[state.rows[payload.to], state.rows[payload.from]] = [
        state.rows[payload.from],
        state.rows[payload.to],
      ]
    },
  },
})
