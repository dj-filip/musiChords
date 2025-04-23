const Repertoire = require("../models/repertoireModel");


exports.getRepertoires = async (req, res) => {
  try {
    data = await Repertoire.find();
    res.send(data);
  } catch (error) {
    console.log('Error fetching repertoires from database', error);
  }
}

exports.getRepertoire = async (req, res) => {
  try {
    const { id: repertoireId } = req.params;
    const repertoire = await Repertoire.findById(repertoireId).populate('songs.song');

    if (!repertoire) {
      return res.status(404).json({ message: 'Repertoire not found' });
    }

    res.status(200).json(repertoire);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching repertoire', error });
  }
}


exports.createRepertoire = async (req, res) => {
  try {
    const { name } = req.body;

    const newRepertoire = new Repertoire({ name, songs: [] });

    await newRepertoire.save();
    res.status(201).json({ message: 'Repertoire added successfully', newRepertoire });
  } catch (error) {
    res.status(500).json({ message: 'Error adding repertoire', error });
  }
}


exports.removeRepertoire = async (req, res) => {
  try {
    const { id: repertoireId } = req.params;

    const removeRepertoire = await Repertoire.deleteOne({ _id: repertoireId });

    if (removeRepertoire.deletedCount === 0) {
      return res.status(404).json({ message: 'Repertoire not found' }); 
    }

    res.status(200).json({ message: 'Repertoire removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting repertoire', error });
  }
}


exports.addSongToRepertoire = async (req, res) => {
  try {
    const { id: repertoireId } = req.params;
    const { songId } = req.body;
    
    const repertoire = await Repertoire.findById(repertoireId);

    const existingSong = repertoire.songs.find(
      (s) => s.song.toString() === songId
    );

    if (existingSong) {
      return res.status(400).json({
        message: 'Song already exists in the repertoire',
      });
    }

    const nextOrder = repertoire.songs.length > 0
      ? Math.max(...repertoire.songs.map(s => s.order)) + 1
      : 0;

    repertoire.songs.push({ song: songId, transposeStep: 0, order: nextOrder });

    await repertoire.save();
    res.status(201).json({ message: 'Song added to repertoire successfully', repertoire });
  } catch (error) {
    res.status(500).json({ message: 'Error adding song to repertoire', error });
  }
}


exports.removeSongFromRepertoire = async (req, res) => {

  console.log("THIS IS REMOVE")
  try {
    const { repertoireId, songId } = req.params;

    const repertoire = await Repertoire.findById(repertoireId);

    const originalLength = repertoire.songs.length;

    repertoire.songs = repertoire.songs
    .filter((s) => s.song.toString() !== songId)
    .map((s, idx) => ({ ...s.toObject(), order: idx }));

    if (repertoire.songs.length === originalLength) {
      return res.status(404).json({ message: 'Song not found in repertoire' });
    }


    await repertoire.save();


    res.status(200).json({
      message: 'Song removed from repertoire successfully',
      repertoire
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error removing song from repertoire',
      error,
    })
  }
}