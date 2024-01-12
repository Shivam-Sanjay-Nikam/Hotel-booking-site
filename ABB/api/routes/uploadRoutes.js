const express = require('express');
const router = express.Router();
const { uploadpics } = require('../controllers/uploadController');
const { requireAuth, isAdmin } = require('../middlewares/authMiddleware');
const upload=require('../middlewares/multerMiddleware')

router.post('/uploadpics', uploadpics);

module.exports = router;
