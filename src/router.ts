import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '@/pages/MainPage.vue';
import SurveyPage from '@/pages/SurveyPage.vue';
import SurveyDetail from '@/components/TheSurvey/SurveyDetail.vue';
import CreatingPage from './pages/CreatingPage.vue';
import ProfilePage from './pages/ProfilePage.vue';
const routes = [
  {
    path: '/',
    component: MainPage,
    meta: {
      title: 'MainPage',
    },
    children: [
      {
        path: '/',
        component: SurveyPage,
        meta: {
          title: 'SurveyPage',
        },
      },
      {
        path: '/creating',
        component: CreatingPage,
        meta: {
          title: 'CreatingPage',
        },
      },
      {
        path: '/me',
        component: ProfilePage,
        meta: {
          title: 'ProfilePage',
        },
      },
    ],
  },
  {
    path: '/survey/:id',
    component: SurveyDetail,
    meta: {
      title: 'SurveyDetail',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
