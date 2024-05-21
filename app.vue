<script setup lang="ts">
const config = useRuntimeConfig();

useHead({
  link: [
    {
      rel: 'icon',
      href: 'icon.ico',
      type: 'image/png',
      sizes: '32x32'
    },
    {
      rel: 'canonical',
      href: `localhost:${config.public.apiBase}`
    }
  ],
  meta: [
    {
      name: 'language',
      content: 'ru, kz'
    },
    {
      name: 'og:title',
      content: 'Food Court'
    },
    {
      name: 'og:description',
      content: 'Ваша любимая еда!'
    }
  ]
})

useSeoMeta({
  description: 'Food Court - онлайн ресторан самой вкусной еды разного происхождения! Заказывайте у нас разную,' +
      'вкусную еду по дешевой цене!',
  robots: "index, follow",
})

</script>

<template>
  <nuxt-page />
</template>

<style lang="scss" src="styles/global.scss" />