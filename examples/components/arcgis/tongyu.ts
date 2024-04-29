import { DeckLayer, DeckRenderer } from '@deck.gl/arcgis';
import { TripsLayer } from '@deck.gl/geo-layers';
import tongyu from '@/assets/Tongyu.json'

type DataType = {
  waypoints: {
    coordinates: [longitude: number, latitude: number];
    timestamp: number;
  }[]
};
export const tongyuBoundary = new DeckLayer()

function getBoundary(data:{
    path: number[][];
    timestamps: number[];
}) {
    let new_data:DataType[] = [{waypoints: []}]
    let length = 0;
    data.path.forEach((p, i) => {
        new_data[0].waypoints.push({
            coordinates: [p[0], p[1]],
            timestamp: i
        })
        length = i
    })

    return {new_data, length}
}
const bdr = getBoundary(tongyu)
console.log(bdr);

let time=1;
setInterval(()=>{
    tongyuBoundary.deck.layers = [new TripsLayer({
        id: 'tongyu',
        data: bdr.new_data,
        getPath: (d: DataType) => d.waypoints.map(p => p.coordinates),
        getTimestamps: (d: DataType) => d.waypoints.map(p => p.timestamp),
        getColor: [253, 128, 93],
        opacity: 1.0,
        widthMinPixels: 4,
        rounded: true,
        trailLength: 1800,
        currentTime:time,
    })];
    time = (time + 1) % bdr.length;
}, 5)
    
