import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { userContext } from "../context/userContext";
import Place from "./Place";
import BookPage from "./BookPage";

export default function Profile() {
  const { user, setUser } = useContext(userContext);
  const [showacc, setshowacc] = useState(false);
  const [showbook, setshowbook] = useState(false);

  const logout = async () => {
    try {
      await axios.post('http://localhost:3000/api/user/logout');
      // Handle any additional logic after successful logout
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout failure, if needed
    }
  };

  const handleButtonClick = (showAcc, showBook) => {
    setshowacc(showAcc);
    setshowbook(showBook);
  };

  return (
    <div>
      <div className="flex flex-row justify-center gap-5">
        <button
          onClick={() => handleButtonClick(false, true)}
          className="block w-full rounded-full border border-pink-600 bg-pink-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-pink-600 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
        >
          Show Bookings
        </button>

        <button
          onClick={() => handleButtonClick(true, false)}
          className="block w-full rounded-full border border-pink-600 bg-pink-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-pink-600 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
        >
          Show Accommodations
        </button>

        <Link to="/"> {/* Add your desired link for the "Logout" functionality */}
          <button
            onClick={logout}
            className="block w-full rounded-full border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          >
            Logout
          </button>
        </Link>
      </div>
        {!showacc && !showbook?<Place/>:null}
        {showacc  ? <Place /> : <BookPage/>}
    </div>
  );
}
