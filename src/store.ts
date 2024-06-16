import { defineStore } from 'pinia';
import api from './axios';

export const useApiStore = defineStore('api', {
  state: () => ({
    token: '',
    me: {},
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },

    async getMe() {
      const { data } = await api.get('backend/me/');
      this.me = data;
    },
  },
});
