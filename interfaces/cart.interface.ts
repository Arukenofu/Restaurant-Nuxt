import type {Product} from "~/interfaces/food.interface";

export interface ProductInCart extends Product {
    count: number
}