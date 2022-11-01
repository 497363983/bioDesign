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
    }
]

export const router = createRouter({
    history: createWebHistory('/bioDesign'),
    routes
})