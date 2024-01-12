const express = require('express');
const router = express.Router();
const {
  createPlace,
  updatePlace,
  getallPlaces,
  getaPlace,
  deleteaPlace,
  getaPlacebyid
} = require('../controllers/placeController');
const { requireAutho, isAdmin } = require('../middlewares/authMiddleware');

// Route to create a place
router.post("/createplace", createPlace);

// Route to update a place
router.put("/updateplace/:placeId", requireAutho, updatePlace);

// Route to get all places
router.get("/getallplaces",requireAutho,getallPlaces);

// Route to get a specific place
router.get("/getaplace",requireAutho, getaPlace);
router.get("/getaplacebyid/:id", getaPlacebyid);

// Route to delete a place
router.delete("/deleteplace/:placeId", requireAutho, deleteaPlace);

module.exports = router;
