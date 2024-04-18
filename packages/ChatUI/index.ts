import type { App, Plugin } from 'vue';
import Chat from './Chat.vue';
import { type message } from './message';

export const ChatPlugin: Plugin = {
  install(app: App) {
    app.component('Chat', Chat);
  }
};
export { Chat, message }