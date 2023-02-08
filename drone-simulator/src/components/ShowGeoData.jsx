import React from 'react'
import geoJson from "./geoJson"
function ShowGeoData() {
  return (
    <div>
        {
            geoJson.map((data, index)=>{
                return(
                    <div key={index} className='text-left my-4'>
                        <h2>{index+1}'th Data Points</h2>
                        <h3 className='ml-2'>Lattitude : {data.lat} </h3>
                        <h3 className='ml-2'>Longitude : {data.lng} </h3>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ShowGeoData