export interface AnimationOptions {
  duration?: number;
  easing?: string;
  delay?: number;
}

export class Animation {
  private options: AnimationOptions;

  constructor(options: AnimationOptions = {}) {
    this.options = {
      duration: 1000,
      easing: 'easeInOutQuad',
      delay: 0,
      ...options
    };
  }

  play() {
    console.log('Animation playing with options:', this.options);
  }
} 