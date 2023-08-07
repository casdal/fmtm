import React, { useEffect, useState } from "react";
import useOLMap from "../hooks/useOlMap";
import { MapContainer as MapComponent } from "../components/MapComponent/OpenLayersComponent";
import LayerSwitcherControl from "../components/MapComponent/OpenLayersComponent/LayerSwitcher/index.js";
import { VectorLayer } from "../components/MapComponent/OpenLayersComponent/Layers";
import CoreModules from "fmtm/CoreModules";
import { CreateProjectActions } from "fmtm/CreateProjectSlice";

const testGeojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          
        ],
      },
    },
  ],}

const DefineAreaMap = ({ uploadedGeojson,setGeojsonFile,uploadedDataExtractFile }) => {
  const dispatch = CoreModules.useDispatch();
  const[dataExtractedGeojson, setDataExtractedGeojson] = useState(null);
  const dividedTaskGeojson = CoreModules.useSelector(
    (state) => state.createproject.dividedTaskGeojson
  );

  const { mapRef, map } = useOLMap({
    // center: fromLonLat([85.3, 27.7]),
    center: [0, 0],
    zoom: 1,
    maxZoom: 25,
  });
  
  

  useEffect(() => {
    if(dividedTaskGeojson){

    }else if(uploadedGeojson) {
      const fileReader = new FileReader();
      fileReader.readAsText(uploadedGeojson, "UTF-8");
      fileReader.onload = (e) => {
        dispatch(CreateProjectActions.SetDividedTaskGeojson(e.target.result));
      };
    }else{
      dispatch(CreateProjectActions.SetDividedTaskGeojson(null));
    }
  }, [uploadedGeojson]);
  useEffect(() => {
    if (uploadedDataExtractFile) {
      const fileReader = new FileReader();
      fileReader.readAsText(uploadedDataExtractFile, "UTF-8");
      fileReader.onload = (e) => {
        setDataExtractedGeojson(e.target.result);
      };
    }else{
    }
  }, [uploadedDataExtractFile]);
  return (
    <div className="map-container" style={{ height: "600px", width: "100%" }}>
      <MapComponent
        ref={mapRef}
        mapInstance={map}
        className="map naxatw-relative naxatw-min-h-full naxatw-w-full"
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <LayerSwitcherControl />
        <VectorLayer
            geojson={testGeojson}
            viewProperties={{
              size: map?.getSize(),
              padding: [50, 50, 50, 50],
              constrainResolution: true,
              duration: 2000,
            }}
            onDraw={(geojson) => {}}
            zoomToLayer
          />
        {dividedTaskGeojson && (
          <VectorLayer
            geojson={dividedTaskGeojson}
            viewProperties={{
              size: map?.getSize(),
              padding: [50, 50, 50, 50],
              constrainResolution: true,
              duration: 2000,
            }}
            onModify={(modifiedGeojson)=>{
              console.log(JSON.parse(modifiedGeojson));
              const parsedJSON = JSON.parse(modifiedGeojson)
              var f = new File([modifiedGeojson], "AOI.geojson", {type: "application/geo+json" })
              setGeojsonFile(f);
            }}
            onDraw={(geojson) => {}}
            zoomToLayer
          />
        )}
        {dataExtractedGeojson && (
          <VectorLayer
            geojson={dataExtractedGeojson}
            // stylestyle={{
            //     ...getStyles,
            //     fillOpacity: 100,
            //     lineColor: getStyles.fillColor,
            //     lineThickness: 7,
            //     lineOpacity: 40,
            // }}
            viewProperties={{
              // easing: elastic,
              // animate: true,
              size: map?.getSize(),
              // maxZoom: 15,
              padding: [50, 50, 50, 50],
              // duration: 900,
              constrainResolution: true,
              duration: 2000,
            }}
            // zoomToLayer
          />
        )}
      </MapComponent>
    </div>
  );
};

export default DefineAreaMap;
