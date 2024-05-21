<script setup lang="ts">
import {cartStore} from "~/store/cart.store";

useHead({
  title: 'Связь с нами'
})

const images: string[] = [
    'https://static.tildacdn.com/tild6261-3632-4666-a539-356266336637/kuhnya-otkrytaya.jpg',
    'https://restconcept.ru/upload/iblock/a90/restoran-s-otkrytoy-kuhney1.jpg',
    'https://www.advantour.com/russia/images/food/russian-food.jpg',
    'https://img.freepik.com/free-photo/top-view-of-cropped-hands-of-senior-cook-unrecognizable-cutting-carrot-cooking-vegetable-stew_1098-20510.jpg'
]
</script>

<template>
<section>
  <Navigation />
  <article>
    <h4>
      Мы - топливо для вашего опыта, готовое поднять ваше трудоустройство на новые высоты.
    </h4>
    <img src="/rocket.png" alt="rocket">
  </article>
  <main>
    <div class="images">
      <div
          class="image"
          v-for="(image, index) in images"
          :key="index"
          :style="`background-image: url('${image}')`"
      />
    </div>

    <div class="text">
      <h5>Исскуство Готовки</h5>
      <p>
        В Food Court мы осознаем, насколько важно представить свой профессиональный опыт. Мы убеждены, что каждый кандидат обладает уникальными навыками и историей успеха, и наша миссия - помочь им представить это наиболее убедительным и эффективным образом. Будь то через компетентное резюме, убедительные сопроводительные письма или инновационные стратегии поиска работы, мы используем все возможности, чтобы помочь нашим клиентам достичь успеха в карьере и получить желаемую должность.
      </p>
      <img src="/asset.png" alt="asset">
    </div>
  </main>
  <footer>
    <span>
      Связаться с нами
    </span>
    <ul>
      <li>
        VK
      </li>
      <li>
        Instagram
      </li>
      <li>
        +8 7472 12 16 17
      </li>
    </ul>
  </footer>
</section>
</template>

<style scoped lang="scss">
* {
  font-size: 16px;
}

section {
  width: 100vw;
  min-height: 150vh;
  background-color: #212121;
  padding-bottom: 50px;

  article {
    display: flex;
    position: relative;
    padding: 0 13%;
    width: 100%;
    min-height: 90vh;

    h4 {
      font-family: 'Montserrat', sans-serif;
      position: absolute;
      z-index: 2;
      color: #F4F4F4;
      font-size: 3rem;
      width: 30%;
      font-weight: 400;
      top: 50%;
      transform: translateY(-50%);
    }

    img {
      position: absolute;
      width: 300px;
      top: 60%;
      transform: translateY(-50%);
      right: 10%
    }

    .images {
      width: 100%;
    }
  }

  main {
    padding: 0 10%;
    margin-bottom: 40px;

    .images {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 600px;
      margin-bottom: 20px;
      gap: 12px ;

      .image {
        width: 220px;
        aspect-ratio: 1/2;
        border-radius: 10px;
        background-position: center;
        background-size: cover;
        cursor: pointer;

        &:nth-child(1), &:nth-child(3) {
          transform: translateY(-60px);
        }

        &:nth-child(2), &:nth-child(4) {
          transform: translateY(60px);
        }
      }
    }

    .text {
      color: #F4F4F4;
      font-family: 'Roboto Slab', serif;
      position: relative;
      font-size: 16px;

      h5 {
        font-size: 3.5em;
        font-weight: 400;
        margin-bottom: 10px;
      }

      p {
        font-size: 1.5em;
        font-weight: 200;
        width: 80%;
        line-height: 1.5em;
      }

      img {
        position: absolute;
        top: 70px;
        width: 300px;
        right: 50px;
      }
    }
  }

  footer {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto Slab', serif;

    span {
      font-size: 2rem;
      color: #F4F4F4;
      font-weight: 400;
      margin-bottom: 20px;
    }

    ul {
      list-style: none;
      display: flex;
      justify-content: space-around;
      gap: 27px;

      li {
        text-align: center;
        flex: 1;
        cursor: pointer;
        white-space: nowrap;
      }

      li:nth-child(1) {
        color: #4250ff;
      }
      li:nth-child(2) {
        color: #8928fd;
      }
      li:nth-child(3) {
        color: #ff7b34;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  section article h4 {
    width: 50%;
  }
  section article img {
    width: 50%;
  }
}

@media screen and (max-width: 600px) {
  section article {
    min-height: 60vh;
  }

  section header img {
    width: 50px;
  }

  section header {
    padding: 3% 10% 0;
  }

  section main {
    padding: 0 2%;
  }
  section article {
    padding: 0 2%;
  }

  section article h4 {
    width: 60%;
    font-size: 2rem;
  }

  section article img {
  }

  section main .text {
    font-size: 3vw;
  }
}
</style>