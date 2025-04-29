const express = require('express');
const router = express.Router();

const { artistUpload } = require('../middlewares/uploadMiddleware');
const { addArtist, getArtists, getArtist, getArtistWithSongs } = require('../controllers/artists.controllers');
const requireAuth = require('../middlewares/requireAuth');


router.use(requireAuth);

router.get('/', getArtists);
router.post('/', artistUpload.single('coverImage'), addArtist);
router.get('/:id', getArtist);
router.get('/:artistId/songs', getArtistWithSongs);



module.exports = router;