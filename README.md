# my components
Here are some components that I made for my projects.

## Current components:

- Chatui (mod from @chat-ui/vue3, add some features)
- Openai Chat (support openai api and stream transmition)  
Tips: openai chat only adapt for chatanywhere and one api project, if you have another api provider, I don't guarantee it will work.

![Openai Chat](https://github.com/DSYZayn/components/blob/main/public/examples_public/example.gif)

# usage

```sh
npm install @heyzayn/components
```

## Chatui
### Type hints
```typescript
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
```
```vue
<script setup lang="ts">
import { ref } from "vue";
import { Chat, type message } from "@heyzayn/components";
//如果样式不正确,导入样式文件
// import '@heyzayn/components/index.css'
import getResponse from "./utils/Boredapi.ts"; // import your own api

const chatData = ref<message[]>([
  {
    message: "你好，我是AI助手。",
    type: "chatbot",
    timestamp: formatAMPM(new Date()),
  },
]);
function formatAMPM(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  let r_hours = hours % 12;
  r_hours = hours ? hours : 12; // the hour '0' should be '12'
  const r_minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = r_hours + ":" + r_minutes + " " + ampm;
  return strTime;
}
async function handleSend(input: string) {
  chatData.value.push({
    message: input,
    type: "person",
    timestamp: formatAMPM(new Date()),
  });
  const response = await getResponse();
  chatData.value.push(response);
}
</script>

<template>
  <div class="w-full h-full">
    <Chat :chat="chatData" bot-name="AI助手" :on-send="handleSend" />
  </div>
  <HelloWorld msg="Hello World" />
</template>

<style scoped>
div {
  width: auto;
}
</style>
```

## Openai Chat
### Type hints
```typescript
export type OpenaiChatProps = Omit<ChatProps, "onSend" | "chat"> & {
  openaikey: string;
  proxyUrl?: string;
  systemMessage?: string;
  params?: Parameters<typeof setParams>[0];
  firstMessage?: string;
};
```
The params type should be like part of this(program will merge the params with default params):
```typescript
let params = {
    model: "gpt-3.5-turbo",
    max_tokens: 4000,
    temperature: 0.2,
    stream: "true"
}
```
The proxyUrl is your openai api url, if you don't have one, you can use the default one(https://api.openai.com/v1/engines/davinci/completions), you don't need to set it if you use the default one.

The key should match your openai api url, ask your openai api provider for it.

Recommend to use the chatanywhere to get a test key, then you only need to set the key in this component .

### Example
You can just use it with your own openai key, it support stream transmition and system message(you should set props if you want to use it).
```vue
<script setup lang="ts">
import { ref } from "vue";
import { OpenaiChat, type message } from "@heyzayn/components";

const key = import.meta.env.VITE_OPENAI_KEY;
</script>

<template>
  <div class="w-full h-full">
    <OpenaiChat :openaikey="key" bot-name="AI助手" />
  </div>
</template>

<style scoped></style>
```
