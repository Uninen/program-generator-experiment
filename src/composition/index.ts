import { Store } from 'vuex'
import { State } from '../store'

export const setRowIsSelected = (
  store: Store<State>,
  index: number,
  value: boolean
) => {
  store.commit('SET_ROW_ATTR', {
    index,
    attr: 'isSelected',
    value,
  })
}
