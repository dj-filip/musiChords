const express = require('express');
const router = express.Router();

const { artistUpload } = require('../middlewares/uploadMiddleware');
const { addArtist, getArtists, getArtist, getArtistWithSongs } = require('../controllers/artists.controllers');


router.post('/addArtist', artistUpload.single('coverImage'), addArtist);
router.get('/getArtists', getArtists);
router.get('/getArtist', getArtist);
router.get('/:artistId/songs', getArtistWithSongs);



module.exports = router;