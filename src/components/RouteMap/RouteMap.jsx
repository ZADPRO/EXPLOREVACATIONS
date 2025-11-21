// import { GoogleMap, DirectionsService, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";
// import { useState } from "react";

// export default function RouteMap({ from, to }) {
//   const [directions, setDirections] = useState(null);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
//   });

//   if (!isLoaded) return <div>Loading Map...</div>;

//   return (
//     <GoogleMap
//       center={{ lat: from.lat, lng: from.lng }}
//       zoom={7}
//       mapContainerStyle={{ width: "100%", height: "300px", borderRadius: "8px" }}
//       options={{
//         disableDefaultUI: true,
//         styles: [{ featureType: "all", stylers: [{ saturation: -100 }] }] // grey map style
//       }}
//     >
//       {!directions && (
//         <DirectionsService
//           options={{
//             origin: { lat: from.lat, lng: from.lng },
//             destination: { lat: to.lat, lng: to.lng },
//             travelMode: "DRIVING"
//           }}
//           callback={result => result && setDirections(result)}
//         />
//       )}

//       {directions && (
//         <DirectionsRenderer
//           options={{
//             directions,
//             polylineOptions: {
//               strokeColor: "#FFA500", // Orange route
//               strokeWeight: 6,
//             },
//             suppressMarkers: false,
//           }}
//         />
//       )}
//     </GoogleMap>
//   );
// }
