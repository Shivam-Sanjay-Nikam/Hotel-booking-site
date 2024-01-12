import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BookPage() {
  const [places, setPlaces] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/bookings/getuserbookings');
        setBookings(data);

        const placesData = [];

        for (const booking of data) {
          try {
            const placeId = booking.place;
            const placeInfo = await axios.get(`http://localhost:3000/api/places/getaplacebyid/${placeId}`);
            placesData.push(placeInfo.data);
          } catch (error) {
            console.error(`Error fetching place info for placeId ${placeId}:`, error);
          }
        }

        setPlaces(placesData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means it will run only once when the component mounts

  return (
    <div className="mt-10">
      <h1 className="text-center bg-black p-10 bg-clip-text text-2xl font-extrabold text-transparent sm:text-5xl">
        Your Bookings
      </h1>

      <div>
        {places.length > 0 &&
          places.map((place) => (
            <div key={place._id}>
              <div className="m-7">
                <div className="inline-flex p-4 gap-5 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                  <img className="w-32 h-32 object-cover" src={place.photos[0]} alt="" />
                  <div>
                    <h2 className="text-xl font-bold mb-2">{place.title}</h2>
                    <p className="text-sm mt-2">{place.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
