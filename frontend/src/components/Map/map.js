// import React, { useMemo, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import "./map.css";
// import { fetchGroups } from "../../store/group";

// export default function StreetMap() {
//   const dispatch = useDispatch();
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//   });

//   useEffect(() => {
//     dispatch(fetchGroups()); 
//   }, [dispatch]);

//   if (!isLoaded) return <div>Loading...</div>;
//   if (loadError) return <div>Error loading maps, check your API key</div>;

//   return <Map />;
// }

// function Map() {
//   const groups = useSelector((state) => state.groups);

//   const markerPositions = useMemo(() => {
//     return Array.isArray(groups)
//       ? groups.map((group) => ({
//           lat: parseFloat(group.latitude),
//           lng: parseFloat(group.longitude),
//         }))
//       : [];
//   }, [groups]);

//   const center = useMemo(() => {
//     if (groups.length > 0) {
//       const { latitude, longitude } = groups[0];
//       return { lat: parseFloat(latitude), lng: parseFloat(longitude) };
//     }
//     return null; 
//   }, [groups]);

//   return (
//     <div className="map-container">
//       <GoogleMap
//         zoom={14}
//         center={center || undefined} 
//         mapContainerClassName="map-container"
//       >
//         {markerPositions.map((position, index) => (
//           <Marker key={index} position={position} />
//         ))}
//       </GoogleMap>
//     </div>
//   );
// }



// import React, { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
// import "./map.css";

// export default function StreetMap() {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//   });

//   if (!isLoaded) return <div>Loading...</div>;
//   if (loadError) return <div>Error loading maps, check your API key</div>;

//   return (
//       <div>
//       <Map />
//     </div>
//   );
// }

// function Map() {
//   const groups = useSelector((state) => state.groups);

//   const markerPositions = useMemo(() => {
//     return Array.isArray(groups)
//       ? groups.map((group) => ({
//           lat: parseFloat(group.latitude),
//           lng: parseFloat(group.longitude),
//         }))
//       : [];
//   }, [groups]);

//   const center = useMemo(() => {
//     if (groups.length > 0) {
//       const { latitude, longitude } = groups[0];
//       return { lat: parseFloat(latitude), lng: parseFloat(longitude) };
//     }
//     return { lat: 41, lng: -75 };
//   }, [groups]);
//   console.log(groups)

//   return (
//       <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
//         {markerPositions.map((position, index) => (
//           <Marker key={index} position={position} />
//         ))}
//       </GoogleMap>
//   );
// }



import {React, useMemo} from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./map.css";

export default function Home({center}) {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY})

        console.log(isLoaded)

        if (!isLoaded) return <div>Loading...</div>
         
        return (
            <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName="map-container">
                
            </GoogleMap>
        );    
}
// function Map() {
//     return (
//         <GoogleMap
//         zoom={10}
//         center={{lat: 44, lng: -80}}
//         mapContainerClassName="map-container">
            
//         </GoogleMap>
//     )
// }



