<script setup lang="ts">
import type {Product} from "~/interfaces/food.interface";
import {cartStore} from "~/store/cart.store";


const paramID = ref();

const {data: foods, error} = await useFetch('/api/food', {
  method: 'POST',
  body: {
    food: useRoute().params.id
  }
})

const {cart} = cartStore();

const addToCart = (element: Product): void => {
  const existingItem = cart.find(item => item.id === element.id)

  if (existingItem) {
    existingItem.count++;
    return;
  }

  cart.push({
    id: element.id,
    name: element.name,
    image: element.image,
    price: element.price,
    weight: element.weight,
    count: 1
  })
}

const store = cartStore();

const ordersBySearch = computed<Product[]>(() => {
  if (store.searchProduct === '') {
    return foods.value!
  }

  return foods.value!.filter(food => food.name.toLowerCase().includes(store.searchProduct.toLowerCase()))
})
</script>

<template>
  <transition name="v" appear>
    <main>
      <div class="food-wrap">
        <div
            class="food"
            v-for="food in ordersBySearch"
            :key="food.id"
        >
          <div class="image">
            <img :src="food.image" :alt="food.name">
          </div>
          <div class="price">
          <span>
            {{food.price}}₸
          </span>
          </div>
          <div class="name">
            {{food.name}}
          </div>
          <div class="weight">
            {{convertVolume(food.weight, food.isDrink)}}
          </div>
          <button @click="addToCart(food)">
            <svg class="UiKitUiKitIcon_m UiKitUiKitIcon_root UiKitCounter_icon">
              <path fill="currentColor" fill-rule="evenodd" d="M12 6a1 1 0 0 0-1 1v4H7a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2h-4V7a1 1 0 0 0-1-1Z" clip-rule="evenodd" />
            </svg>
            <span>
            Добавить
          </span>
          </button>
        </div>
        <div class="nullSpace" />
      </div>
    </main>
  </transition>
</template>

<style scoped lang="scss">
main {
  width: calc(100%);

  h2 {
    margin-top: 20px;
    margin-left: 15px;
    font-size: 1.7rem;
    font-weight: 700;
  }

  .food-wrap {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    grid-gap: 15px;
    padding: 15px;
    margin: 0 auto;
    height: calc(100% - 100px);
    overflow: auto;

    .food {
      max-width: 300px;
      background-color: #FFFFFF;
      border-radius: 15px;
      padding: 12px;
      font-family: 'Roboto', sans-serif;
      color: #21201F;
      cursor: pointer;

      div {
        width: 100%;
      }

      .image {
        aspect-ratio: 1/.87;
        border-radius: 12px;
        background-color: #f1f1f1;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 12px;
          color: #f1f1f1;
        }
      }

      .price {
        padding-top: 7px;
        padding-bottom: 2px;
        font-weight: 600;
        font-size: 1.15rem;
      }

      .name {
        font-size: .8rem;
        font-weight: 500;
        padding-bottom: 15px;
      }

      .weight {
        color: #837f7d;
        font-size: .85rem;
        padding-bottom: 6px;
      }

      button {
        width: 100%;
        padding: 10px 0;
        border-radius: 9px;
        background-color: #eaeaea;
        border: none;
        cursor: pointer;
        transition: background-color .2s ease-in-out;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 3px;

        &:active {
          background-color: #c7c7c7;
        }

        svg {
          margin-bottom: -2px;
          width: 22px;
          height: 22px;
          fill: #21201F;
        }

        span {
          font-weight: 200;
          color: #21201F;
        }
      }
    }

  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>