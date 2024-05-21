<script setup lang="ts">
import {gsap, Power1, Power4} from 'gsap'

const router = useRouter()

const backgrounds: Array<string> = [
  '/story/childhood.jpg',
  '/story/imperial-academy-of-arts.jpg',
  '/story/crimea-and-europe.jpg',
  '/story/return-to-russia.jpg',
  '/story/feodosia.jpg',
  '/story/last-years.jpg'
]

const rim: Array<string> = [
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
]

const episodes = ref<string[]>([
  'Детство',
  'Императорская академия художеств',
  'Крым и европа',
  'Возвращение в россию',
  'Феодосия',
  'Последние годы'
])


const route = [
  {
    name: 'Главная',
    route: '/',
    async func() {
      return await navigateToHome()
    }
  },
  {
    name: 'Жизнь',
    route: '/life',
  }
]

const activeBg = ref<number>();

onMounted(async () => {
  gsap.from('nav, footer', {
    opacity: 0,
    duration: 2,
  })

  gsap.from('.episode', {
    opacity: 0,
    x: (index) => index % 2 === 0 ? -35 : 35,
    duration: 1,
    stagger: 0.25,
    ease: Power1.easeOut,
  })
})

const navigateToHome = async (): Promise<void> => {
  gsap.to('.episodes, .nav', {
    opacity: 0,
    duration: 1
  })
  await gsap.to('footer, .background-reactive', {
    delay: 0.5,
    opacity: 0,
    duration: 1
  })

  await router.push('/')
}

const navigateToAbout = async (): Promise<void> => {
  gsap.to('.episodes, .nav', {
    opacity: 0,
    duration: 1
  })
  await gsap.to('footer, .background-reactive', {
    delay: 0.5,
    opacity: 0,
    duration: 1
  })

  await router.push('/about')
}

const navigateToChapter = async (chapter: string): Promise<void> => {
  gsap.to('.episodes', {
    opacity: 0,
    duration: 1.5,
    ease: Power4.easeInOut
  })

  await gsap.to('.nav', {
    opacity: 0,
    duration: 1.5,
    ease: Power4.easeInOut
  })

  await gsap.to('.cube', {
    duration: 0.5,
    opacity: 1,
  })

  await new Promise(resolve => setTimeout(resolve, 1000))

  await gsap.to('.cube', {
    duration: 1.5,
    width: window.innerWidth * 1.1,
    height: window.innerHeight * 1.1,
    ease: Power4.easeInOut
  })

  await router.push(chapter)
}

const routes: Array<string> = [
  '/life/story/childhood',
  '/life/story/academy',
  '/life/story/europe',
  '/life/story/return-to-russia',
  '/life/story/feodosia',
  '/life/story/last-years',
]

const currentRoute = useState<number>('storyRoute', () => 0)
</script>

<template>
  <div class="cube center-absolute">

  </div>

  <article>
    <Nav class="nav" v-model:routes="route" />
    <section>
      <div class="background-reactive">
        <div
            :class="index === activeBg ? 'opal' : ''"
            v-for="(background, index) in backgrounds"
            class="background"
            :style="`background-image: url('${background}')`"
        />
      </div>
      <div class="episodes center-absolute text-main text-uppercase">
        <div
            @click="currentRoute = index-1; navigateToChapter(routes[index-1])"
            @mouseover="activeBg = index-1"
            class="episode text-transition"
            v-for="index in backgrounds.length"
            :class="index-1 === activeBg ? 'picked' : ''"
        >
          <p class="rim text-transition">{{rim[index-1]}}</p>
          <p class="name text-transition">{{episodes[index-1]}}</p>
        </div>
      </div>

    </section>
  </article>
  <Footer :method="navigateToAbout" />
</template>

<style scoped lang="scss">
:global(body) {
  height: 100vh;
  background-color: #21201F;
}

.cube {
  width: 100px;
  height: 100px;
  opacity: 0;
  background-color: #FFFFFF;
  z-index: 3;
}

section {
  scrollbar-width: none;

  .background-reactive {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;

    .background {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: 50% 50%;
      transition: opacity .5s ease-in-out;
      opacity: 0;
    }
    .opal {
      opacity: 1;
      z-index: 2;
    }
  }

  .episodes {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;

    .episode {
      cursor: pointer;
      position: relative;
      min-height: 60px;
      padding: .6vw 0;
      width: 100%;
      text-align: center;
      transition: color 1s cubic-bezier(.19,1,.22,1);
      color: #FFFFFF;

      &:hover {
        p {
          color: #a1907f !important;
        }
      }

      p {
        padding: 4px 0;
      }

      .rim {

      }

      .name {
        font-size: .7rem;
        letter-spacing: .2vw;
      }
    }
  }
}
</style>