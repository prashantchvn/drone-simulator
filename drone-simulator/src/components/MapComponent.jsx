import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import pause from "../icons/pause.png";
import play from "../icons/play.png";
import { toast } from "react-toastify";

function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState();
  const [lat, setLat] = useState();
  const [zoom, setZoom] = useState(18.5);
  const [geojson, setGeojson] = useState([]);
  const [i,setI] = useState(0)
  //marker for the map
  let marker;
  let mapInstance;
  let isPlaying = true;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/waypoints")
      .then((res) => {
        setGeojson(res.data.data);
        setLat(res.data.data[0].lat);
        setLng(res.data.data[0].lng);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  }, []);

  useEffect(() => {
    if (geojson.length) {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/prashantchvn/cldu952og000z01mzj256jcip",
        center: [geojson[0].lat, geojson[0].lng],
        zoom: zoom,
      }).on("load", () => {
        const el = document.createElement("div");
        el.className = "marker";
        marker = new mapboxgl.Marker(el)
          .setLngLat([lat,lng])
          .addTo(map.current);
      });
    }
  },[geojson]);

  useEffect(() => {
    if (geojson.length) {
      const interval = setInterval(() => {
        if (isPlaying) {
          if (i >= geojson.length) {
            isPlaying = false;
            toast("Drone reached destination");
          } // breaking condition
          marker.setLngLat([lat, lng]);
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [geojson]);

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

  if (geojson.length) {
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
  } else {
    return <h3>loading ...</h3>;
  }
}
export default MapComponent;
