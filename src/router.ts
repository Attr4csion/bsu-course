import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '@/pages/MainPage.vue';
import SurveyPage from './pages/SurveyPage.vue';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
