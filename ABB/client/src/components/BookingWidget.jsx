import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { user } = useContext(userContext);
  const navigate = useNavigate(); // Fixed missing assignment

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  // Calculate the number of nights based on check-in and check-out dates
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {
    const placeId = place._id;
    let price = numberOfNights * place.price;
    try {
      const response = await axios.post('http://localhost:3000/api/bookings/createbooking', {
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        place: placeId,
        price,
      });

      navigate("/profile");
    } catch (error) {
      console.error("Error booking this place:", error);
    }
  }

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <div className="text-2xl text-pink-600 text-center mb-4">
        Price: ${place.price} / per night
      </div>
      <div className="rounded-lg grid gap-4 md:grid-cols-2">
        <div className="flex items-center">
          <label className="mr-2">Check In:</label>
          <input
            type="date"
            value={checkIn}
            onChange={(ev) => setCheckIn(ev.target.value)}
            className="border rounded-md p-2"
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">Check Out:</label>
          <input
            type="date"
            value={checkOut}
            onChange={(ev) => setCheckOut(ev.target.value)}
            className="border rounded-md p-2"
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">Number of Guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
            className="border rounded-md p-2"
          />
        </div>
        {numberOfNights > 0 && (
          <div className="col-span-2">
            <label className="mr-2">Your Full Name:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className="w-full border rounded-md p-2"
            />
            <label className="mr-2">Phone Number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md">
        Book this place
        {numberOfNights > 0 && (
          <span className="ml-2"> ${numberOfNights * place.price} for {numberOfNights} Nights</span>
        )}
      </button>
    </div>
  );
}
