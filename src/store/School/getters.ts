import { SchoolState } from "@/store/School/index.d";
import { RootState } from "@/store/index.d";
import { GetterTree } from "vuex";

export const getters: GetterTree<SchoolState, RootState> = {
    courses(state: SchoolState): string[] {
        const course = new Set<string>();
        for (const i of state.schools) {
            for (const j of i.information) {
                course.add(j.courseName);
            }
        }
        return [...course.values()];
    },
    schoolCategory(state: SchoolState): string[] {
        return [...new Set<string>(state.schools.map((value) => value.type))];
    },
    schoolNames(state: SchoolState): { key: number, label: string }[] {
        const data: { key: number, label: string }[] = [];
        state.schools.forEach((value) => {
            data.push({key: value.UniId, label: value.UniName});
        });
        return data;
    },
}
