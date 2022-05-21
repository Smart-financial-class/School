import { createRouter, createWebHashHistory } from "vue-router";

import SchoolOverviewPage from "@/view/SchoolOverviewPage/SchoolOverviewPage.vue";
import MainPage from "@/view/MainPage.vue";
import EnrollAndEmploymentPage from "@/view/EnrollAndEmploymentPage.vue";
import CommunityPage from "@/view/CommunityPage.vue";
import ChartsPage from "@/view/SchoolOverviewPage/ChartsPage.vue";
import SchoolPage from "@/view/SchoolOverviewPage/SchoolPage.vue";
import ComparePage from "@/view/SchoolOverviewPage/ComparePage.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: MainPage,
    },
    {
      redirect: "/overview/school",
      path: "/overview",
      name: "overview",
      component: SchoolOverviewPage,
      children: [
        {
          path: "school",
          name: "school",
          component: SchoolPage,
        },
        {
          path: "compare",
          name: "compare",
          component: ComparePage,
        },
        {
          path: "charts",
          name: "charts",
          component: ChartsPage,
        },
      ],
    },
    {
      path: "/enroll",
      name: "enroll",
      component: EnrollAndEmploymentPage,
    },
    {
      path: "/community",
      name: "community",
      component: CommunityPage,
    },
  ],
});
