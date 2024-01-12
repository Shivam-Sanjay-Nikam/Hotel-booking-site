import { useContext, useEffect, useState } from "react";
import axios from "axios";
// // import AccountNav from "../AccountNav";
import { useNavigate, useParams } from "react-router-dom";
import PhotosUploader from './PhotosUploader'
// import Perks from "../Perks.jsx";

export default function PlacesFormPage() {
    const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);


  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
  
    await axios
      .post('http://localhost:3000/api/places/createplace', placeData)
      .then((response) => {
        // Handle success
        console.log('Place created successfully:', response.data);
        navigate("/profile")
      })
      .catch((error) => {
        // Handle error
        console.error('Error creating place:', error);
        // You might want to set some state to indicate an error or show a message to the user
      });
  }
  

  return (
    <div> 
      <form onSubmit={savePlace} className="max-w-2xl mx-auto mt-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={ev => setTitle(ev.target.value)}
            placeholder="e.g., My lovely apt"
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={ev => setAddress(ev.target.value)}
            placeholder="Address"
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Photos</label>
          <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>


        <div className="mb-4">
          <label htmlFor="extraInfo" className="block text-sm font-medium text-gray-700">
            Extra Info
          </label>
          <textarea
            id="extraInfo"
            value={extraInfo}
            onChange={ev => setExtraInfo(ev.target.value)}
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Check In & Check Out Times</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <label htmlFor="checkInTime" className="block text-xs text-gray-500">Check In Time</label>
              <input
                type="text"
                id="checkInTime"
                value={checkIn}
                onChange={ev => setCheckIn(ev.target.value)}
                placeholder="14"
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="checkOutTime" className="block text-xs text-gray-500">Check Out Time</label>
              <input
                type="text"
                id="checkOutTime"
                value={checkOut}
                onChange={ev => setCheckOut(ev.target.value)}
                placeholder="11"
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="maxGuests" className="block text-xs text-gray-500">Max Number of Guests</label>
              <input
                type="number"
                id="maxGuests"
                value={maxGuests}
                onChange={ev => setMaxGuests(ev.target.value)}
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-xs text-gray-500">Price per Night</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={ev => setPrice(ev.target.value)}
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
          </div>
        </div>

        <button className="primary-button mt-4 bg-pink-500 text-white p-4 w-36 rounded-full">Save</button>
      </form>
    </div>
  );
}
