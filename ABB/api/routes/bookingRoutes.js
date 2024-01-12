const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBookingById,
  userbookings,
} = require('../controllers/bookingController');
const { requireAutho, isAdmin } = require('../middlewares/authMiddleware');

// Create a new booking
router.post('/createbooking', createBooking);
// Get user's bookings
router.get('/getuserbookings', requireAutho, userbookings);
// Get a specific booking by ID
router.get('/:id', getBookingById);
// Get all bookings
router.get('/', getBookings);






module.exports = router;
