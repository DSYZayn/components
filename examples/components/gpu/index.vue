<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import type { GPU, ThreadKernelVariable, KernelFunction } from "gpu.js";
import testImg from "/examples_public/test.jpg";

let execute: Function;
const display = ref<HTMLDivElement | null>(null);
const kernelFn: KernelFunction = function (this, image: ThreadKernelVariable) {
  const pixel = (image as number[][][])[this.thread.y][this.thread.x];
  this.color(pixel[0], pixel[1], pixel[2], pixel[3]);
};
onMounted(() => {
  const gpu = inject("gpu") as GPU;
  const kernel = gpu
    .createKernel(kernelFn)
    .setGraphical(true)
    .setOutput([512, 512]);
  execute = function () {
    const image = document.createElement("img");
    image.width = 512;
    image.height = 512;
    image.src = testImg;
    kernel(image);
    display.value?.appendChild(kernel.canvas);
  };
});
</script>

<template>
  <div class="wrapper w-full h-full overflow-hidden">
    <button class="btn btn-primary" @click="execute ? execute() : ''">
      Calculate
    </button>
    <div ref="display" class="w-96 h-96"></div>
    <Test />
  </div>
</template>

<style scoped></style>
