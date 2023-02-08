import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState } from "react";
import geojson from "./geoJson";
import pause from "../icons/pause.png";
import play from "../icons/play.png";
import { toast } from "react-toastify";

function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(geojson[0].lat);
  const [lat, setLat] = useState(geojson[0].lng);
  const [zoom, setZoom] = useState(18.5);
  //marker for the map
  let marker;
  let mapInstance;
  let isPlaying = true;

  let i = 1;

  useEffect(() => {
    if (map.current) return; // initialize map only once
    mapInstance = map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/prashantchvn/cldu952og000z01mzj256jcip",
      center: [lng, lat],
      zoom: zoom,
    }).on("load", () => {
      const el = document.createElement("div");
      el.className = "marker";
      marker = new mapboxgl.Marker(el).setLngLat([lat, lng]).addTo(mapInstance);
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        if (i >= geojson.length){
          isPlaying = false;
          toast("Drone reached destination")
        }; // breaking condition
        marker.setLngLat([geojson[i].lat, geojson[i].lng]);
        i++;
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  mapboxgl.accessToken =
    "pk.eyJ1IjoicHJhc2hhbnRjaHZuIiwiYSI6ImNsZHUzdnJoeTAyMmgzeHJmZDl4cDVkb2MifQ.JBUOJpgp3v-dAdXWpYCNXg";

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className="sidebar-right">
        <img
          src={play}
          onClick={() => {
            if(!isPlaying){
              isPlaying = true;
              toast("Animation Resumed");  
            }
          }}
        />
        <img
          src={pause}
          onClick={() => {
            if (isPlaying) {
              isPlaying = false;
              toast("Animation Paused");
            }
          }}
        />
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
export default MapComponent;
