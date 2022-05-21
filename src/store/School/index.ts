import { School, SchoolState } from './index.d';
import { actions } from "@/store/School/actions";
import { getters } from '@/store/School/getters';
import { mutations } from "@/store/School/mutations";


export const state: SchoolState = {
    schools: new Array<School>()
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
