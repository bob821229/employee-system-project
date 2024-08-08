import { defineStore } from 'pinia';
import { reactive, computed, inject, ref } from "vue";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoggedIn:false
  }),
  actions: {
    login(userName) {
      this.user = userName;
      localStorage.setItem('user', userName);
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
    },
    checkLogin() {
      const user = localStorage.getItem('user');
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.user
  }
});
