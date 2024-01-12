
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import IndexCard from "./indexCard";
import img from "../assets/landscape.jpeg";
import Footerr from "./Footer";

export default function Index() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/places/getallplaces').then(response => {
      setPlaces(response.data);
    });
  }, []);
  const containerStyle = {
    backgroundImage: `url(${img})`,
  };
  return (
    <div>
      <div className="w-full p-10">
        <div
          className="bg-cover bg-center border rounded-lg w-full h-52 "
          style={containerStyle}
        >
          
          <h1 className=" text-white text-3xl font-extrabold sm:text-5xl text-center mt-10">
            Let us find your
            <strong className="block font-extrabold text-white"> Holiday Home. </strong>
          </h1>
        </div>
      </div>
      <div className="mx-auto p-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {places.length > 0 && places.map(place => (
          <Link key={place._id} to={`/place/${place._id}`}>
            <IndexCard place={place} />
          </Link>
        ))}
      </div>
      <div>
        <Footerr/>
      </div>
    </div>
  );
}
