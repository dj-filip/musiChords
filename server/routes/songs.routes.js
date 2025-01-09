const express = require('express');
const router = express.Router();

const { addSong, getSongs } = require('../controllers/songs.controllers');


router.post('/addSong', addSong);
router.get('/getSongs', getSongs);


module.exports = router;