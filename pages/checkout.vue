<script setup lang="ts">
import {type Ref} from "vue";
import {cartStore} from "~/store/cart.store";
import type {service} from "~/interfaces/service.interface";
import type {deliveryData} from "~/interfaces/delivery.interface";
import type {check} from "~/interfaces/check.interface";
import {useRouter} from "#app";

const deliveryServices: Array<service> = [
  {
    id: 0,
    name: 'Yandex',
    image: '/yandex.png',
    cost: 500 + Math.round(Math.random() * 120)
  },
  {
    id: 1,
    name: 'Glovo',
    image: '/glovo.png',
    cost: 500 + Math.round(Math.random() * 120)
  },
  {
    id: 2,
    name: 'Wolt',
    image: '/wolt.png',
    cost: 500 + Math.round(Math.random() * 120)
  },
]

const selectedServiceID: Ref<number> = ref(0);

const input: deliveryData = reactive({
  adress: '',
  phone: null,
  commentary: ''
})

const store = cartStore();

const totalPrice = computed(() => {
  let price: number = 0;

  for (let i = 0; i < store.cart.length; i++) {
    price += store.cart[i].price * store.cart[i].count;
  }

  return price;
})

const fetchCheckout = async () => {
  if (input.phone!.toString()?.length < 5) {
    return;
  }
  if (!isKazakhstanPhoneNumber(input.phone!.toString())) {
    return;
  }
  if (input.adress.length < 5) {
    return;
  }
  

  const audio = new Audio('/start.mp3');
  await audio.play();

  const res = await axios().post('/api/check', {
    delivery: deliveryServices[selectedServiceID.value].name,
    price: totalPrice.value,
    deliveryPrice: deliveryServices[selectedServiceID.value].cost,
    phone: input.phone,
    adress: input.adress,
    commentary: input.commentary
  })

  checkout.value = res.data;

}

const clearCheck = (): void => {
  Object.keys(checkout.value).forEach(key => {
    delete checkout.value[key];
  })
  Object.keys(input).forEach(key => {
    delete input[key];
  })

  store.cart.length = 0;

  useRouter().push('/');
}

const checkout: Ref<check | {}> = ref({

})

</script>

<template>
  <header>
    <span @click="$router.back()">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.8 7L9.04645 1.75355C9.24171 1.55829 9.24171 1.24171 9.04645 1.04645L8.35355 0.353553C8.15829 0.158291 7.84171 0.158291 7.64645 0.353553L0 8L7.64645 15.6464C7.84171 15.8417 8.15829 15.8417 8.35355 15.6464L9.04645 14.9536C9.24171 14.7583 9.24171 14.4417 9.04645 14.2464L3.8 9H15.5C15.7761 9 16 8.77614 16 8.5V7.5C16 7.22386 15.7761 7 15.5 7H3.8Z" fill="#C4C2BE"/>
      </svg>
      Назад
    </span>

    <img src="/logotype.png" alt="logo" @click="$router.push('/')">

    <div class="logo-text" @click="$router.push('/')">
      <h1>
        Food Court
      </h1>
      <span>
        Since 1997
      </span>
    </div>
  </header>
  <div class="delivery-options">
    <h6>Выбрать сервис</h6>
    <div class="services">
      <div class="service"
           v-for="service in deliveryServices"
           :key="service.id"
           :title="service.name"
           :class="(selectedServiceID === service.id) && 'select'"
           @click="selectedServiceID = service.id"
      >
        <img :src="service.image" :alt="service.name">
        {{service.name}}
      </div>
    </div>
    <span>
      Цена за доставку: {{deliveryServices[selectedServiceID].cost}}₸
    </span>

    <h6>Информация курьеру</h6>
    <div class="info">
      <input type="text" placeholder="Адрес..." v-model="input.adress">
      <input type="number" placeholder="Телефон..." v-model.number="input.phone">
      <input type="text" placeholder="Комментарий к курьеру..." v-model="input.commentary">
    </div>

    <div class="bills">
      <button @click="fetchCheckout()">
        Оплатить
      </button>
      <span>
        {{totalPrice + deliveryServices[selectedServiceID].cost}}₸
      </span>
    </div>
  </div>
  <div class="check-layout"
       v-if="Object.keys(checkout).length"
       @click.self="clearCheck()"
  >
    <div class="check">
      <h6>
        Чек прихода
      </h6>
      <div class="row">
        <span>
          ИИН организации:
        </span>
        <span>
          7701823721
        </span>
      </div>
      <div class="row">
        <span>
          Дата
        </span>
        <span>
          {{ (new Date().toJSON().slice(0,10)).replaceAll('-', '.') }}
        </span>
      </div>
      <div class="row">
        <span>
          Email:
        </span>
        <span>
          foodcourt@food.com
        </span>
      </div>
      <div class="row">
        <span>
          Сайт:
        </span>
        <span>
          http://localhost:3000/
        </span>
      </div>

      <div class="divider" />

      <div class="row">
        <span>
          Сервис Доставки:
        </span>
        <span>
          {{checkout.delivery}}
        </span>
      </div>
      <div class="row">
        <span>
          Цена доставки:
        </span>
        <span>
          {{checkout.deliveryPrice}}₸
        </span>
      </div>
      <div class="row">
        <span>
          НДС
        </span>
        <span>
          0%
        </span>
      </div>

      <div class="divider" />

      <div class="row">
        <span>
          Адрес:
        </span>
        <span>
          {{checkout.adress}}
        </span>
      </div>
      <div class="row">
        <span>
          Телефон:
        </span>
        <span>
          {{checkout.phone}}
        </span>
      </div>
      <div class="row">
        <span>
          Продукты:
        </span>
        <span>
          {{checkout.price}}₸
        </span>
      </div>

      <div class="summary">
        <p>
          КОД КУРЬЕРУ: <br>
          {{checkout.code}}
        </p>
        <p>
          СУММА: <br>
          {{checkout.price + checkout.deliveryPrice}}₸
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
header {
  width: 100%;
  height: 100px;
  background-color: #FFF;
  border-bottom: #d3d3d3 2px solid;
  display: flex;
  align-items: center;
  padding: 0 30px;

  span {
    user-select: none;
    display: flex;
    align-items: center;
    gap: 9px;
    color: #b9b9b9;
    cursor: pointer;
  }

  img {
    width: 70px;
    margin-left: auto;
    cursor: pointer;
  }

  .logo-text {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
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

.delivery-options {
  width: 400px;
  min-height: 400px;
  background-color: #FFFFFF;
  border-radius: 32px;
  margin: 42px auto 0 auto;
  padding: 36px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;

  h6 {
    font-size: 1.15rem;
    margin-bottom: 9px;
  }

  .services {
    display: flex;
    height: 39px;
    gap: 3px;
    width: 100%;
    margin-bottom: 10px;

    .service {
      display: flex;
      align-items: center;
      border-radius: 12px;
      padding-left: 5px;
      flex: 1 1 0;
      cursor: pointer;
      font-size: .8rem;

      img {
        border-radius: 12px;
        width: 29px;
        margin-right: 6px;
      }
    }

    .select {
      background-color: #efefef;
    }
  }

  & > span {
    display: block;
    padding-bottom: 15px;
    color: #a1a1a1;
    font-size: .8rem;
  }

  .info {
    margin-top: 12px;
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 15px;

    input {
      width: 100%;
      padding: 9px;
      border-radius: 9px;
      border: 1px solid #D2D0CC;
      outline: none;

      &:nth-child(1) {
        width: 35%;
      }
      &:nth-child(2) {
        width: calc(65% - 6px);
      }

      ::placeholder {
        color: #D2D0CC;
      }
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }


    input[type=number] {
      -moz-appearance: textfield;
    }
  }


  .bills {
    display: flex;
    width: 100%;
    height: 50px;
    font-family: "Roboto", sans-serif;

    button {
      width: 60%;
      background-color: #21201F;
      border: none;
      color: #F4F4F4;
      border-radius: 12px;
      cursor: pointer;
      font-weight: 600;

      &:active {
        opacity: .9;
      }
    }

    span {
      height: 100%;
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
    }
  }
}

.check-layout {
  top: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(33, 32, 31, 0.7);

  .check {
    width: 400px;
    min-height: 40%;
    border-radius: 12px;
    position: relative;
    background-color: #F4F4F4;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 21px 32px;
    font-family: 'Roboto Slab', serif;

    h6 {
      text-align: center;
      font-size: 1.4rem;
      font-weight: 500;
      margin-bottom: 21px;
    }

    .row {
      display: flex;
      justify-content: space-between;
      font-weight: 400;
      font-size: .9rem;
    }

    .divider {
      margin: 15px 0;
      width: 100%;
      height: 1px;
      border: 1px #21201F dashed;
    }

    .summary {
      margin-top: 20px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      font-size: 1.3rem;
      font-weight: 500;
    }
  }
}
</style>