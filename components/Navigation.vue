<script setup lang="ts">

</script>

<template>
  <header>
    <img src="/logotype.png" alt="logo">

    <ul>
      <li>
        <nuxt-link to="/">
          Главная
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/order/salads">
          Заказать
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/about">
          Вакансии
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/story/root">
          История
        </nuxt-link>
      </li>
    </ul>

    <div class="right-controls">
      <div class="avatar" />
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  width: 100vw;
  max-width: 100vw;
  display: flex;
  padding: 10px 5%;
  align-items: center;
  color: #FFFFFF;

  img {
    aspect-ratio: 1/1;
    width: 55px;
    cursor: pointer;
  }

  ul {
    margin-left: 5%;
    display: flex;
    gap: 50px;
    list-style: none;

    li {
      color: rgb(255, 255, 255);
      font-size: 1rem;
      text-shadow: 0 0 5px rgb(0, 0, 0);
      cursor: pointer;

      a {
        color: #F4F4F4;
        text-decoration: none;
      }

      .router-link-active, .router-link-exact-active {
        color: #afff67;
      }
    }
  }

  .right-controls {
    margin-left: auto;

    .avatar {
      cursor: pointer;
      height: 25px;
      aspect-ratio: 1/1;
      border-radius: 50%;
      background-image: url("/no-avatar.png");
      background-size: cover;
      background-position: center;
    }
  }
}
</style>