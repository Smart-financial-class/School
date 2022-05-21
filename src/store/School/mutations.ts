import { School, SchoolState } from "@/store/School/index.d";
import { MutationTree } from "vuex";

export const mutations: MutationTree<SchoolState> = {
    FETCH_SCHOOL_INFO(state: SchoolState, info: School[]) {
        state.schools = info.filter(
            (value: School) => value.UniName && value.type && value.information.length > 0
        );
    },
}
