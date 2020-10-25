import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export interface ShowDetails {
  title: string
  startTime: string
  duration: number
}

export interface ListRow {
  type: 'song' | 'talk' | 'jingle'
  isFixed: boolean
  duration: number
  song?: string
  text?: string
  comment?: string
}
export interface State {
  ui: {
    showDetailsFormOpen: boolean
  }
  showDetails: ShowDetails
  rows: ListRow[]
}
export const key: InjectionKey<Store<State>> = Symbol()
export const store = createStore<State>({
  state: {
    ui: {
      showDetailsFormOpen: false,
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
        duration: 324,
        song: 'The Midnight - Days of Thunder',
      },
      {
        type: 'jingle',
        isFixed: false,
        duration: 5,
        text: 'RWS #1',
      },
      {
        type: 'talk',
        isFixed: false,
        duration: 60,
        text: 'Good Hello!',
      },
      {
        type: 'song',
        isFixed: false,
        duration: 254,
        song: 'Jessie Frye w/ Timecop1983 - Faded Memory',
      },
      {
        type: 'song',
        isFixed: false,
        duration: 348,
        song: 'The 1975 - Somebody Else',
      },
      {
        type: 'talk',
        isFixed: false,
        duration: 30,
        text: 'Welcome listeners, talk about the theme',
      },
      {
        type: 'song',
        isFixed: false,
        duration: 223,
        song: 'Michael Oakley - California',
      },
      {
        type: 'song',
        isFixed: false,
        duration: 291,
        song: 'Le Cassette - Digital Power',
      },
    ],
  },
  mutations: {
    addRow(state, payload: ListRow) {
      state.rows.push(payload)
    },
  },
})
