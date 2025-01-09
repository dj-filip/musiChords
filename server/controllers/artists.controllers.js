const Artist = require('../models/artistModel');


exports.addArtist = async (req, res) => {
  try {
    const { name } = req.body;
    const coverImage = req.file ? req.file.filename : '';

    // const existingArtist = await Artist.findOne({ name });
    // if (existingArtist) {
    //   return res.status(400).json({ message: 'Artist with this name already exists' });
    // }

    const songs = [];

    const newArtist = new Artist({
      name,
      coverImage,
      songs
    });

    await newArtist.save();

    res.status(201).json({ message: 'Artist added successfully', newArtist });
  } catch (error) {
    res.status(500).json({ message: 'Error adding artist', error });
    console.log(error);
  }
}


exports.getArtists = async (req, res) => {
  try {
    data = await Artist.find();
    res.send(data);
  } catch (error) {
    console.log('Error fetching artists from database', error);
  }
}


exports.getArtist = async (req, res) => {
  const name = req.query.name;
  try {
    data = await Artist.find({ name: { $regex: `(^|\\s)${name}`, $options: 'i' } });

    if (data.length === 0) {
      return;
    }
    
    res.send(data);
  } catch (error) {
    console.log('Error fetching artists from database', error);
  }
}


exports.getArtistWithSongs = async (req,res) => {
  try {
    const artistId = req.params.artistId;

    // Populate 'songs' field with songs data
    const artist = await Artist.findById(artistId).populate('songs');

    console.log(artist);
    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching artist with songs', error});
  }
}