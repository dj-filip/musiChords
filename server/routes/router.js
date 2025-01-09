const express = require('express');
const router = express.Router();

const songsRoutes = require('./songs.routes');
const artistsRoutes = require('./artists.routes');
const repertoiresRoutes = require('./repertoires.routes');



router.use('/songs', songsRoutes);
router.use('/artists', artistsRoutes);
router.use('/repertoires', repertoiresRoutes);



module.exports = router;