const express = require('express');
const router = express.Router();

const { createRepertoire, addSongToRepertoire, getRepertoires, getRepertoire } = require('../controllers/repertoires.controllers');


router.post('/createRepertoire', createRepertoire);
router.post('/addSongToRepertoire', addSongToRepertoire);
router.get('/getRepertoires', getRepertoires);
router.get('/:repertoireId/songs', getRepertoire);


module.exports = router;

