export interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    weight: number | null;

    isDrink?: boolean
}

