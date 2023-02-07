import mapboxgl from "!mapbox-gl";
import React, { useRef, useEffect, useState } from "react";

function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/prashantchvn/cldu952og000z01mzj256jcip",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  mapboxgl.accessToken = process.env.ACCESS_TOKEN;

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
export default MapComponent;
