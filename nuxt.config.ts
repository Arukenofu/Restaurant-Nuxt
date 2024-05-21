// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/google-fonts',
        '@pinia/nuxt',
        '@vueuse/nuxt'
    ],
    alias: {
        pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs'
    },
    googleFonts: {
        preload: true,
        families: {
            roboto: true,
            Condensed: '200..700',
            Raleway: '200..700',
            Montserrat: '200..700',
            'Roboto+Slab': '200..700',
            Roboto: '200..700'
        },
        download: true
    },
    runtimeConfig: {
        apiSecret: process.env.TOKEN,
        public: {
            apiBase: process.env.BASE_URL
        }
    }
})
