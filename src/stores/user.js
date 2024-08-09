import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);

  const isLoggedIn = computed(() => !!user.value);

  function login(userName) {
    user.value = userName;
    localStorage.setItem('user', userName);
  }

  function logout() {
    user.value = null;
    localStorage.removeItem('user');
  }

  function checkLogin() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user.value = storedUser;
    } else {
      user.value = null;
    }
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
    checkLogin
  };
});
