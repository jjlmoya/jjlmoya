import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            menu: true,
        },
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/about',
        name: 'about',
        meta: {
            menu: true,
        },
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/projects',
        name: 'projects',
        meta: {
            menu: true,
        },
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/blog',
        name: 'blog',
        meta: {
            menu: true,
        },
        component: () => import('@/views/Home.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
