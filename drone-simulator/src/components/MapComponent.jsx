import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState } from "react";

function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(73.85663772073566);
  const [lat, setLat] = useState(18.520064783835046);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    let mapInstance = map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/prashantchvn/cldu952og000z01mzj256jcip",
      center: [lng, lat],
      zoom: zoom,
    }).on("load",() => {
      const el = document.createElement("div");
      el.className = "marker";
      new mapboxgl.Marker(el)
        .setLngLat([73.85663772073566, 18.520064783835046])
        .addTo(mapInstance);
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    if (!map.current) return;
  }, []);

  mapboxgl.accessToken =
    "pk.eyJ1IjoicHJhc2hhbnRjaHZuIiwiYSI6ImNsZHUzdnJoeTAyMmgzeHJmZDl4cDVkb2MifQ.JBUOJpgp3v-dAdXWpYCNXg";

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
export default MapComponent;
