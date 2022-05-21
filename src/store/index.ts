// store/index.ts

import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './index.d'
import School from './School/index'

const store: StoreOptions<RootState> = {
  modules: {
    School
  }
}
export default new Vuex.Store<RootState>(store)

