<script setup lang="ts">
import Chat, { type ChatProps } from "./Chat.vue";
import { type message as messageType } from "../types/message";
import { ref, watch } from "vue";
import { OpenaiClient, type params, type message } from "../utils/OpenaiClient";
// import {
//   setAssistantMsg,
//   getResponse,
//   setKey,
//   setParams,
//   setSystemMsg,
//   setProxyURL,
//   type message,
// } from "../utils/OpenaiClient";
import formatAMPM from "../utils/formatAMPM";

export type OpenaiChatProps = Omit<ChatProps, "onSend" | "chat"> & {
  openaikey: string;
  proxyUrl?: string;
  systemMessage?: string;
  params?: Partial<params>;
  firstMessage?: string;
};

const props = defineProps<OpenaiChatProps>();
const client = new OpenaiClient(
  props.openaikey,
  props.proxyUrl,
  props.params,
  props.systemMessage
);

const chatOffline = ref(false);
const chatData = ref<messageType[]>([
  {
    message: props.firstMessage
      ? props.firstMessage
      : "Hi, how can I help you?",
    type: "chatbot",
    timestamp: formatAMPM(new Date()),
  },
]);

async function handleSendEvent(input: string) {
  if (input == "") return;
  const messagePerson = {
    type: "person",
    timestamp: formatAMPM(new Date()),
    message: input,
  };
  chatData.value.push(messagePerson as messageType);
  const message_input: message<"user"> = {
    role: "user",
    content: input,
  };
  const response = await client.getResponse(message_input);
  if (response === null) {
    chatOffline.value = true;
  }
  chatOffline.value = false;
  const msg = ref<string>("");
  const messageChatbot = {
    type: "chatbot",
    timestamp: formatAMPM(new Date()),
    message: msg.value,
  };
  //处理流式响应
  chatData.value.push(messageChatbot as messageType);
  watch(msg, (newValue) => {
    chatData.value[chatData.value.length - 1].message = newValue;
  });
  let result = true;
  if (response === null) return;
  const reader = response.getReader();
  const expression = new RegExp(/(?<=content":").*(?="},")/gm);
  //连续读取chunk
  while (result) {
    const { done, value } = await reader.read();
    if (done) {
      result = false;
      client.setAssistantMsg({
        role: "assistant",
        content: msg.value,
      });
      break;
    }
    const answer = new TextDecoder().decode(value);
    const answer_data = answer.match(expression)?.join("").replace(/","role":"assistant/g, "");

    //必须先转译\n，否则会导致无法正常换行
    msg.value += answer_data ? answer_data.replace(/\\n/g, "\n") : "";
  }
}
</script>

<template>
  <Chat :chat="chatData" :onSend="handleSendEvent" v-bind="props" />
</template>

<style scoped></style>
