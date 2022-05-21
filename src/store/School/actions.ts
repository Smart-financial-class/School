import { ActionContext, ActionTree } from "vuex";
import { School, SchoolState } from "@/store/School/index.d";
import { RootState } from "@/store/index.d";

export const actions: ActionTree<SchoolState, RootState> = {
    getSchoolInfo(context: ActionContext<SchoolState, RootState>) {
        fetch("http://hjlhjlhjl.xyz:8070/uniFunction/findAll")
            .then((response: Response) => response.json())
            .then((json: Array<School>) => context.commit("FETCH_SCHOOL_INFO", json))
            .catch((err) => {
                console.log(err);
            });
    },
}
