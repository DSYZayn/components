<script setup lang="ts">
import { useMapViewStore } from '@/stores/MapView';
import { computed, onMounted, ref , type Ref } from 'vue';
import { night2d } from './night';




const { loadMap, toggleView, getMap, getMapView } = useMapViewStore();

const mapView = getMapView();
const map = getMap();
onMounted(() => {
  loadMap("map");
  mapView.when(()=>{
    mapView.goTo([123.075346, 44.807826])
    map.add(night2d);
  })

});

</script>

<template>
    <div class="h-full w-full">
        <h1 class="text-purple-400">ArcGIS Component</h1>
        <button class="btn btn-success" @click="toggleView">Switch</button>
        <div class="h-full w-full" id="map"></div>
    </div>
</template>

<style scoped>

</style>