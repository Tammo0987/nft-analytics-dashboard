import {createRouter, createWebHistory} from "vue-router";
import DashboardLayout from '../layout/DashboardLayout.vue';
import Dashboard from '../pages/Dashboard.vue';
import NoRoute from '../layout/NoRoute.vue';

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: DashboardLayout,
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: '/:pathMatch(.*)',
                component: NoRoute
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;