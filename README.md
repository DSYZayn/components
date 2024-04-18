# my components

## Current components:
- HelloWorld (for test only)
- Chatui (mod from @chat-ui/vue3, add some features)

# usage
```sh
npm install @heyzayn/components
```

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Chat, type message } from '@heyzayn/components'
//如果样式不正确,导入样式文件
// import '@heyzayn/components/index.css'
import getResponse from './utils/Boredapi.ts';// import your own api

const chatData = ref<message[]>([
    { message: '你好，我是AI助手。', type: 'chatbot', timestamp: formatAMPM(new Date()) },
])
function formatAMPM(date:Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    let r_hours = hours % 12;
    r_hours = hours ? hours : 12; // the hour '0' should be '12'
    const r_minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = r_hours + ':' + r_minutes + ' ' + ampm;
    return strTime;
}
async function  handleSend(input: string){
    chatData.value.push({ message: input, type: 'person', timestamp: formatAMPM(new Date()) })
    const response = await getResponse()
    chatData.value.push(response)
}
</script>

<template>
    <div class="w-full h-full">
        <Chat :chat="chatData" bot-name="AI助手" :on-send="handleSend"/>
    </div>
        <HelloWorld msg="Hello World" />
</template>

<style scoped>
div{
    width: auto ;
}
</style>

```

