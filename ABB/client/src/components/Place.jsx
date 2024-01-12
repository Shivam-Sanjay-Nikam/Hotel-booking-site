import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AccCard from "./AccCard";

export default function Place() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/places/getaplace')
      .then(({ data }) => setPlaces(data))
      .catch(error => console.error("Error fetching places:", error));
  }, []);

  return (
    <div className="mt-10">
      <h1 className="text-center bg-black p-10 bg-clip-text text-2xl font-extrabold text-transparent sm:text-5xl">
        Your Accommodations
      </h1>

      <div className="text-center mt-7">
        <Link to="/places/new" className="inline-flex gap-1 bg-pink-500 text-white py-2 px-6 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add new place
        </Link>
      </div>

      <AccCard places={places} />
    </div>
  );
}
