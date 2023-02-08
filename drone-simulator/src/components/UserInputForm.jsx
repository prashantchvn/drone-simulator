import React, { useState } from "react";
import ShowGeoData from "./ShowGeoData";

function UserInputForm() {

    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(lat + " " + lng)
    }

  return (
    <div className="flex text-left overflow-hidden max-h-screen">
      <div className="w-3/5 ml-6 p-11">
        <form onSubmit={handleSubmit}>
          <h3 className="">Hello,</h3>
          <label>Please Enter co-ordinates for the lattitude : </label>
          <input value={lat} onChange={(e)=>{ setLat(e.target.value)}} min={-90} max={90} step=".00001" className="" type="number" />
          <br/>
          <label>Please Enter co-ordinates for the Longitude : </label>
          <input value={lng} onChange={(e)=>{ setLng(e.target.value)}}  min={-180} max={180} step=".00001" className="" type="number" />
          <br/>
          <button type="submit">Add to List</button>
        </form>
      </div>
      <div className="w-2/5 max-h-screen overflow-y-scroll">
        <ShowGeoData />
      </div>
    </div>
  );
}

export default UserInputForm;
