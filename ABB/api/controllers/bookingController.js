const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { checkIn, checkOut, numberOfGuests, name, phone, place, price } = req.body;
    const {token} = req.cookies // Assuming the token is in the request header

    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = decodedToken.id;

    const booking = new Booking({
      user,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place, // Assuming place is a valid placeId
      price,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not create booking' });
  }
};

// Get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch bookings' });
  }
};

// Get a specific booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch booking' });
  }
};

// Get bookings by user ID (Placeholder response)
const userbookings = async (req, res) => {
  try {
    const userId = req.user.id; // You may need to adjust this based on your authentication logic

    // Query bookings by the user's ID or any other criteria
    const bookings = await Booking.find({ user: userId });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: 'Bookings not found for the user' });
    }

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch bookings for the user' });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  userbookings,
};
