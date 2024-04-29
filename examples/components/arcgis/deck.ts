import { DeckLayer, DeckRenderer } from '@deck.gl/arcgis';
import { TripsLayer } from '@deck.gl/geo-layers';
import trips from '@/assets/trips-v7.json';
import * as externalRenderers from '@arcgis/core/views/3d/externalRenderers';

type DataType = {
  waypoints: {
    coordinates: [longitude: number, latitude: number];
    timestamp: number;
  }[]
};


   

export const deckLayer2d = new DeckLayer()

setInterval(()=>{
deckLayer2d.deck.layers = [new TripsLayer({
    id: 'TripsLayer',
    data: trips,
    getPath: (d) => { return d.path; },
    getTimestamps: (d) => { return d.timestamps; },
    getColor: (d) => { return (d.vendor === 0 ? [253, 128, 93] : [23, 184, 190]); },
    opacity: 1.0,
    widthMinPixels: 4,
    rounded: true,
    trailLength: 180,
    currentTime: (performance.now() % 20000) / 10,
    shadowEnabled: false
})];
}, 50)

export function deckRenderer3d (sceneview: __esri.SceneView) {
    const renderer = new DeckRenderer(sceneview, {})

    setInterval(()=>{
    renderer.deck.layers = [new TripsLayer({
        id: 'TripsLayer',
        title: '3dTripsLayer',
        data: trips,
        getPath: (d) => { return d.path; },
        getTimestamps: (d) => { return d.timestamps; },
        getColor: (d) => { return (d.vendor === 0 ? [253, 128, 93] : [23, 184, 190]); },
        opacity: 1.0,
        widthMinPixels: 4,
        rounded: true,
        trailLength: 180,
        currentTime: (performance.now() % 20000) / 10,
        shadowEnabled: false
    })];
    }, 50)   

    externalRenderers.add(sceneview, renderer)

    function removeRenderer() {
        externalRenderers.remove(sceneview, renderer)
    }
    return removeRenderer
} 

