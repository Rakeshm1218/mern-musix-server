const express = require('express');
const songsController = require('../controllers/songsController');
const router = express.Router();

router.post('/addSong', songsController.addSong);
router.get('/getSongs',songsController.getAllSongs);
router.delete('/deleteSong/:id',songsController.deleteSong)


module.exports = router;