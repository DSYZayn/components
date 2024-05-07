<script setup lang="ts">
// import { OpenaiChat, type OpenaiChatProps } from "../.."; // use builded version
import { OpenaiChat, type OpenaiChatProps } from "../../packages"; // use unbuilded version
import { deepseekApiUrl} from "@/utils/api_for_test";

const key = import.meta.env.VITE_DEEP_SEEK_KEY;

const params: OpenaiChatProps["params"] = {
  model: "deepseek-chat"
}

</script>

<template>
  <div class="w-full h-full">
    <OpenaiChat :openaikey="key" :proxy-url="deepseekApiUrl" :params="params" bot-name="AI助手" />
  </div>
  <HelloWorld msg="Hello World" />
</template>

<style scoped>
div {
  width: auto;
}
</style>
