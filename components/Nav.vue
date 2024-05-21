<script setup lang="ts">
import type {route} from "~/interfaces/route";

const router = useRouter()

const routes = defineModel<{
  routes: route
}>('routes')

const color = defineModel<string>('color')
</script>

<template>
  <nav>
    <p style="color: #FFFFFF" class="navigation center-x text-main text-uppercase">
      <nuxt-link v-for="route in routes" @click="route.func" :style="`color: ${color}`" class="text-transition">{{route.name}}</nuxt-link>
    </p>
  </nav>
</template>

<style scoped lang="scss">
* {
  color: #FFFFFF;
}

.navigation {
  margin-top: 35px;
  letter-spacing: .2vw;
  display: flex;
  gap: 9px;
  z-index: 3;

  a {
    text-decoration: none;
    font-size: .9rem;

    &:hover {
      color: #a1907f;
    }

    &:last-child {

      &:hover {

      }
    }
  }
}

@media screen and (max-width: 800px) {
  .navigation {
    font-size: .95em;
  }
}
</style>