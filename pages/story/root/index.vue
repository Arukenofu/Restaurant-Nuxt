<script setup lang="ts">
import gsap, {Power4} from 'gsap'
import Footer from "~/components/Footer.vue";

const router = useRouter()

onMounted(async () => {
  gsap.from('.line p', {
    y: 100,
    ease: "power4.out",
    delay: 1,
    duration: 2,
  })

  gsap.from('.line h1', {
    y: -100,
    ease: Power4.easeOut,
    delay: 1,
    duration: 2,
  })

  gsap.from(".scroll-down", {
    opacity: 0,
    delay: 3,
    duration: 1
  })

  gsap.from(".preloaded", {
    opacity: 0,
    duration: 2
  })
})

const leave = async (route: string): Promise<void> => {

  gsap.to('.scroll-down', {
    opacity: 0,
    duration: 1
  })

  gsap.to('.line p', {
    y: 30,
    ease: "power4.out",
    duration: 1,
  })

  gsap.to('.line h1', {
    y: -38,
    ease: "power4.out",
    duration: 1,
  })

  await gsap.to(".preloaded", {
    opacity: 0,
    duration: 1
  })

  await router.push(route)
}

</script>

<template>
  <div class="preloaded" key="loaded">
    <div class="background" @click="leave('/story/root/life')"  />
    <div class="vertical-align center-absolute">
      <div class="line">
        <p class="text-uppercase text-x text-main">К 200-летию со дня рождения</p>
      </div>
      <div class="line">
        <h1 class="text-uppercase text-x text-main">Иван Айвазовский</h1>
      </div>

      <p @click="leave('life')" class="scroll-down text-uppercase text-x text-transition">
        Нажмите на любую область
      </p>
    </div>
  </div>
  <Footer :method="leave" />
</template>

<style scoped lang="scss">
.preloaded {

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/story/background.jpg');
    background-position: center;
    background-size: cover;
    z-index: 1;
  }

  .vertical-align {
    width: 100%;
    z-index: 2;

    .line {
      height: 50px;
      position: relative;
      overflow: hidden;
      margin-bottom: 15px;
      width: 100%;

      p {
        width: 100%;
        position: absolute;
        line-height: 5rem;
        font-size: .6em;
        letter-spacing: .3em;
        font-weight: 100;
        color: #f6eedd;
      }

      h1 {
        width: 100%;
        position: absolute;
        line-height: 3rem;
        letter-spacing: .3em;
        font-size: 2em;
        color: #f6eedd;
      }
    }

    & > p {
      padding-top: 2vw;
      color: rgba(255,255,255,.49);
      font-size: .8rem;
      letter-spacing: .2vw;
    }
  }
}


@media screen and (max-width: 760px) {
  :global(body) {
    font-size: 14px;
  }

  .line h1 {
    font-size: 1.5rem !important;
  }

}
</style>