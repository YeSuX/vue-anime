import { defineNuxtModule } from '@nuxt/kit';
import { useAnimation } from '../vue';

// 命名导出
export const vueAnimeModule = defineNuxtModule({
  meta: {
    name: 'vue-anime',
    configKey: 'vueAnime'
  },
  setup(options, nuxt) {
    nuxt.hook('app:created', () => {
      const app = nuxt.vueApp;
      app.use(useAnimation);
    });
  }
});

// 默认导出
export default vueAnimeModule; 