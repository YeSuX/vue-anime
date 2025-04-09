import { Animation } from '../core/animation';

export function useAnimation(options = {}) {
  return new Animation(options);
}

export default {
  install: (app) => {
    app.config.globalProperties.$animate = useAnimation;
  }
}; 