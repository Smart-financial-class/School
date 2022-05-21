// store/index.ts

import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './index.d'
import SchoolState from './School/index'

const store: StoreOptions<RootState> = {
  modules: {
    SchoolState
  }
}
export default new Vuex.Store<RootState>(store)

