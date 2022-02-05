import {createRouter, createWebHistory} from "vue-router";
import DashboardLayout from '../layout/DashboardLayout.vue';
import Dashboard from '../pages/Dashboard.vue';
import Mint from '../pages/Mint.vue';
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
                path: '/collection/:chainId/:address',
                name: 'Collection',
                component: () => import('../pages/Collection.vue'),
            },
            {
                path: '/mint',
                name: 'Mint',
                component: Mint
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