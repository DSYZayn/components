import { DeckRenderer } from '@deck.gl/arcgis';
import {GeoJsonLayer} from '@deck.gl/layers';
import {scaleThreshold} from 'd3-scale';
import type {Color} from '@deck.gl/core';
import buildings from '@/assets/buildings.json';
import * as externalRenderers from '@arcgis/core/views/3d/externalRenderers';

// Source data GeoJSON
const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/geojson/vancouver-blocks.json';

  export const COLOR_SCALE = scaleThreshold<number, Color>()
  .domain([-0.6, -0.45, -0.3, -0.15, 0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.05, 1.2])
  .range([
    [65, 182, 196],
    [127, 205, 187],
    [199, 233, 180],
    [237, 248, 177],
    // zero
    [255, 255, 204],
    [255, 237, 160],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [252, 78, 42],
    [227, 26, 28],
    [189, 0, 38],
    [128, 0, 38]
  ]);


const layers = [
new GeoJsonLayer({
    id: 'geojson',
    data: buildings as any,
    opacity: 0.8,
    stroked: false,
    filled: true,
    extruded: true,
    wireframe: true,
    getElevation: f => Math.sqrt(f.properties.height) * 10,
    getFillColor: COLOR_SCALE(Math.random()),
    getLineColor: [255, 255, 255],
    pickable: true
})
];

export function buildingsTongyu (sceneview: __esri.SceneView) {
    const renderer = new DeckRenderer(sceneview, {})
    renderer.deck.layers = layers;

    externalRenderers.add(sceneview, renderer);

    function removebuildingTongyu() {
        externalRenderers.remove(sceneview, renderer);
    }

    return removebuildingTongyu;
}