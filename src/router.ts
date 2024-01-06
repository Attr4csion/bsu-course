import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '@/pages/MainPage.vue';
import SurveyPage from '@/pages/SurveyPage.vue';
import SurveyDetail from '@/components/TheSurvey/SurveyDetail.vue';

const routes = [
  {
    path: '/',
    component: MainPage,
    meta: {
      title: 'TestPage',
    },
    children: [
      {
        path: '/',
        component: SurveyPage,
        meta: {
          title: 'SurveyPage',
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
