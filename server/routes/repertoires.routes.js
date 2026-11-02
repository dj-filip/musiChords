const express = require('express');
const router = express.Router();

const {
  createRepertoire,
  addSongToRepertoire,
  getRepertoires,
  getRepertoireSongs,
  removeSongFromRepertoire,
  removeRepertoire
} = require('../controllers/repertoires.controllers');

router.get('/', getRepertoires);
router.post('/', createRepertoire);
router.delete('/:id', removeRepertoire);
router.get('/:id/songs', getRepertoireSongs);
router.post('/:id/songs', addSongToRepertoire);
router.delete('/:repertoireId/songs/:songId', removeSongFromRepertoire);


module.exports = router;

