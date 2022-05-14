import {createRouter, createWebHashHistory} from 'vue-router'

import SchoolOverviewPage from "@/view/SchoolOverviewPage/SchoolOverviewPage";
import MainPage from "@/view/MainPage";
import EnrollAndEmploymentPage from "@/view/EnrollAndEmploymentPage";
import CommunityPage from "@/view/CommunityPage";
// import ComparePage from "@/view/DataAnalysisPage/ComparePage";
import ChartsPage from "@/view/SchoolOverviewPage/ChartsPage";
import SchoolPage from "@/view/SchoolOverviewPage/SchoolPage";
import ComparePage from "@/view/SchoolOverviewPage/ComparePage";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            component: MainPage
        },
        {
            redirect: '/overview/school',
            path: '/overview',
            name: 'overview',
            component: SchoolOverviewPage,
            children: [
                {
                    path: 'school',
                    name: 'school',
                    component: SchoolPage
                },
                {
                    path: 'compare',
                    name: 'compare',
                    component: ComparePage
                },
                {
                    path: 'charts',
                    name: 'charts',
                    component: ChartsPage
                }
            ]
        },
        {
            path: '/enroll',
            name: 'enroll',
            component: EnrollAndEmploymentPage
        },
        {
            path: '/community',
            name: 'community',
            component: CommunityPage,
        }
    ]
})
