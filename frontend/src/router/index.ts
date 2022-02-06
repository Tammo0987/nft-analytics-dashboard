import {createRouter, createWebHistory} from "vue-router";
import DashboardLayout from '../layout/DashboardLayout.vue';
import Dashboard from '../pages/Dashboard.vue';
import NoRoute from '../layout/NoRoute.vue';
import checkIfUserIsSignedIn from "./signin-guard";

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
                path: '/wallet',
                name: 'Wallet',
                component: () => import('../pages/Wallet.vue'),
                beforeEnter: checkIfUserIsSignedIn,
            },
            {
                path: '/wallet/new-collection',
                name: 'Create Collection',
                component: () => import('../pages/CreateCollection.vue'),
                beforeEnter: checkIfUserIsSignedIn
            },
            {
                path: '/wallet/collection/:address',
                name: 'Edit Collection',
                component: () => import('../pages/EditCollection.vue'),
                beforeEnter: checkIfUserIsSignedIn
            },
            {
                path: '/wallet/collection/:address/mint',
                name: 'Mint NFT',
                component: () => import('../pages/Mint.vue'),
                beforeEnter: checkIfUserIsSignedIn
            },
            {
                path: '/signin',
                name: 'Sign In',
                component: () => import('../pages/WalletSignin.vue'),
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