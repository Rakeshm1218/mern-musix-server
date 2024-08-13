const playlistController = require('../controllers/playlistController');
const express = require('express');
const router = express.Router();
const auth = require('../middleswares/auth')


router.post('/createPlaylist',auth, playlistController.addSongtoPlaylist);
router.get('/getplaylist',auth, playlistController.getPLaylistItems);

module.exports = router;