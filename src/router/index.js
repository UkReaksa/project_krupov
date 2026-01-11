import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// import Dashbord from "../components/home/main_home.vue";
import Dashbord_about from "../components/about/Dashbord_about.vue";
import infomation from "../components/home/All_infomation.vue";
import events from "../components/events/Events_dashbord.vue";
import partner from "../components/partner/Partner_dashbord.vue";
import news from "../components/events/News.vue";
import Partner_infor from "@/components/partner/Partner_infor.vue";
import dashbord_service from "../components/service/dashbord_service.vue";
import service_detail from "@/components/service/service_detail.vue";
import Dashbord_publication from "@/components/publication/Dashbord_publication.vue";
import Dashbord_research from "@/components/Research/Dashbord_research.vue";
import All_publication from "@/components/publication/All_publication.vue";
import test from "@/test.vue";
import Expertise_dashbord from "@/components/expertise/Expertise_dashbord.vue";
import Expertise_detail from "@/components/expertise/Expertise_detail.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dashbord_about",
      name: "dashbord_about",
      component: Dashbord_about,
      // meta: { requiresAuth: true }, // protect this route
    },
    {
      path: "/all_infomation",
      name: "all_infomation",
      component: infomation,
    },
    {
      path: "/events",
      name: "events",
      component: events,
    },
    {
      path: "/event/:id",
      name: "News",
      component: news,
      props: true,
    },

    {
      path: "/partner",
      name: "partner",
      component: partner,
    },
    {
      path: "/partner/:index",
      name: "Partner_infor",
      component: Partner_infor,
      props: true,
    },
    {
      path: "/dashbord_service",
      name: "dashbord_service",
      component: dashbord_service,
    },
    {
      path: "/service/:id",
      name: "service_detail",
      component: service_detail,
      props: true,
    },
    {
      path: "/dadhbord_publication",
      name: "dashbord_publication",
      component: Dashbord_publication,
    },
    {
      path: "/dadhbord_research",
      name: "dadhbord_research",
      component: Dashbord_research,
    },
    {
      path: "/test",
      name: "test",
      component: test,
    },
    {
      path: "/all_publication/:id",
      name: "all_publication",
      component: All_publication,
    },
    {
      path: "/expertise_dashbord",
      name: "expertise_dashbord",
      component: Expertise_dashbord,
    },
    {
      path: "/expertise_detail/:id",
      name: "expertise_detail",
      component: Expertise_detail,
    }
  ],
});

export default router;
