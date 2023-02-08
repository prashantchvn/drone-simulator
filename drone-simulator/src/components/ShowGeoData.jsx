import React from "react";
import geoJson from "./geoJson";
function ShowGeoData() {
  return (
    <div className="px-12 show-waypoint-container overflow-y-scroll">
      {geoJson.map((data, index) => {
        return (
          <div
            key={index}
            className="container-co-ordinates w-96 my-4 mt-2 ml-4"
          >
            Longitude: {data.lat} | Latitude: {data.lng} | time: {data.time}
          </div>
        );
      })}
    </div>
  );
}

export default ShowGeoData;
