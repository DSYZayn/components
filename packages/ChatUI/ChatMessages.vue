<template>
  <div
    id="chat-container"
    ref="chatContainer"
    :style="{
      height: '100%',
      overscrollBehaviorY: 'contain',
      overflowY: 'auto',
      overflowX: 'hidden',
      backgroundColor: bgColorChat || '#EAEEF3',
      padding: '1.5rem',
    }"
  >
    <template v-for="(chatMessage, _) in chat">
      <div>
        <template v-if="chatMessage.type == 'person'">
          <div class="div">
            <div
              class="div-2"
              :style="{
                backgroundColor: bgColorMessagePerson || '#025CDB',
                color: textColorMessagePerson || 'white',
              }"
            >
              <template v-if="chatMessage.timestamp">
                <div
                  class="div-3"
                  :style="{
                    backgroundColor: bgColorMessageTimestamp || 'white',
                    color: textColorMessageTimestamp || 'black',
                  }"
                >
                  {{ chatMessage.timestamp }}
                </div>
              </template>

              {{ chatMessage.message }}
            </div>
          </div>
        </template>

        <template v-if="chatMessage.type == 'chatbot'">
          <div class="div">
            <div
              class="div-4 whitespace-pre-wrap"
              :style="{
                backgroundColor: bgColorMessageChatbot || 'white',
                color: textColorMessageChatbot || 'black',
              }"
            >
              <template v-if="chatMessage.timestamp">
                <div
                  class="div-5"
                  :style="{
                    backgroundColor: bgColorMessageTimestamp || 'white',
                    color: textColorMessageTimestamp || 'black',
                  }"
                >
                  {{ chatMessage.timestamp }}
                </div>
              </template>

              <VMdPreview :text="chatMessage.message" />
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, watch, computed } from "vue";
import { type message } from "./message";
import hljs from "highlight.js";
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

VMdPreview.use(githubTheme, {
  Hljs: hljs
});

const props = defineProps<{
  bgColorChat?: string;
  chat: message[];
  bgColorMessagePerson?: string;
  textColorMessagePerson?: string;
  bgColorMessageTimestamp?: string;
  textColorMessageTimestamp?: string;
  bgColorMessageChatbot?: string;
  textColorMessageChatbot?: string;
}>();

const chatContainer = ref<HTMLDivElement | null>(null);
const chatElementAdded = ref(false);

const onUpdateHook0 = computed(() => props.chat.length);

const onUpdatedHook1 = computed(() => props.chat.at(-1)?.message?.length);

watch(onUpdateHook0, () => {
  if (chatContainer.value && !chatElementAdded.value) {
    scrollToEnd(chatContainer.value);
    chatElementAdded.value = true;
  }
});
watch(onUpdatedHook1, () => {
  if (chatContainer.value && chatElementAdded.value) {
    scrollToEnd(chatContainer.value);
  }
});

function scrollToEnd(container: HTMLElement) {
  const containerHeight = container.clientHeight;
  const contentHeight = container.scrollHeight;
  container.scrollTop = contentHeight - containerHeight;
}
</script>

<style scoped>


.div {
  position: relative;
}
.div:hover div {
  display: block;
}
.div-2 {
  position: relative;
  border-radius: 0.75rem;
  padding: 1rem;
  width: fit-content;
  max-width: 80%;
  margin-bottom: 1rem;
  margin-left: auto;
}
.div-3 {
  position: absolute;
  width: max-content;
  display: none;
  bottom: 0px;
  border-radius: 0.25rem;
  left: 0px;
  transform: translateX(-50%) translateY(50%);
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 2px;
  padding: 0.25rem;
  z-index: 9999;
}
.div-4 {
  position: relative;
  border-radius: 0.75rem;
  padding: 1rem;
  width: fit-content;
  max-width: 80%;
  margin-bottom: 1rem;
  margin-right: auto;
}
.div-5 {
  position: absolute;
  width: max-content;
  display: none;
  bottom: 0px;
  right: 0px;
  border-radius: 0.25rem;
  transform: translateX(50%) translateY(50%);
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 2px;
  padding: 0.25rem;
  z-index: 9999;
}
:deep(.github-markdown-body){
  padding: 0;
}
:deep(.github-markdown-body p) {
  margin-bottom: 0;
  display: inline-block;
}
:deep(.github-markdown-body .v-md-pre-wrapper pre) {
  margin-bottom: 0;
}
</style>
