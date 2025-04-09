import { Animation } from './core/animation';
import { useAnimation } from './vue';

// 使用命名导出而不是默认导出
export { Animation } from './core/animation';
export { useAnimation } from './vue';

// 为了向后兼容，保留默认导出
export default {
  Animation,
  useAnimation
}; 