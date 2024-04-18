import type { App, Plugin } from 'vue';
import { ChatPlugin } from './ChatUI';
import { HelloWorld } from './HelloWorld';

const compPlugin: Plugin = {
  install(app: App){
    ChatPlugin.install?.(app);
    HelloWorld.install?.(app);
  }
}

export default compPlugin;

export * from './ChatUI';
export * from './HelloWorld';