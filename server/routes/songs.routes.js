const express = require('express');
const router = express.Router();

const { addSong, getSongs } = require('../controllers/songs.controllers');
const requireAuth = require('../middlewares/requireAuth');


router.use(requireAuth);

router.get('/', getSongs);
router.post('/', addSong);


module.exports = router;