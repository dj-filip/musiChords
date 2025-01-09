const Artist = require('../models/artistModel');
const Song = require('../models/songModel');


exports.addSong = async (req, res) => {
  console.log("REQ BODY: ");
  console.log(req.body);
  try {
    const { title, artistId, artistName: artist, originalKey, intro, lyricsChords, coverImage } = req.body;

    // const artist = await Artist.findOne({ _id: artistId });

    const newSong = new Song({
      title,
      artist,
      originalKey,
      intro,
      lyricsChords,
      coverImage
    });

    await newSong.save();

    await Artist.findByIdAndUpdate(artistId, { 
      $push: { songs: newSong._id } // Push the new song's ID to the artist's 'songs' array
    });

    res.status(201).json({ message: 'Song added successfully', newSong });
  } catch (error) {
    res.status(500).json({ message: 'Error adding song', error });
    console.log(error);
  }
}
console.log('asdsa')

exports.getSongs = async (req, res) => {
  try {
    data = await Song.find();
    res.send(data);
  } catch (error) {
    console.error('Error fetching songs from database:', error);
  }
}