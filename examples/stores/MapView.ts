import { defineStore } from 'pinia'
import Map from '@arcgis/core/Map';
import { type DeckRenderer } from '@deck.gl/arcgis';
import MapView from '@arcgis/core/views/MapView';
import SceneView from '@arcgis/core/views/SceneView';
import LayerList from '@arcgis/core/widgets/LayerList';
import CoordinateConversion from '@arcgis/core/widgets/CoordinateConversion';
import Zoom from '@arcgis/core/widgets/Zoom';
import TiandituLayer from "@heyzayn/arcgis-tdtlayer";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import WGS84 from "@arcgis/core/geometry/SpatialReference";
import { deckLayer2d, deckRenderer3d } from '@/components/arcgis/deck';
import { buildings3d } from '@/components/arcgis/buildings';
import { buildingsTongyu } from '@/components/arcgis/tongyuBuildings';

const tags:string[] = []
export const useMapViewStore = defineStore('useMapView', ()=>{
    const mapDiv = document.createElement('div');
    mapDiv.style.height = '100%';
    mapDiv.style.width = '100%';

    // const Ports = getPortsFeatureLayer(import.meta.env.VITE_PORT_MAPSERVER, ["*"])
    const tiandituImg = new TiandituLayer<WGS84>(
                    {
                      title:"天地图影像",
                      urlTemplate: "http://{subDomain}.tianditu.gov.cn/vec_w/wmts",
                      effect: 'grayscale(1) invert(0.8) contrast(0.9) brightness(1.1) saturate(3) sepia(0.11)'
                    },
                    SpatialReference.WebMercator,
                    import.meta.env.VITE_TIANDITU_ESRI);
    const tiandituPoi = new TiandituLayer<WGS84>({
                      title:"天地图注记",
                      urlTemplate: "http://{subDomain}.tianditu.gov.cn/cva_w/wmts"
                    },
                    SpatialReference.WebMercator,
                    import.meta.env.VITE_TIANDITU_ESRI)
    
    // const map = new Map({
    //     basemap:{
    //         baseLayers:[tiandituImg, tiandituPoi]
    //     }
    // })
    const map = new Map({
        basemap: 'dark-gray-vector'
    })
    
    
    const mapview = new MapView({
        container: mapDiv,
        map: map,
        spatialReference:SpatialReference.WebMercator,
        center:[-74.0022, 40.714177],
        zoom: 10,
        ui:{
            components:[]
        }
        // ui:{
        //     components:["zoom"]
        // }
    })
    mapview.map.add(deckLayer2d);
    //设置mapview 的Popup自启动状态

    const SceneMapview = new SceneView({
        map:map,
        camera: {
            heading: 45,
            position: {
                x: -74.0022,
                y: 40.714177,
                z: 3000
            },
            tilt: 45,
            fov: 55
        },
        zoom: 10,
        spatialReference: SpatialReference.WebMercator,
        viewingMode: "local"
    })

    let removeRenderer:ReturnType<typeof deckRenderer3d> | null = deckRenderer3d(SceneMapview);
    // let removeBuildings:ReturnType<typeof buildings3d> | null = buildings3d(SceneMapview);
    let removebuildingTongyu:ReturnType<typeof buildingsTongyu> | null = buildingsTongyu(SceneMapview);

    SceneMapview.popupEnabled = false;
    mapview.popupEnabled = false;

    let appConfig:{
        mapView: MapView,
        sceneView: SceneView,
        activeView: MapView | SceneView extends __esri.View ? MapView | SceneView : never,
        container: HTMLElement
    } = {
        mapView:mapview,
        sceneView:SceneMapview,
        activeView:mapview,
        container:mapDiv
    }

    const LayerListWidget = new LayerList({
        view:mapview
    })
    const zoomWidget = new Zoom({
        view:mapview
    })
    const CoordinateConversionWidget = new CoordinateConversion({
        view:mapview
    })
    mapview.ui.add([LayerListWidget, CoordinateConversionWidget, zoomWidget], "top-left")
    async function loadMap(container:string){
        document.getElementById(container)?.appendChild(mapDiv)
    }
    async function unloadMap(container:string){
        document.getElementById(container)?.removeChild(mapDiv)
    }
    function getMap(){
        return map
    }
    function getMapView(){
        return mapview
    }
    function getMapDiv(){
        return mapDiv
    }
    function getMapViewDiv(){
        return mapDiv
    }

    function injectOverlay(element:HTMLElement | null, tag:string){
        if(tags.filter((val)=>val===tag)) return
        if(!element) return;
        tags.push(tag)
        console.log(tags);
        
        const overlayRoot = mapDiv.getElementsByClassName("esri-overlay-surface").item(0)
        console.log(overlayRoot);
        
        overlayRoot?.appendChild(element)
    }

    function getViewSurfaceDiv():Element | undefined{
        return mapDiv.getElementsByClassName("esri-overlay-surface")[0]
    }

    function getSceneView():SceneView{
        return SceneMapview
    }

    function setView(dimension: "2d" | "3d" extends string ? "2d" | "3d" : never) {
        const is3D = appConfig.activeView.type === "3d";
        const activeViewpoint = appConfig.activeView.viewpoint.clone();
        const zoomLevel = appConfig.activeView.zoom;
        const emptyDiv = document.createElement("div"); // create a temporary empty div to offload the active view, but actually it's put in a buffer div

        if (is3D && dimension === "2d") {
            //resolve deck.gl layer

            removeRenderer? removeRenderer() : null; //remove previous renderer
            // removeBuildings? removeBuildings() : null; //remove previous buildings
            removebuildingTongyu? removebuildingTongyu() : null; //remove previous buildings
 
            SceneMapview.container = emptyDiv;
            appConfig.activeView = mapview;
            mapview.container = mapDiv;

            mapview.map.add(deckLayer2d);
            mapview.viewpoint = activeViewpoint;
            mapview.zoom = zoomLevel;
       } else if (!is3D && dimension === "3d") {
            //resolve deck.gl layer
            map.remove(deckLayer2d); //必须在设置container之前调用
            
            mapview.container = emptyDiv;
            appConfig.activeView = SceneMapview;
            SceneMapview.container = mapDiv;
            removeRenderer = deckRenderer3d(SceneMapview); //必须在设置container之后调用
            // removeBuildings = buildings3d(SceneMapview); //必须在设置container之后调用
            removebuildingTongyu = buildingsTongyu(SceneMapview); //必须在设置container之后调用
            SceneMapview.viewpoint = activeViewpoint;
            SceneMapview.zoom = zoomLevel;

        }
    }

    function toggleView() {
        const is3D = appConfig.activeView.type === "3d";
        if (is3D) {
            setView("2d");
        } else {            
            setView("3d");
        }
    }


    return {loadMap, unloadMap, getMap, getMapView, getMapDiv, getMapViewDiv, injectOverlay, getViewSurfaceDiv, getSceneView, setView, toggleView}
})