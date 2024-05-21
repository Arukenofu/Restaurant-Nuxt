<script setup lang="ts">
import type {Product} from "~/interfaces/food.interface";
import Navigation from "~/components/Navigation.vue";

useHead({
  title: 'Food Court - Самая вкусная еда!'
})

const products: Array<Product> = [
  {
    id: 1,
    name: 'Сендвич',
    image: 'https://fetaxa.ru/storage/images/9f8b9d232ff6da99356ad652d33d34dd.jpg',
    price: 790,
    weight: null
  },
  {
    id: 2,
    name: 'Пицца',
    image: 'https://avatars.dzeninfra.ru/get-zen_doc/1780598/pub_5fcf913be78619267ece23ab_5fcf9153a5e6844f49612f81/scale_1200',
    price: 1870,
    weight: null
  },
  {
    id: 3,
    name: 'Бургер',
    image: 'https://panda-rolls.ru/files/products/5U5K0197.800x400.jpg?2ef3132a4f8a73baafa7f10940837432',
    price: 1390,
    weight: null
  },
  {
    id: 4,
    name: 'Цыплёнок',
    image: 'https://ferma-m2.ru/images/shop/recipe_image/crop_5.jpg',
    price: 2390,
    weight: null
  }
];

const cookie = useCookie<string>('code');
</script>

<template>
  <main>
    <Navigation />
    <section>
      <h1>
        Аутлет Вкусной Пищи
      </h1>
      <div class="layout">
        Тысяча заказов и 4.8 звёзд рейтинга!
      </div>
      <button @click="$router.push('/order')">
        Заказать
      </button>
    </section>
    <footer>
      <div class="food" v-for="product in products" :key="product.id">
        <div class="image" :style="`background-image: url('${product.image}')`" />
        <div class="text">
          <h6>{{product.name}}</h6>
          <span>{{product.price}} Тг</span>
          <button>
            Заказать
          </button>
        </div>
      </div>
    </footer>

    <div class="message-cookie" v-if="cookie">
      <p>Код вашего последнего заказа:</p>
      <span>{{cookie}}</span>
    </div>
  </main>

</template>

<style scoped lang="scss">
:global(body) {
  background-color: #F4F4F4;
}

main {
  height: 100vh;
  background: url("/banner.jpeg") lightgray 50% / cover no-repeat;
  position: relative;

  section {
    padding-left: 8%;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    color: #F4F4F4;
    font-family: "Roboto", sans-serif;

    h1 {
      font-size: 4rem;
      max-width: 90%;
      font-weight: 700;
      margin-bottom: 12px;
    }

    .layout {
      font-size: 15px;
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(11px);
      width: 300px;
      text-align: center;
      padding: 10px 0;
      border-radius: 25px;
      margin-bottom: 12px;
      font-weight: 500;
    }

    button {
      padding: 12px 26px;
      background-color: #66913E;
      color: #F4F4F4;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      font-family: 'Raleway', sans-serif;
      font-weight: 400;

      &:active {
        opacity: .9;
      }
    }
  }

  footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    bottom: 0;
    height: 18%;
    width: 100vw;
    background-color: rgba(73, 73, 73, 0.34);
    backdrop-filter: blur(10px);
    border-top-left-radius: 40px;
    border-bottom-right-radius: 40px;
    padding: 60px;
    color: #F4F4F4;

    .food {
      display: flex;
      gap: 15px;

      .image {
        aspect-ratio: 1/1;
        height: 80px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;

        h6 {
          font-size: 1.2rem;
          font-weight: 500;
          font-family: "Roboto", sans-serif;
        }
        span {
          font-size: .9rem;
          font-weight: 400;
          margin-bottom: 8px;
          font-family: "Roboto", sans-serif;
        }
        button {
          border-radius: 7px;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(9px);
          color: #F4F4F4;
          padding: 6px 20px;
          border: none;
          cursor: pointer;

          &:active {
            opacity: .9;
          }
        }
      }
    }
  }

  .message-cookie {
    position: absolute;
    top: 15%;
    right: -4px;
    color: #FFFFFF;
    width: 300px;
    background-color: #1e1e1e;
    height: 80px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
    outline: 3px solid #2fd900;
    outline-offset: -4px;

    p {
      font-size: 1rem;
      font-weight: 600;
    }

    span {
      font-size: .9rem;
    }
  }
}

@media screen and (max-width: 900px) {
  main footer {
    display: none;
  }
}
</style>