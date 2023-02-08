import React from "react";
function ShowGeoData({ geojson }) {
  if (geojson.length) {
    return (
      <div className="px-12 show-waypoint-container overflow-y-scroll">
        {geojson.map((data, index) => {
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
  } else {
    return (
      <div className="px-12 show-waypoint-container overflow-y-scroll">
        <div className="container-co-ordinates w-96 my-4 mt-2 ml-4">
          No data to show here
        </div>
      </div>
    );
  }
}

export default ShowGeoData;
