import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'
import store from '../store/store'
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
        name: 'Login',
        component: () => import('../components/Login.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        // component: () => import('../components/Register.vue'),
        component: () => import('../components/404.vue')
    },
    {
        path: '/book',
        redirect: '/book/search'
    },
    {
        path: '/book/search',
        name: 'Book search',
        meta: {
            requireLogin: true
        },
        component: () => import('../components/book/BookSearch.vue')
    },
    {
        path: '/book/:id',
        name: 'Book detail',
        meta: {
            requireLogin: true
        },
        component: () => import('../components/book/BookDetail.vue')
    },
    {
        path: '/user',
        name: 'Profile',
        meta: {
            requireLogin: true
        },
        component: () => import('../components/user/UserCenter.vue'),
    },
    {
        path: '/user/borrowing',
        name: 'Borrowing',
        meta: {
            requireLogin: true
        },
        component: () => import('../components/user/Borrowing.vue')
    },
    {
        path: '/user/borrowing/:id/detail',
        name: 'Borrow detail',
        meta: {
            requireLogin: true
        },
        component: () => import('../components/user/BorrowingDetail.vue')
    },
    {
        path: '/user/borrowing/history',
        name: 'Borrow history',
        meta: {
            requireLogin: true
        },
        component: () => import('../components/user/BorrowingHistory.vue')
    },
    {
        path: '/user/reservation',
        name: 'reservation',
        meta: {
            requireLogin: true
        },
        component: () => import('../components/user/Reservation.vue')
    },
    {
        path: '/user/reservation/:id',
        name: 'Reservation detail',
        meta: {
            requireLogin: true
        },
        component: () => import('../components/user/ReservationDetail.vue')
    },
    {
        path: '/user/fine/history',
        name: "Fines",
        meta: {
            requireLogin: true
        },
        component: () => import('../components/user/FineHistory.vue')
    },
    {
        path: '/admin/login',
        name: '管理员登录页',
        meta: {
            requireLogin: true
        },
        component: () => import('../components/AdminLogin.vue'),
    },
    {
        path: '/admin',
        name: "Admin",
        component: () => import('../components/admin/Admin.vue'),
        meta: {
            requireAdmin: true,
            requireLogin: true,
        }
    },
    {
        path: '/admin/book/add',
        name: "Add book",
        component: () => import('../components/admin/BookAdd.vue'),
        meta: {
            requireAdmin: true,
            requireLogin: true,
        }
    },
    {
        path: '/admin/book/addbyapi',
        name: "Add book",
        component: () => import('../components/admin/AddByIsbn.vue'),
        meta: {
            requireAdmin: true,
            requireLogin: true,
        }
    },
    {
        path: '/admin/book/:id/addload',
        name: "Add collection",
        component: () => import('../components/admin/AddLocation.vue'),
        meta: {
            requireAdmin: true,
            requireLogin: true,
        }
    },
    {
        path: '/admin/book/:id/edit',
        name: "Edit book",
        component: () => import('../components/admin/BookEdit.vue'),
        meta: {
            requireAdmin: true,
            requireLogin: true,
        }
    },
    {
        path: '/admin/user/add',
        name: 'Add user',
        component: () => import('../components/admin/UserAdd.vue'),
        meta: {
            requireAdmin: true,
            requireLogin: true,
        }
    },
    {
        path: '/admin/user/:id/edit',
        name: "Edit user",
        component: () => import('../components/admin/UserEdit.vue'),
        meta: {
            requireAdmin: true,
            requireLogin: true,
        }
    },
    {
        path: '/unpermitted',
        name: "Access denied",
        component: () => import('../components/admin/NoPermission.vue')
    },
    {
        path: '/payresult',
        name: 'Payment result',
        meta: {
            requireAdmin: true,
            requireLogin: true,
        },
        component: () => import('../components/user/PayResult.vue')
    },
    {
        path: '*',
        name: "404",
        component: () => import('../components/404.vue')
    }
]

const router = new VueRouter({
    mode: 'hash',
    routes,
})

router.beforeEach((to, from, next) => {
    // console.log(getUserInfo())
    console.log(from.path)
    if(to.meta.requireLogin){
        if(!Cookies.get("access_token")){
            next({path: '/login'})
        }
    }
    if(to.meta.requireAdmin){
        const role = localStorage.getItem("role");
        // const userId = getUserInfo().user_id;
        if(role === "admin"){
            next();
        }else{
            if(from.path === "/unpermitted") return;
            next({path: '/unpermitted'})
        }
    }else{
        next()
    }
  })
  
 
export default router;
