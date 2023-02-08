import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState } from "react";
import pause from "../icons/pause.png";
import play from "../icons/play.png";
import { toast } from "react-toastify";
import axios from "axios";

function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState();
  const [lat, setLat] = useState();
  const [zoom, setZoom] = useState(18.5);
  //marker for the map
  let marker;
  let mapInstance;
  let isPlaying = true;
  let geojson = [];

  let i = 1;

  useEffect(() => {
    axios.get("http://localhost:5000/api/waypoints").then((res) => {
      geojson = res.data.data;
      setLat(geojson[0].lat);
      setLng(geojson[0].lng);
      mapInstance = map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/prashantchvn/cldu952og000z01mzj256jcip",
        center: [geojson[0].lat,geojson[0].lng],
        zoom: zoom,
      }).on("load", () => {
        const el = document.createElement("div");
        el.className = "marker";
        marker = new mapboxgl.Marker(el)
          .setLngLat([geojson[0].lat,geojson[0].lng])
          .addTo(mapInstance);
      });
    });
  });

  useEffect(() => {
    console.log(2);
    // const interval = setInterval(() => {
    //   if (isPlaying) {
    //     if (i >= geojson.length){
    //       isPlaying = false;
    //       toast("Drone reached destination")
    //     }; // breaking condition
    //     marker.setLngLat([geojson[i].lat, geojson[i].lng]);
    //     i++;
    //   }
    // }, 2000);
    // return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(3);
    // if (!map.current) return; // wait for map to initialize

    // map.current.on("move", () => {
    //   setLng(map.current.getCenter().lng.toFixed(4));
    //   setLat(map.current.getCenter().lat.toFixed(4));
    //   setZoom(map.current.getZoom().toFixed(2));
    // });
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
            if (!isPlaying) {
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
