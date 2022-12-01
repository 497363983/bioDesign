import { createRouter, createWebHashHistory } from 'vue-router'
import { title } from '../utils'
import { useUserStore } from '../store'


const routes = [
    {
        path: '/',
        component: () => import('@/views/index.vue'),
        meta: {
            name: "Home"
        }
    },
    {
        path: '/judge',
        component: () => import('@/views/judge.vue'),
        meta: {
            name: "Judge"
        }
    },
    {
        path: '/upload',
        component: () => import('@/views/upload.vue'),
        meta: {
            name: "Upload"
        }
    },
    {
        path: '/about',
        component: () => import('@/views/about.vue'),
        meta: {
            name: "About"
        }
    },
    {
        path: '/timeline',
        component: () => import('@/views/timeline.vue'),
        meta: {
            name: "Timeline"
        }
    },
    {
        path: '/login',
        component: () => import('@/views/login.vue'),
        meta: {
            name: "Login"
        }
    },
    {
        path: '/register',
        component: () => import('@/views/register.vue'),
        meta: {
            name: "Register"
        }
    }
]

const router = createRouter({
    history: createWebHashHistory('/bioDesign'),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    },
})

router.afterEach((to, from, failure) => {
    if (!failure) {
        title.value = `${to.meta.name} | 生物创新设计大赛`
    }
})

export { router };