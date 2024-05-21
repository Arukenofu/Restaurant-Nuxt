import {navigateTo} from "#app";
import {cartStore} from "~/store/cart.store";

export default defineNuxtRouteMiddleware((to, from) => {
    useState('routeParam', () => to.params.id);

    if (to.fullPath === '/order' || to.fullPath === '/order/') {
        return navigateTo('/order/salads');
    }

    if (to.fullPath === '/checkout' && cartStore().cart.length === 0) {
        return navigateTo('order/salads');
    }
})