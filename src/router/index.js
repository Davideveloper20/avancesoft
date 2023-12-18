import { createRouter, createWebHistory } from "@ionic/vue-router";
import HomePage from "../views/HomePage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import HistoryDoctorPage from "../views/HistoryDoctorPage.vue";
import HistoryPatientPage from "../views/HistoryPatientPage.vue";
import DashboardPage from "../views/DashboardPage.vue";
import DashboardClientPage from "../views/DashboardClientPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },

  {
    path: "/dashboard",
    name: "DashboardPage",

    component: DashboardPage,
    children: [
      {
        path: "",
        redirect: "/dashboard/history",
      },
      {
        path: "history",
        component: () => import("@/views/HistoryDoctorPage.vue"),
      },
      {
        path: "profile",

        component: () => import("@/views/ProfilePage.vue"),
      },
    ],
  },

  {
    path: "/dashboard-client",
    name: "DashboardClientPage",

    component: DashboardClientPage,
    children: [
      {
        path: "",
        redirect: "/dashboard-client/history-patient",
      },
      {
        path: "history-patient",
        component: () => import("@/views/HistoryPatientPage.vue"),
      },
      {
        path: "profile",

        component: () => import("@/views/ProfilePage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
