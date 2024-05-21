import {defineStore} from "#imports";
import type {ProductInCart} from "~/interfaces/cart.interface";
import type {Ref} from "vue";

export const cartStore = defineStore('store', () => {
    const cart: Array<ProductInCart> = [];

    const searchProduct: Ref<string> = ref('')

    return {
        cart,
        searchProduct
    }
})

