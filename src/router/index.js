import {createRouter, createWebHashHistory} from 'vue-router'

import SchoolOverviewPage from "@/view/SchoolOverviewPage";
import MajorIntroducePage from "@/view/MajorIntroducePage";
import EnrollAndEmploymentPage from "@/view/EnrollAndEmploymentPage";
import DataAnalysisPage from "@/view/DataAnalysisPage/DataAnalysisPage";
import CommunityPage from "@/view/CommunityPage";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            alias: '/',
            path: '/overview',
            name: 'overview',
            component: SchoolOverviewPage
        },
        {
            path: '/introduce',
            name: 'introduce',
            component: MajorIntroducePage
        },
        {
            path: '/enroll',
            name: 'enroll',
            component: EnrollAndEmploymentPage
        },
        {
            path: '/data',
            name: 'data',
            component: DataAnalysisPage,
            children: []
        },
        {
            path: '/community',
            name: 'community',
            component: CommunityPage,
        }
    ]
})
