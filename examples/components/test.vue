<script setup lang="ts">
// import { OpenaiChat, type OpenaiChatProps } from "../.."; // use builded version
import { OpenaiChat, type OpenaiChatProps } from "../../packages"; // use unbuilded version
// import { OpenaiChat, type OpenaiChatProps } from "@heyzayn/components"; // use public version
import { deepseekApiUrl, chatanywhereApiUrl} from "@/utils/api_for_test";

// const key = import.meta.env.VITE_DEEP_SEEK_KEY;
const key = import.meta.env.VITE_OPENAI_KEY;

// const params: OpenaiChatProps["params"] = {
//   model: "deepseek-chat"
// }

</script>

<template>
  <div class="w-full h-full">
    <OpenaiChat :openaikey="key" :proxy-url="chatanywhereApiUrl" bot-name="AI助手" />
  </div>
</template>

<style scoped>
div {
  width: auto;
}
</style>
