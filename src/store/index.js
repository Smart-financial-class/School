import {createStore} from 'vuex';
import testData from '@/assets/test-data.json'


export default createStore({
    state() {
        return {
            schools: testData
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
})
