import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Logout from '../views/auth/Logout.vue'
import Home from '../views/Home.vue'
import CodeList from '../views/CodeList.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: '/code-list',
        name: 'codeList',
        component: CodeList,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        props: true,
        meta: {
            requiresVisitor: true
        },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            requiresVisitor: true
        },
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout,
        meta: { requiresAuth: true }
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters['user/loggedIn']) {
            next({
                path: '/login',
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters['user/loggedIn']) {
            next({
                path: '/',
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})

export default router