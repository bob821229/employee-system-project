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
// router.beforeEach((to, from, next) => {
//   const employeeStore = getEmployeeStore()
//   const { role } = employeeStore.getUserInfo

//   if (to.name !== 'login' && role === '0') {
//     next({ name: 'login' })
//   } else {
//     next()
//   }
// })
router.beforeEach((to, from, next) => {
  const employeeStore = getEmployeeStore()
  const { role } = employeeStore.getUserInfo

  // 定義不同頁面的權限要求
  const pagePermissions = {
    login: ['0', '1', '2', '3'], // 所有角色都可以訪問登入頁面
    employeeList: ['2', '3'], // 僅限主管和人事可以訪問員工列表
    form: ['1', '2', '3'], // 僅限員工、主管和人事可以訪問表單頁面
    about: ['1', '2', '3'], // 僅限員工、主管和人事可以訪問表單頁面
    resignedEmployeeList: ['2', '3'], // 僅限主管和人事可以訪問離職員工列表
    dataUpdateLogList: ['2', '3'] // 僅限主管和人事可以訪問數據更新日誌
  }

  // 檢查當前路由是否需要權限檢查
  if (pagePermissions[to.name]) {
    // 檢查用戶角色是否在允許的角色列表中
    if (!pagePermissions[to.name].includes(role)) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    // 如果沒有定義權限要求，則直接通過
    next()
  }
})

export default router
