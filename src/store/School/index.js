export default {
    namespaced: true,
    state() {
        return {
            schools: []
        }
    },
    getters: {
        courses(state) {
            let course = new Set();
            for (let i of state.schools) {
                for (let j of i.information) {
                    course.add(j.courseName);
                }
            }
            return [...course.values()];
        },
        schoolCategory(state) {
            return [...new Set(state.schools.map(value => value.type))];
        }
    },
    actions: {
        getSchoolInfo(context) {
            fetch('http://hjlhjlhjl.xyz:8070/uniFunction/findAll')
                .then(response => response.json())
                .then(json => context.commit('FETCH_SCHOOL_INFO', json))
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mutations: {
        FETCH_SCHOOL_INFO(state, info) {
            state.schools = info.filter(value => value.UniName && value.type && value.information.length > 0);
        }
    },
}
