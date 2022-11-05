import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        component: () => import('@/views/index.vue')
    },
    {
        path: '/judge',
        component: () => import('@/views/judge.vue')
    },
    {
        path: '/upload',
        component: () => import('@/views/upload.vue')
    },
    {
        path: '/about',
        component: () => import('@/views/about.vue')
    },
    {
        path: '/timeline',
        component: () => import('@/views/timeline.vue')
    },
    {
        path: '/login',
        component: () => import('@/views/login.vue'),
        beforeEnter: (to, from, next) => {
            next()
        }
    },
    {
        path: '/register',
        component: () => import('@/views/register.vue')
    }
]

export const router = createRouter({
    history: createWebHistory('/bioDesign'),
    routes
})