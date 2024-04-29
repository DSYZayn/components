import type { App, Plugin } from 'vue';
import { ChatPlugin } from './ChatUI';

const compPlugin: Plugin = {
  install(app: App){
    ChatPlugin.install?.(app);
  }
}

export default compPlugin;

export * from './ChatUI';