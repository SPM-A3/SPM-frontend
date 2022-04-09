import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

/**
 {
      path: '/lexer',
      name: '词法分析器',
      component: () => import('../components/Lexer.vue'),
  },
 */
const routes = [
    {
        path: '',
        redirect: '/book/search'
    },
    {
        path: '/login',
        name: '登录页',
        component: () => import('../components/Login.vue'),
    },
    {
        path: '/register',
        name: '注册页',
        component: () => import('../components/Register.vue'),
    },
    {
        path: '/book',
        redirect: '/book/search'
    },
    {
        path: '/book/search',
        component: () => import('../components/book/BookSearch.vue')
    },
    {
        path: '/book/:id',
        component: () => import('../components/book/BookDetail.vue')
    },
    {
        path: '/user',
        name: '用户页',
        component: () => import('../components/user/UserCenter.vue'),
    },
    {
        path: '/user/borrowing',
        name: '在借图书',
        component: () => import('../components/user/Borrowing.vue')
    },
    {
        path: '/user/borrowing/:id/detail',
        name: '在借图书详情',
        component: () => import('../components/user/BorrowingDetail.vue')
    },
    {
        path: '/user/borrowing/history',
        name: '借阅历史',
        component: () => import('../components/user/BorrowingHistory.vue')
    },
    {
        path: '/user/reservation',
        name: '预约记录',
        component: () => import('../components/user/Reservation.vue')
    },
    {
        path: '/user/reservation/:id',
        name: '预约记录详情',
        component: () => import('../components/user/ReservationDetail.vue')
    },
    {
        path: '/admin',
        component: () => import('../components/admin/Admin.vue')
    },
    {
        path: '/admin/book/add',
        component: () => import('../components/admin/BookAdd.vue')
    },
    {
        path: '/admin/book/:id/edit',
        component: () => import('../components/admin/BookEdit.vue')
    },
    {
        path: '/admin/user/add',
        component: () => import('../components/admin/UserAdd.vue')
    },
    {
        path: '/admin/user/:id/edit',
        component: () => import('../components/admin/UserEdit.vue')
    }
]
 
const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;
  