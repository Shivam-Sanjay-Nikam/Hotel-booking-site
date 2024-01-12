
const jwt=require('jsonwebtoken')
// Import any necessary models or dependencies
const Place = require('../models/Place'); // Import your Place model or database schema

// Controller to create a new place
const createPlace = async (req, res) => {
    try {
      const { title, address, addedPhotos, description, price,  extraInfo, checkIn, checkOut, maxGuests } = req.body;
      const{token}=req.cookies;
      const photos=addedPhotos
      const decodedToken = jwt.verify(token, process.env.SECRET);
      const owner = decodedToken.id;
      const place = new Place({
        owner,
        title,
        address,
        photos,
        description,
        price,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
  
      await place.save(); // Save the new place to the database
  
      res.status(201).json(place); // Respond with the created place
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// Controller to update a place
const updatePlace = async (req, res) => {
  const placeId = req.params.placeId; // Extract the placeId from the URL parameter
  try {
    // Find the place by ID and update its properties
    const updatedPlace = await Place.findByIdAndUpdate(placeId, req.body, { new: true });

    if (!updatedPlace) {
      return res.status(404).json({ error: 'Place not found' });
    }

    res.status(200).json(updatedPlace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to get all places
const getallPlaces = async (req, res) => {
  try {
    const places = await Place.find(); // Fetch all places from the database

    res.status(200).json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to get a specific place by ID
const getaPlace = async (req, res) => {
  const userId = req.user._id;
  try {
    const place = await Place.find({owner:userId}); // Find the place by ID

    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }

    res.status(200).json(place);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to delete a place by ID
const deleteaPlace = async (req, res) => {
  const placeId = req.params.placeId; // Extract the placeId from the URL parameter
  try {
    const deletedPlace = await Place.findByIdAndDelete(placeId); // Find and delete the place by ID

    if (!deletedPlace) {
      return res.status(404).json({ error: 'Place not found' });
    }

    res.status(204).send(); // Respond with no content for successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// This function retrieves a place by its ID
const getaPlacebyid = async (req, res) => {
  try {
    // Retrieve the place by its ID from the database
    const placeId = req.params.id; // Assuming you're passing the ID as a route parameter
    const place = await Place.findById(placeId);

    // Check if the place exists
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }

    // If the place exists, send it in the response
    res.json(place);
  } catch (err) {
    // Handle any errors that occur during the request
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  createPlace,
  updatePlace,
  getallPlaces,
  getaPlace,
  deleteaPlace,
  getaPlacebyid,
};
