<script setup lang="ts">
import {cartStore} from "~/store/cart.store";
import type {ProductInCart} from "~/interfaces/cart.interface";

const inputFocus = () => {
  document.getElementById('input')!.focus()
}

const store = cartStore();

const content = ref<HTMLElement>()
const {direction, isSwiping} = useSwipe(content)

const decrement = (order: ProductInCart, index: number) => {
  order.count--

  if (order.count === 0) {
    store.cart.splice(index, 1)
  }
}

const directionCache = ref<string>('')

watch(isSwiping, () => {
  directionCache.value = direction.value
})

const props = defineProps<{
  totalAmount: number,
  totalPrice: number
}>()
</script>

<template>
  <header>
    <img src="/logotype.png" alt="food court">
    <h1 @click="$router.push('/')">Food Court</h1>

    <div class="search-border" @click="inputFocus()">
      <input type="text" id="input" placeholder="Поиск..." v-model="store.searchProduct">
    </div>
  </header>
  <div class="content" ref="content">
    <transition name="left-scroll">
      <aside class="routes" v-if="directionCache === 'right'">
        <h5>
          Меню <span @click="directionCache = ''">Выйти</span>
        </h5>
        <nuxt-link to="/order/salads">
            <span>
              Салаты
            </span>
        </nuxt-link>
        <nuxt-link to="/order/snacks">
            <span>
              Закуски
            </span>
        </nuxt-link>
        <nuxt-link to="/order/courses">
            <span>
              Первое и Второе
            </span>
        </nuxt-link>
        <nuxt-link to="/order/kebabs">
            <span>
              Шашлыки
            </span>
        </nuxt-link>
        <nuxt-link to="/order/pizzas">
            <span>
              Пицца
            </span>
        </nuxt-link>
        <nuxt-link to="/order/drinks">
            <span>
              Напитки
            </span>
        </nuxt-link>
        <nuxt-link to="/order/doners">
            <span>
              Донер
            </span>
        </nuxt-link>
      </aside>
    </transition>
    <transition name="right-scroll">
      <aside class="cart" v-if="directionCache === 'left'">
        <h5>
          Корзинка - <span @click="directionCache = ''">Выйти</span>
        </h5>

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
      </aside>
    </transition>
    <nuxt-page />
  </div>


</template>

<style scoped lang="scss">
  header {
    width: 100dvw;
    border-bottom: 2px solid #d3d3d3;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 20px;

    img {
      width: 48px;
    }

    h1 {
      margin-left: 6px;
      font-size: 1.2rem;
    }

    .search-border {
      margin-left: auto;
      height: 47px;
      border: 1px solid rgba(0, 0, 0, 0.26);
      display: flex;
      align-items: center;
      border-radius: 6px;
      background-color: #FFFFFF;
      padding-left: 12px;
      cursor: text;

      input {
        border: none;
        outline: none;
        font-size: 1rem;
      }
    }
  }

  .content {
    height: calc(100dvh - 80px);
    position: relative;

    .routes {
      z-index: 2;
      position: fixed;
      background-color: #FFFFFF;
      width: 300px;
      height: calc(100dvh);
      border-right: #d3d3d3 2px solid;
      padding-top: 30px;
      padding-left: 20px;
      padding-right: 20px;
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
        margin-bottom: 15px;

        span {
          font-size: 1rem;
          cursor: pointer;
        }
      }
    }

    .cart {
      z-index: 2;
      position: fixed;
      background-color: #FFFFFF;
      width: 100%;
      height: calc(100dvh);
      border-left: #d3d3d3 2px solid;
      padding-top: 30px;
      padding-left: 20px;
      padding-right: 20px;
      top: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      gap: 3px;
      overflow: auto;

      h5 {
        text-align: center;
        font-size: 1.3rem;
        margin-bottom: 15px;

        span {
          color: #148103;
          cursor: pointer;
        }
      }

      .empty-cart {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .buy {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 100px;
        width: 100%;
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

      .order {
        height: 70px;
        width: 100%;
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
          height: 80%;
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
            font-size: .8rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .price {
            font-size: .7rem;
            font-weight: 600;
          }
        }

        .counter {
          display: flex;
          width: 80px;
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
            font-size: .8rem;
          }
        }
      }

    }
  }

  .left-scroll-enter-active,
  .left-scroll-leave-active {
    transition: transform 0.5s ease;
  }

  .left-scroll-enter-from {
    transform: translateX(-300px);
  }
  .left-scroll-enter-to {
    transform: translateX(0px);
  }
  .left-scroll-leave-to {
    transform: translateX(0px);
  }
  .left-scroll-leave-to {
    transform: translateX(-300px);
  }

  .right-scroll-enter-active,
  .right-scroll-leave-active {
    transition: transform 0.5s ease;
  }

  .right-scroll-enter-from {
    transform: translateX(100%);
  }
  .right-scroll-enter-to {
    transform: translateX(0%);
  }
  .right-scroll-leave-from {
    transform: translateX(0%);
  }
  .right-scroll-leave-to {
    transform: translateX(100%);
  }

</style>