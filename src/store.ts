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
  bpm?: number
}
export interface State {
  ui: {
    showDetailsFormOpen: boolean
    displaySeconds: boolean
    mode: 'edit' | 'play'
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
      mode: 'edit',
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
        bpm: 0,
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
        bpm: 0,
        song: 'Jessie Frye w/ Timecop1983 - Faded Memory',
      },
      {
        type: 'song',
        isFixed: false,
        isSelected: false,
        duration: 348,
        bpm: 0,
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
        bpm: 0,
        song: 'Michael Oakley - California',
      },
      {
        type: 'song',
        isFixed: false,
        isSelected: false,
        duration: 291,
        bpm: 0,
        song: 'Le Cassette - Digital Power',
      },
    ],
  },
  mutations: {
    ADD_ROW(state, payload: ListRow) {
      state.rows.push(payload)
    },

    DELETE_ROW(
      state,
      payload: {
        index: number
      }
    ) {
      state.rows.splice(payload.index, 1)
    },

    UPDATE_ROW_ATTR(
      state,
      payload: {
        index: number
        attr: string
        value: unknown
      }
    ) {
      // @ts-ignore
      state.rows[payload.index][payload.attr] = payload.value
    },

    SWAP_ROWS(
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
