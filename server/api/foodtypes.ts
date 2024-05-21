import db from "~/db/db";

export default defineEventHandler(async () => {

    const {rows} = await db.query('SELECT * FROM food_types')

    return rows

})