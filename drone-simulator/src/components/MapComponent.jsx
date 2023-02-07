import * as React from 'react';
import Map from 'react-map-gl';

function MapComponent() {
  return <Map
    initialViewState={{
      longitude: 73.85680938211894,
      latitude:  18.520227555214063,
      zoom: 10
    }}
    mapboxAccessToken={"pk.eyJ1IjoicHJhc2hhbnRjaHZuIiwiYSI6ImNsZHUzdnJoeTAyMmgzeHJmZDl4cDVkb2MifQ.JBUOJpgp3v-dAdXWpYCNXg"}
    style={{width: 2080, height: 1080}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  />;
}
export default MapComponent;