import { createRouter, createWebHistory } from 'vue-router'
import { useEmployeeStore } from '../stores/employee';

// import EmployeeList from '../views/EmployeeList.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/form',
      name: 'form',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FormView.vue')
    },
    {
      path: '/employeeList',
      name: 'employeeList',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EmployeeList.vue')
    },
    {
      path: '/resignedEmployeeList',
      name: 'resignedEmployeeList',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ResignedEmployeeList.vue')
    },
    {
      path: '/dataUpdateLogList',
      name: 'dataUpdateLogList',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DataUpdateLogList.vue')
    }
  ]
})

const getEmployeeStore = ()=>{
  return useEmployeeStore();
 }
// 路由守衛
router.beforeEach((to, from, next) => {
  const employeeStore = getEmployeeStore()
  const { role } = employeeStore.getUserInfo

  if (to.name !== 'login' && role === '0') {
    next({ name: 'login' })
  } else {
    next()
  }
})


export default router
