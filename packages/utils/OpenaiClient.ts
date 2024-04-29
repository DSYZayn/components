import { ref, type Ref, computed } from "vue";

// const openai_apikey = import.meta.env.VITE_OPENAI_KEY;
const openaiHeaders = new Headers();
// openaiHeaders.append("Authorization", "Bearer " + openai_apikey);
openaiHeaders.append("Content-Type", "application/json");
openaiHeaders.append("Accept", "*/*");
openaiHeaders.append("Connection", "keep-alive")
openaiHeaders.append("Access-Control-Allow-Origin", "*")

const isKeySettled = ref<boolean>(false)

let params = {
    // model: "gpt-3.5-turbo",
    model: "gpt-3.5-turbo-0125",
    max_tokens: 4000,
    tempature: 0.2,
    stream: "true"
}

const data = ref({
    messages: [
        { role: "system", content: "你是一个中文AI助手" }
    ],
    ...params
})

const requestOptions: Ref<RequestInit> = computed(() => {
    return {
        method: "POST",
        headers: openaiHeaders,
        body: JSON.stringify(data.value) as any,
        redirect: "follow"
    }
})
export type message<T extends "user" | "assistant"> = {
    role: T,
    content: string
}
export const getResponse = async (message: message<"user">): Promise<ReadableStream<Uint8Array> | null> => {
    if (!isKeySettled.value) {
        throw new Error("OpenAI key is not settled");
    }
    data.value.messages.push(message)

    const response = await fetch("https://api.chatanywhere.tech/v1/chat/completions", requestOptions.value)
    if (!response.ok) {
        return response.body;
    }
    return response.body

}
export function setAssistantMsg(msg: message<"assistant">) {
    data.value.messages.push(msg)
}

export function setKey(key: string) {
    openaiHeaders.append("Authorization", "Bearer " + key);
    isKeySettled.value = true;
}
export function setParams(newParams: Partial<typeof params>) {
    params = { ...params, ...newParams };
}
export function setSystemMsg(msg: string) {
    data.value.messages[0] = {
        role: 'system',
        content: msg
    }
}
//转发Host1: https://api.chatanywhere.tech (国内中转，延时更低，host1和host2二选一)
//转发Host2: https://api.chatanywhere.com.cn (国内中转，延时更低，host1和host2二选一)
//转发Host3: https://api.chatanywhere.cn (国外使用,国内需要全局代理)
// client.post("https://api.chatanywhere.com.cn/v1/completions", params)
//     .then(response =>{
//         console.log(response.data);
// })