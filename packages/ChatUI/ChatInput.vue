<template>
  <form
    @submit="sendMessage($event)"
    :style="{
      display: 'flex',
      height: inputHeight || '60px',
      backgroundColor: bgColorInput || 'white',
      color: textColorInput || 'black',
    }"
  >
    <input
      class="input"
      :placeholder="inputPlaceholder || 'Type your message here'"
      @input="inputField = ($event.target as any).value"
      :value="inputField"
      :style="{
        borderWidth: '0px',
        backgroundColor: bgColorInput || 'white',
        color: textColorInput || 'black',
        width: '100%',
        marginLeft: '1rem',
        fontSize: '1rem',
      }"
    />
    <button
      :style="{
        backgroundColor: bgColorInput || 'white',
        flexShrink: '0',
        all: 'unset',
        cursor: 'pointer',
        margin: 'auto 1rem',
      }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        :strokeWidth="1.5"
        :style="{
          height: '1.5rem',
          width: '1.5rkm',
        }"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
        ></path>
      </svg>
    </button>
  </form>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";
const props = defineProps<{
    handleSend: (message: string) => void;
    inputHeight?: string,
    bgColorInput?: string,
    textColorInput?: string,
    inputPlaceholder?: string,
}>();

const inputField = ref("");

function sendMessage(e: Event) {
    e.preventDefault();
    if (props.handleSend) props.handleSend(inputField.value);
    inputField.value = "";
  }
</script>

<style scoped>
.input:focus {
  outline: none;
}
</style>