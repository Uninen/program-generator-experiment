import { Store } from 'vuex'
import { State } from '../store'

export const setRowIsSelected = (
  store: Store<State>,
  index: number,
  value: boolean
) => {
  store.commit('UPDATE_ROW_ATTR', {
    index,
    attr: 'isSelected',
    value,
  })
}
