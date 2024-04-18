import type { App } from 'vue';
import HelloWorld from './HelloWorld.vue';

HelloWorld.install = (app: App) => {
  app.component("helloworld", HelloWorld);
};

export default HelloWorld;