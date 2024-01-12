import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BookingWidget from "./BookingWidget";
import PlaceGallery from "./PlaceGallery";

export default function PlacePage() {
  const { id } = useParams(); // Extract the 'id' from the URL params
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const fetchPlaceById = async () => {
      try {
        if (!id) {
          return;
        }

        const response = await axios.get(`http://localhost:3000/api/places/getaplacebyid/${id}`);
        setPlace(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching place:", error);
      }
    };

    fetchPlaceById();
  }, [id]);

  if (!place) {
    return null;
  }

  const {
    title,
    address,
    description,
    checkIn,
    checkOut,
    maxGuests,
    extraInfo,
  } = place;

  return (
    <div className="container mx-auto p-8 bg-gray-100">
      <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-8">{title}</h1>
      <div className="text-lg text-gray-600 mb-8 text-center font-sans">{address}</div>
      <PlaceGallery place={place}/>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 mt-7">
        <div>
          <div className="my-4">
            <h2 className="text-2xl text-gray-800 font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{description}</p>
          </div>
          <p className="text-gray-800 mb-4">
            Check-in: {checkIn} <br />
            Check-out: {checkOut} <br />
            Max number of guests: {maxGuests}
          </p>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white mt-8 px-8 py-8 border-t shadow-md">
        <div>
          <h2 className="text-2xl text-gray-800 font-semibold">Extra info</h2>
        </div>
        <div className="text-sm text-gray-700 leading-5 mt-2">{extraInfo}</div>
      </div>
    </div>
  );
}
