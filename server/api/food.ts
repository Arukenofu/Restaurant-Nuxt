import db from "~/db/db";
import {Product} from "~/interfaces/food.interface";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const {rows} = await db.query<Product>('SELECT * FROM foods WHERE type = $1', [body.food])

    console.log(body.food)

    return rows
})