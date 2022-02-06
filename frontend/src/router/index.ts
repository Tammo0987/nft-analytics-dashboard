import {createRouter, createWebHistory} from "vue-router";
import DashboardLayout from '../layout/DashboardLayout.vue';
import Market from '../pages/Market.vue';
import NoRoute from '../layout/NoRoute.vue';
import checkIfUserIsSignedIn from "./signin-guard";

const routes = [
    {
        path: '/',
        redirect: '/market',
        component: DashboardLayout,
        children: [
            {
                path: '/market',
                name: 'Market',
                component: Market
            },
            {
                path: '/collection/:chainId/:address',
                name: 'Collection',
                component: () => import('../pages/Collection.vue'),
            },
            {
                path: '/manager',
                name: 'Wallet',
                component: () => import('../pages/Manager.vue'),
                beforeEnter: checkIfUserIsSignedIn,
            },
            {
                path: '/manager/new-collection',
                name: 'Create Collection',
                component: () => import('../pages/CreateCollection.vue'),
                beforeEnter: checkIfUserIsSignedIn
            },
            {
                path: '/manager/collection/:address',
                name: 'Edit Collection',
                component: () => import('../pages/ManageCollection.vue'),
                beforeEnter: checkIfUserIsSignedIn
            },
            {
                path: '/manager/collection/:address/mint',
                name: 'Mint NFT',
                component: () => import('../pages/Mint.vue'),
                beforeEnter: checkIfUserIsSignedIn
            },
            {
                path: '/signin',
                name: 'Sign In',
                component: () => import('../pages/SignIn.vue'),
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