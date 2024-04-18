import type { App, Plugin } from 'vue';
import HelloWorld from './HelloWorld.vue';

export const HelloWorldPlugin: Plugin = {
  install(app: App) {
    app.component('HelloWorld', HelloWorld);
  }
}
export { HelloWorld }