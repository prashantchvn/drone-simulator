import React, { useEffect, useState } from "react";
import ShowGeoData from "./ShowGeoData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserInputForm() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [geojson, setGeojson] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/waypoints")
      .then((res) => {
        setGeojson(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/waypoints", {
        lat: lat,
        lng: lng,
      })
      .then((res) => {
        setGeojson(res.data.data);
        toast("waypoint added successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  };

  const deleteAll = (e) => {
    e.preventDefault();
    axios
      .delete("http://localhost:5000/api/waypoints")
      .then((res) => {
        setGeojson([]);
        toast("All waypoints deleted successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="flex text-left overflow-hidden max-h-screen">
      <div className="w-3/5 ml-6 p-36">
        <form onSubmit={handleSubmit} className="border-2 p-24">
          <h3 className="text-2xl">
            Hello,
            <br />
            Please Enter co-ordinates for the drone
          </h3>
          <div className="justify-between flex mt-8">
            <label>Lattitude : </label>
            <input
              value={lat}
              onChange={(e) => {
                setLat(e.target.value);
              }}
              min={-90}
              max={90}
              step=".00001"
              className=""
              type="number"
            />
          </div>
          <div className="justify-between flex mt-4">
            <label>Longitude : </label>
            <input
              value={lng}
              onChange={(e) => {
                setLng(e.target.value);
              }}
              min={-180}
              max={180}
              step=".00001"
              className=""
              type="number"
            />
          </div>
          <button
            type="submit"
            className="justify-center w-full text-center mt-8 h-8 rounded-md bg-red-500"
          >
            Add to List
          </button>
        </form>
      </div>
      <div className="w-2/5 ">
        <h3 className="my-4 text-xl font-bold"> Waypoint co-ordinates</h3>
        <ShowGeoData geojson={geojson} />
        {geojson.length ? (
        <div className="flex justify-between ml-6 w-4/5 mt-6">
          <button
            onClick={() => {
              navigate("/simulate/drone");
            }}
            className="w-36 text-white font-semibold h-8 rounded-md bg-red-500 "
          >
            Simulate
          </button>
          <button
            onClick={deleteAll}
            className="w-36 text-white font-semibold h-8 rounded-md bg-red-500 "
          >
            Remove All
          </button>
        </div>
        ) : (
        <div>
          
        </div>
        )}
      </div>
    </div>
  );
}

export default UserInputForm;
