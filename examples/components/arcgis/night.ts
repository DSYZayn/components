import { DeckLayer, DeckRenderer } from '@deck.gl/arcgis';
import { TripsLayer } from '@deck.gl/geo-layers';
import * as externalRenderers from '@arcgis/core/views/3d/externalRenderers';
import night from '@/assets/new_data.json';

export const night2d = new DeckLayer()

let time = 5;
setInterval(()=>{
    night2d.deck.layers = [new TripsLayer({
        id: 'night-trips',
        data: night,
        getPath: d => d.path,
        getTimestamps: d => d.timestamp,
        getColor:d => d.vendor === 0 ? [253, 128, 93] : [23, 184, 190],
        opacity: 0.8,
        widthMinPixels: 2,
        jointRounded: true,
        fadeTrail: true,
        trailLength: 180,
        currentTime: time,
        shadowEnabled: false
    })]
    time = (time + 1) % 495 + 5;
}, 100)
