<script setup lang="ts">
// import { OpenaiChat } from "../../packages";
import { OpenaiChat } from "../.."; // use builded version

const key = import.meta.env.VITE_OPENAI_KEY;
</script>

<template>
  <div class="w-full h-full">
    <OpenaiChat :openaikey="key" bot-name="AI助手" />
  </div>
  <HelloWorld msg="Hello World" />
</template>

<style scoped>
div {
  width: auto;
}
</style>
