<script setup lang="ts">

const props = defineProps<{
  method: {
    (route?: string): void
  }
}>()
</script>

<template>
  <footer>
    <img src="/story/200th.png" alt="200th anniversary">
    <nuxt-link @click="props.method('/story/root/about')" class="text-uppercase text-main">
      О проекте
    </nuxt-link>
  </footer>
</template>

<style scoped lang="scss">
* {
  color: #FFFFFF;
}

footer {
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  z-index: 2;

  img {
    width: clamp(12vh, 6vh, 15vh)
  }

  a {
    padding-top: 20px;
    font-size: .8rem;
    font-weight: 100;
    letter-spacing: .2vw;
    cursor: pointer;

    &:hover {
      color: #a1907f;
    }
  }
}
</style>