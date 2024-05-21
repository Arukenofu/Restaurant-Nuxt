<script setup lang="ts">
import {cartStore} from "~/store/cart.store";
import type {ProductInCart} from "~/interfaces/cart.interface";

useHead({
  link: [
    {
      rel: 'icon',
      href: 'http://localhost:3000/icon.ico',
      type: 'image/png',
      sizes: '32x32'
    }
  ],
  title: 'Заказать еду'
})

const store = cartStore();

const inputFocus = () => {
  document.getElementById('input')!.focus()
}

interface FoodTypes {
  id: number,
  type: string,
  ru_name: string
}

const {data: types} = await useFetch<FoodTypes>('/api/foodtypes');

const decrement = (order: ProductInCart, index: number) => {
  order.count--

  if (order.count === 0) {
    store.cart.splice(index, 1)
  }
}

const totalAmount = computed(() => {
  let amount: number = 0;

  for (let i = 0; i < store.cart.length; i++) {
    amount += store.cart[i].count
  }

  return amount;
})

const totalPrice = computed<number>(() => {
  let price: number = 0;

  for (let i = 0; i < store.cart.length; i++) {
    price += store.cart[i].price * store.cart[i].count;
  }

  return price;
})

const isMobile = ref<boolean>(false);
const isLoaded = ref<boolean>(false);

onMounted(() => {
  const isWindow = window.innerWidth <= 768;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;

  if (isTouchDevice && isWindow) {
    isMobile.value = true;
  }

  isLoaded.value = true;
})
</script>

<template>
  <order-mobile
      :totalAmount="totalAmount"
      :totalPrice="totalPrice"
      v-if="isMobile && isLoaded"
  />

  <div v-else-if="isLoaded" class="content">
    <div class="layout">
      <header>
        <img src="/logotype.png" alt="logo" @click="$router.push('/')">
        <div class="logo-text" @click="$router.push('/')">
          <h1>
            Food Court
          </h1>
          <span>
            Since 1997
          </span>
        </div>
        <div class="search-border" @click="inputFocus()">
          <input type="text" id="input" placeholder="Поиск..." v-model="store.searchProduct">
        </div>
      </header>
      <div class="choose">
        <aside>
          <h5>
            Меню
          </h5>
          <nuxt-link
              v-for="type in types"
              :key="type.id"
              :to="`/order/${type.type}`"
          >
            <span>
              {{type.ru_name}}
            </span>
          </nuxt-link>
        </aside>
        <nuxt-page />
      </div>
    </div>
    <div class="cart">
      <div class="head">
        <img src="/menu-icon.png" alt="menu">
        <div class="text">
          <span>
          Меню выбора
        </span>
          <p>
            Ваши заказы
          </p>
        </div>
      </div>
      <div class="orders-wrap">
        <transition-group name="v" v-if="store.cart.length">
          <div class="order" v-for="(order, index) in store.cart" :key="order.id">
            <div class="left-field" />
            <div class="image">
              <img :src="order.image" :alt="order.name">
            </div>
            <div class="text">
            <span class="name">
              {{order.name}}
            </span>
              <p class="price">
                {{order.price * order.count}}₸
              </p>
            </div>

            <div class="counter">
              <div class="decrement" @click="decrement(order, index)">
                -
              </div>
              <span>
              {{order.count}}
            </span>
              <div class="increment" @click="order.count++">
                +
              </div>
            </div>
          </div>
        </transition-group>
        <div class="empty-cart" v-else>
          Ваша корзина пока пуста :(
        </div>
      </div>
      <div class="buy">
        <div class="buy-layout" :class="store.cart.length === 0 && 'disabled'">
          <div class="buy-info">
            <p>{{totalAmount}} выбрано</p>
            <span>
              {{totalPrice}}₸
            </span>
          </div>
          <button @click="$router.push('/checkout')" :disabled="store.cart.length === 0">
            Заказать
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.content {
  display: flex;
  height: 100vh;
  overflow: hidden;

  .layout {
    flex: 75;

    header {
      width: 100%;
      height: 100px;
      background-color: #FFF;
      border-bottom: #d3d3d3 2px solid;
      display: flex;
      align-items: center;
      padding: 0 30px;

      img {
        width: 70px;
        cursor: pointer;
      }

      .logo-text {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        cursor: pointer;

        h1 {
          font-weight: 700;
        }
        span {
          font-size: 1ren;
        }
      }

      .search-border {
        display: flex;
        align-items: center;
        margin-left: auto;
        height: 60%;
        border: 1px solid rgba(0, 0, 0, 0.26);
        border-radius: 24px;
        width: 310px;
        cursor: text;

        input {
          margin-left: 20px;
          border: none;
          outline: none;
          font-size: 1rem;
        }
      }
    }

    .choose {
      display: flex;
      height: 100%;

      aside {
        width: 300px;
        background-color: #FFF;
        border-right: #d3d3d3 2px solid;
        padding-top: 30px;
        padding-left: 40px;
        padding-right: 40px;
        height: calc(100% - 100px);
        position: sticky;
        top: 0;
        display: flex;
        flex-direction: column;
        gap: 3px;

        a {
          text-decoration: none;
          padding: 10px;
          color: #21201F;
          border-radius: 3px;
          transition: background-color .2s ease-in-out;

          &:hover {
            background-color: #ececec;
          }
        }
        .router-link-active, .router-link-exact-active {
          background-color: #181818;
          color: #F4F4F4;
          transition: background-color .2s ease-in-out;

          &:hover {
            background-color: #282828;
          }
        }

        h5 {
          font-size: 1.7rem;
          margin-bottom: 20px;
        }
      }
    }
  }

  .cart {
    flex: 25;
    min-height: 100%;
    background-color: rgba(255, 255, 255, 0.90);
    border-left: #d3d3d3 2px solid;

    .head {
      height: 100px;
      width: 95%;
      margin: 0 auto;
      border-bottom: 2px solid rgba(33, 32, 31, 0.35);
      display: flex;
      align-items: center;

      img {
        width: 48px;
        height: 48px;
        margin-left: 14px;
      }

      .text {
        margin-left: 9px;

        span {
          font-size: 2rem;
          font-weight: 700;
          color: #21201F;
        }

        p {
          font-size: .8rem;
          color: #4f4d49;
        }
      }
    }

    .orders-wrap {
      display: flex;
      flex-direction: column;
      width: 95%;
      margin: 18px auto 0 auto;
      gap: 9px;
      height: calc(100% - 220px);
      overflow: auto;

      .order {
        height: 80px;
        width: 100%;
        //border: 2px solid #21201F;
        border-radius: 6px;
        display: flex;
        align-items: center;
        position: relative;

        .left-field {
          height: 100%;
          width: 6px;
          background-color: #cbcbcb;
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }

        &:hover {
          background-color: #eaeaea;
        }

        .image {
          height: 100%;
          aspect-ratio: 1/1;
          margin-left: 6px  ;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        .text {
          margin-left: 6px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: #21201F;
          width: 130px;

          .name {
            font-weight: 600;
            font-size: 1rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .price {
            font-size: .8rem;
            font-weight: 300;
          }
        }

        .counter {
          display: flex;
          width: 100px;
          position: absolute;
          right: 10px;
          user-select: none;

          .increment, .decrement {
            display: grid;
            place-items: center;
            color: #F4F4F4;
            background-color: #21201F;
            height: 100%;
            aspect-ratio: 1/1;
            cursor: pointer;
          }

          .decrement {
            width: 33%;
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
          }

          .increment {
            width: 33%;
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
          }

          span {
            display: grid;
            place-items: center;
            width: 33%;
            cursor: default;
          }
        }
      }
    }

    .empty-cart {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .buy {
      height: 100px;
      width: 95%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      color: #F4F4F4;

      .buy-layout {
        width: 100%;
        height: 80px;
        background-color: #21201F;
        border-radius: 15px;
        padding: 12px;
        display: flex;
        align-items: center;
        filter: none;
        transition: filter .5s ease;

        .buy-info {
          margin-left: 9px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
          font-family: "Roboto", sans-serif;
          gap: 3px;

          p {
            font-size: .9rem;
            color: #b9b9b9;
            font-weight: 600;
          }

          span {
            font-weight: 700;
            font-size: 1.4rem;
          }
        }

        button {
          margin-left: auto;
          margin-right: 20px;
          height: 75%;
          width: 100px;
          border: none;
          border-radius: 9px;
          font-weight: 700;
          font-family: "Roboto", sans-serif;
          background-color: #F4F4F4;
          color: #21201F;
          cursor: pointer;

          &:active {
            opacity: .9;
          }

          &:disabled {
            cursor: default;

            &:active {
              opacity: 1;
            }
          }
        }
      }

      .disabled {
        filter: opacity(.7);
      }
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>