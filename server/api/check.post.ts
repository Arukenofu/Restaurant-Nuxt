import codeGenerator from "~/utils/codeGenerator";

export default defineEventHandler(async (event) => {
    const {delivery, price, deliveryPrice, phone, adress, commentary} = await readBody(event);

    const code = codeGenerator(9).toUpperCase();

    setCookie(event, 'code', code, {
        expires: new Date(new Date().getTime() + 15 * 60000)
    });

    return {
        delivery,
        price,
        deliveryPrice,
        phone,
        adress,
        commentary,
        code
    }
})