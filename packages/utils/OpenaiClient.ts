import { ref, type Ref, computed, ComputedRef } from "vue";

export type params = {
    model: string,
    max_tokens: number,
    temperature: number,
    stream: boolean
}
export type message<T extends "user" | "assistant" | "system"> = {
    role: T,
    content: string
}
export class OpenaiClient {
    private proxyUrl: string = "https://api.chatanywhere.com.cn/v1/completions";
    private params: params = {
        // model: "gpt-3.5-turbo",
        model: "gpt-3.5-turbo-0125",
        max_tokens: 4000,
        temperature: 0.2,
        stream: true
    }
    private data: Ref<{
        messages: message<"user" | "assistant" | "system">[]
    } & params> = ref({
        messages: [
            { role: "system", content: "你是一个中文AI助手" }
        ],
        ...this.params
    })

    private requestOptions: ComputedRef<RequestInit | undefined>;
    constructor(key: string, proxyUrl?: string, params?: Partial<params>, systemMsg?: string) {
        const openaiHeaders = new Headers();
        openaiHeaders.append("Content-Type", "application/json");
        openaiHeaders.append("Accept", "*/*");
        openaiHeaders.append("Connection", "keep-alive")
        openaiHeaders.append("Access-Control-Allow-Origin", "*")

        openaiHeaders.append("Authorization", "Bearer " + key);
        const that = this;
        this.requestOptions = computed(function(): RequestInit {
            return {
                method: "POST",
                headers: openaiHeaders,
                body: JSON.stringify(that.data.value) as any,
                redirect: "follow"
            }
        })

        this.proxyUrl = proxyUrl ? proxyUrl : this.proxyUrl;
        this.params = { ...this.params, ...params };
        if (systemMsg) {
            this.data.value = {
                messages: [
                    { role: "system", content: systemMsg }
                ],
                ...this.params
            }
        } else if (params) {
            this.data.value = {
                messages: this.data.value.messages,
                ...this.params
            }
            console.log(this.data.value);
        }
    }
    async getResponse(this: OpenaiClient, message: message<"user">): Promise<ReadableStream<Uint8Array> | null> {
        this.data.value.messages.push(message)
        console.log(this.data.value);

        const response = await fetch(this.proxyUrl, this.requestOptions.value)
        if (!response.ok) {
            return response.body;
        }
        return response.body

    }
    setAssistantMsg(this: OpenaiClient, msg: message<"assistant">) {
        this.data.value.messages.push(msg)
    }

}












//转发Host1: https://api.chatanywhere.tech (国内中转，延时更低，host1和host2二选一)
//转发Host2: https://api.chatanywhere.com.cn (国内中转，延时更低，host1和host2二选一)
//转发Host3: https://api.chatanywhere.cn (国外使用,国内需要全局代理)
// client.post("https://api.chatanywhere.com.cn/v1/completions", params)
//     .then(response =>{
//         console.log(response.data);
// })