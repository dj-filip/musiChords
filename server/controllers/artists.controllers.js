const Artist = require('../models/artistModel');


const addArtist = async (req, res) => {
  try {
    const { name } = req.body;
    const coverImage = req.file ? req.file.filename : '';

    // const existingArtist = await Artist.findOne({ name });
    // if (existingArtist) {
    //   return res.status(400).json({ message: 'Artist with this name already exists' });
    // }

    const songs = [];

    const newArtist = await Artist.create({
      name,
      coverImage,
      songs
    });


    res.status(201).json({ message: 'Artist added successfully', newArtist });
  } catch (error) {
    console.log('Error adding artist', error);
    res.status(500).json({ message: 'Error adding artist' });
  }
}


const getArtists = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const artists = await Artist.find(
        { name: { $regex: `\\b${name}`, $options: "i" } });
      if (!artists) {
        return res.status(404).json({ message: 'Artist not found' });
      }
      res.status(200).json(artists);
    } else {
      const artists = await Artist.find();
      res.send(artists);
    }
  } catch (error) {
    console.log('Error fetching artists', error);
    res.status(500).json({ message: 'Error fetching artists' });
  }
}


const getArtist = async (req, res) => {
  try {
    const { id: artistId } = req.params;

    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    res.status(200).json(artist);

  } catch (error) {
    console.log('Error fetching artists from database', error);
    res.status(500).json({ message: 'Error fetching artist' });
  }
}


const getArtistWithSongs = async (req, res) => {
  try {
    const { artistId } = req.params;

    const artist = await Artist.findById(artistId).populate('songs');

    console.log(artist);
    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching artist with songs', error });
  }
}


module.exports = {
  addArtist,
  getArtists,
  getArtist,
  getArtistWithSongs
}