const Repertoire = require("../models/repertoireModel");


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

exports.addSongToRepertoire = async (req, res) => {
  try {
    const { repertoireId, songId } = req.body;
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
    const { repertoireId } = req.params;
    const repertoire = await Repertoire.findById(repertoireId).populate('songs.song');

    if (!repertoire) {
      return res.status(404).json({ message: 'Repertoire not found'});
    }

    res.status(200).json(repertoire);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching repertoire', error });
  }
}