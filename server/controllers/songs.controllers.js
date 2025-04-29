const Artist = require('../models/artistModel');
const Song = require('../models/songModel');


const addSong = async (req, res) => {
  console.log("REQ BODY: ");
  console.log(req.body);
  try {
    const {
      title,
      artistId,
      artistName: artist,
      originalKey,
      intro,
      lyricsChords,
      coverImage
    } = req.body;

    // const artist = await Artist.findOne({ _id: artistId });

    const newSong = await Song.create({
      title,
      artist,
      originalKey,
      intro,
      lyricsChords,
      coverImage
    });


    await Artist.findByIdAndUpdate(artistId, {
      $push: { songs: newSong._id } // Push the new song's ID to the artist's 'songs' array
    });

    res.status(201).json({ 
      message: 'Song added successfully', newSong });
  } catch (error) {
    res.status(500).json({ message: 'Error adding song', error });
    console.log(error);
  }
}


const getSongs = async (req, res) => {
  try {
    data = await Song.find();
    res.send(data);
  } catch (error) {
    console.error('Error fetching songs from database:', error);
  }
}



module.exports = {
  addSong,
  getSongs
}