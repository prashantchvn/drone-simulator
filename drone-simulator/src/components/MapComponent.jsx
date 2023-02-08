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
  const [i, setI] = useState(0);
  const [marker,setMarker] = useState({})
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    // Load the data into our compoenent
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
      // initializes map in our window
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/prashantchvn/cldu952og000z01mzj256jcip",
        center: [geojson[0].lat, geojson[0].lng],
        zoom: zoom,
      }).on("load", () => {
        const el = document.createElement("div");
        el.className = "marker";
        setMarker(new mapboxgl.Marker(el)
          .setLngLat([lat, lng])
          .addTo(map.current))
      });
    }
  }, [geojson]);

  
  useEffect(() => {
    updateMarker(i)
  }, [i]);

  const updateMarker = (i) => {
    let waypoint = geojson
    if(isPlaying && i>=waypoint.length && waypoint.length > 0){
      destinationReached()
    }
    if(waypoint[i] && isPlaying){
      marker.setLngLat([waypoint[i].lat,waypoint[i].lng])
    }
  }

  const destinationReached = () =>{
    setIsPlaying(false)
    toast.warn("Destinatin Reached")
  }

  useEffect(() => {
    // update the i value so that drone can increament as we want
    if (geojson.length) {
      const interval = setInterval(() => {
        if (isPlaying) {
          setI((val) => {
            return val + 1;
          });
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [geojson]);

  useEffect(() => {
    // handle the zoom in and zoom out condition of the map
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
            src={isPlaying ? pause : play}
            onClick={() => {
              if(isPlaying){
                // will execute when animation is paused
                setIsPlaying(false)                
              }else{
                // will execute when animation is paused
                setIsPlaying(true)
                if(i >= geojson.length){
                  // will execute when the animation is finished and restarts the animation
                  setI(0)
                  toast("Animation restarted")
                }               
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
