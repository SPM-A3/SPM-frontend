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
        redirect: '/dashboard'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/Login.vue'),
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        meta: {
            requireLogin: true,
            number: "0",
        },
        component: () => import('../components/user/Dashboard.vue')
    },
    {
        path: '/book',
        redirect: '/book/search'
    },
    {
        path: '/book/search',
        name: 'Book search',
        meta: {
            number: "2",
            requireLogin: true
        },
        component: () => import('../components/book/BookSearch.vue')
    },
    {
        path: '/book/:id',
        name: 'Book detail',
        meta: {
            number: "2",
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
            number: "3",
            requireLogin: true
        },
        component: () => import('../components/user/Borrowing.vue')
    },
    {
        path: '/user/borrowing/:id/detail',
        name: 'Borrow detail',
        meta: {
            number: "3",
            requireLogin: true
        },
        component: () => import('../components/user/BorrowingDetail.vue')
    },
    {
        path: '/user/borrowing/history',
        name: 'Borrow history',
        meta: {
            number: "4",
            requireLogin: true
        },
        component: () => import('../components/user/BorrowingHistory.vue')
    },
    {
        path: '/user/reservation',
        name: 'reservation',
        meta: {
            number: "6",
            requireLogin: true
        },
        component: () => import('../components/user/Reservation.vue')
    },
    {
        path: '/user/reservation/:id',
        name: 'Reservation detail',
        meta: {
            number: "6",
            requireLogin: true
        },
        component: () => import('../components/user/ReservationDetail.vue')
    },
    {
        path: '/user/fine/history',
        name: "Fines",
        meta: {
            number: "5",
            requireLogin: true
        },
        component: () => import('../components/user/FineHistory.vue')
    },
    {
        path: '/admin/login',
        name: '管理员登录页',
        component: () => import('../components/AdminLogin.vue'),
    },
    {
        path: '/admin',
        name: "Admin",
        component: () => import('../components/admin/Admin.vue'),
        meta: {
            number: "1",
            requireAdmin: true,
            requireLogin: true,
        }
    },
    {
        path: '/admin/book/add',
        name: "Add book",
        component: () => import('../components/admin/BookAdd.vue'),
        meta: {
            number: "1",
            requireAdmin: true,
            requireLogin: true,
        }
    },
    {
        path: '/admin/book/addbyapi',
        name: "Add book",
        component: () => import('../components/admin/AddByIsbn.vue'),
        meta: {
            number: "1",
            requireAdmin: true,
            requireLogin: true,
        }
    },
    {
        path: '/admin/book/:id/addload',
        name: "Add collection",
        component: () => import('../components/admin/AddLocation.vue'),
        meta: {
            number: "1",
            requireAdmin: true,
            requireLogin: true,
        }
    },
    {
        path: '/admin/book/:id/edit',
        name: "Edit book",
        component: () => import('../components/admin/BookEdit.vue'),
        meta: {
            number: "1",
            requireAdmin: true,
            requireLogin: true,
        }
    },{
        path: '/admin/book/:id',
        name: "Book info",
        component: () => import('../components/admin/BookDetail.vue'),
        meta: {
            number: "1",
            requireAdmin: true,
            requireLogin: true,
        }
    },
    {
        path: '/admin/book/category/add',
        name: "Add category",
        component: () => import('../components/admin/AddCategory.vue'),
        meta: {
            number: "1",
            requireAdmin: true,
            requireLogin: true,
        }
    },
    {
        path: '/admin/user/add',
        name: 'Add user',
        component: () => import('../components/admin/UserAdd.vue'),
        meta: {
            number: "1",
            requireAdmin: true,
            requireLogin: true,
        }
    },
    {
        path: '/admin/user/:id/edit',
        name: "Edit user",
        component: () => import('../components/admin/UserEdit.vue'),
        meta: {
            number: "1",
            requireAdmin: true,
            requireLogin: true,
        }
    },
    {
        path: '/admin/user/:id/borrowings',
        name: "User borrowings",
        component: () => import('../components/admin/UserBorrowings.vue'),
        meta: {
            number: "1",
            requireAdmin: true,
            requireLogin: true,
        }
    },
    {
        path: '/admin/user/:id/reservations',
        name: "User reservations",
        component: () => import('../components/admin/UserReservations.vue'),
        meta: {
            number: "1",
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
