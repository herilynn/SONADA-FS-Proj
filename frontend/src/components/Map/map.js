import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useHistory } from "react-router-dom";
import "./map.css";
export default function StreetMap() {
  const { isLoaded, url, loadError } = useLoadScript({
    googleMapsApiKey:  process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) return <div>Loading...</div>;
  if (loadError) return <div>Error loading maps, check your API key</div>;
  return (
    <div>
      <Map />
    </div>
  );
}
function Map() {
  const center = useMemo(() => ({ lat: 41, lng: -75 }), []);
  const groups = useSelector((state) => state.groups);
  const history = useHistory();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const markerPositions = useMemo(
    () =>
      Array.isArray(groups)
        ? groups.map((group) => ({
            lat: parseFloat(group.latitude),
            lng: parseFloat(group.longitude),
          }))
        : [],
    [groups]
  );

  const handleMarkerHover = (marker) => {
    setSelectedMarker(marker);
  };
  const handleMarkerHoverLeave = () => {
    setSelectedMarker(null);
  };
  return (
    <div className="map-container">
      <GoogleMap zoom={14} center={center} mapContainerClassName="map-container">
        {markerPositions.map((position, index) => (
          <Marker
            key={index}
            position={position}
            // icon={{
            //   url: require("./mapmarkers.png"),
            //   scaledSize: new window.google.maps.Size(80, 50),
            // }}
            onMouseOver={() => handleMarkerHover(groups[index])}
            onMouseOut={handleMarkerHoverLeave}
            // onClick={() => handleMarkerClick(groups[index]._id)}
          >
            {selectedMarker === groups[index] && (
              <InfoWindow
                options={{
                  disableCloseButton: true,
                }}
              >
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
}


// import {React, useMemo} from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// export default function Home() {
//     const {isLoaded} = useLoadScript({
//         googleMapsAPIKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY})
        
//         if (!isLoaded) return <div>Loading...</div>
//         return <div> <Map/> </div>;    
// }
// function Map() {
//     return (
//         <GoogleMap
//         zoom={10}
//         center={{lat: 44, lng: -80}}
//         mapContainerClassName="map-container">
            
//         </GoogleMap>
//     )
// }



