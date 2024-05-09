//Project Name: ChatUiVue3 //魔改自@chat-ui/vue3 :
https://github.com/nvima/chat-ui //adaptor: zayn
<template>
  <div>
    <div
      @click="stateOpenChat()"
      :style="{
        position: 'fixed',
        bottom: '0px',
        right: '0px',
        overflow: 'hidden',
        transform: chatOpen ? 'translateY(100%)' : 'translateY(0%)',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '300ms',
        transitionDelay: chatOpen ? '0ms' : '300ms',
      }"
    >
      <div
        :style="{
          display: 'flex',
          borderRadius: '50%',
          cursor: 'pointer',
          backgroundColor: bgColorIcon || '#025CDB',
          margin: margin || '20px',
          padding: '0.75rem',
          fill: fillColorIcon || 'white',
        }"
      >
        <chat-icon></chat-icon>
      </div>
    </div>
    <div
      :style="{
        position: 'fixed',
        bottom: '0px',
        right: '0px',
        maxHeight: '100%',
        maxWidth: '100%',
        width: width || '410px',
        height: height || '700px',
        overflow: 'hidden',
        transform: chatOpen ? 'translateY(0%)' : 'translateY(100%)',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '300ms',
        transitionDelay: chatOpen ? '300ms' : '0ms',
      }"
    >
      <div
        :style="{
          margin: margin || '20px',
          overflow: 'hidden',
          borderRadius: '0.75rem',
          boxShadow: boxShadow || 'rgba(0,0,0,0.4) 0 0 6px',
          maxHeight: margin
            ? 'calc(100% - ' + margin + ' - ' + margin + ')'
            : 'calc(100% - 40px)',
          maxWidth: margin
            ? 'calc(100% - ' + margin + ' - ' + margin + ')'
            : 'calc(100% - 40px)',
          width:
            width && margin
              ? 'calc(' + width + ' - ' + margin + ' - ' + margin + ')'
              : width
              ? 'calc(' + width + ' - 40px)'
              : margin
              ? 'calc(410px - ' + margin + ' - ' + margin + ')'
              : 'calc(410px - 40px)',
          height:
            height && margin
              ? 'calc(' + height + ' - ' + margin + ' - ' + margin + ')'
              : height
              ? 'calc(' + height + ' - 40px)'
              : margin
              ? 'calc(700px - ' + margin + ' - ' + margin + ')'
              : 'calc(700px - 40px)',
        }"
      >
        <div
          :style="{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }"
        >
          <chat-header
            :closeChat="stateCloseChat"
            :headerHeight="headerHeight"
            :bgColorHeader="bgColorHeader"
            :bgColorIcon="bgColorIcon"
            :textColorHeader="textColorHeader"
            :fillColorIcon="fillColorIcon"
            :offline="offline"
            :colorOffline="colorOffline"
            :colorOnline="colorOnline"
            :botName="botName"
          ></chat-header>
          <chat-messages
            :bgColorChat="bgColorChat"
            :bgColorMessageChatbot="bgColorMessageChatbot"
            :bgColorMessagePerson="bgColorMessagePerson"
            :bgColorMessageTimestamp="bgColorMessageTimestamp"
            :textColorMessageChatbot="textColorMessageChatbot"
            :textColorMessagePerson="textColorMessagePerson"
            :textColorMessageTimestamp="textColorMessageTimestamp"
            :chat="chat"
          ></chat-messages>
          <chat-input
            :handleSend="onSend"
            :inputHeight="inputHeight"
            :bgColorInput="bgColorInput"
            :textColorInput="textColorInput"
            :inputPlaceholder="inputPlaceholder"
          ></chat-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChatMessages from "./ChatMessages.vue";
import ChatInput from "./ChatInput.vue";
import ChatHeader from "./ChatHeader.vue";
import ChatIcon from "./ChatIcon.vue";
import type { message } from "../types/message";

import { ref } from "vue";
export type ChatProps = {
  bgColorIcon?: string;
  margin?: string;
  fillColorIcon?: string;
  width?: string;
  height?: string;
  boxShadow?: string;
  headerHeight?: string;
  bgColorHeader?: string;
  textColorHeader?: string;
  offline?: boolean;
  colorOffline?: string;
  colorOnline?: string;
  bgColorChat?: string;
  bgColorMessageChatbot?: string;
  bgColorMessagePerson?: string;
  bgColorMessageTimestamp?: string;
  textColorMessageChatbot?: string;
  textColorMessagePerson?: string;
  textColorMessageTimestamp?: string;
  chat: message[];
  onSend: (message: string) => void;
  inputHeight?: string;
  bgColorInput?: string;
  textColorInput?: string;
  inputPlaceholder?: string;
  botName?: string;
};
defineProps<ChatProps>();
const chatOpen = ref<boolean>(false);

function stateCloseChat() {
  chatOpen.value = false;
}
function stateOpenChat() {
  chatOpen.value = true;
}
</script>
