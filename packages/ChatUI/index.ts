import type { App, Plugin } from 'vue';
import Chat, { type ChatProps } from './Chat.vue';
import OpenaiChat, { type OpenaiChatProps } from './OpenaiChat.vue';
import getResponse from '../utils/Boredapi';
import { type message } from './message';
import '../assets/style.css';

export const ChatPlugin: Plugin = {
  install(app: App) {
    app.component('Chat', Chat);
    app.component('OpenaiChat', OpenaiChat);
  }
};
export {
  Chat,
  OpenaiChat,
  getResponse,
  ChatProps,
  OpenaiChatProps,
  message
}