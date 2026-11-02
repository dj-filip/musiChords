const { db } = require('../models');
const { songs } = require('../models/schema');

const dbErrorCode = (error) => error.code ?? error.cause?.code;

const addSong = async (req, res) => {
  try {
    const { title, artistId, originalKey, intro, lyricsChords, coverImage } = req.body;

    const [newSong] = await db
      .insert(songs)
      .values({
        title,
        artistId: Number(artistId),
        originalKey,
        intro: intro || null,
        lyricsChords,
      })
      .returning();

    res.status(201).json({ message: 'Song added successfully', newSong });
  } catch (error) {
    const code = dbErrorCode(error);
    if (code === '23505') return res.status(409).json({ message: 'This artist already has a song with that title' });
    if (code === '23503') return res.status(400).json({ message: 'Artist does not exist' });
    if (code === '22P02') return res.status(400).json({ message: 'Invalid key or id' });
    console.log(error);
    res.status(500).json({ message: 'Error adding song' });
  }
};

const getSongs = async (req, res) => {
  try {
    const rows = await db.query.songs.findMany({ with: { artist: true } });

    // keep `artist` as the name string, like the old Mongoose model
    res.status(200).json(rows.map(({ artist, ...song }) => ({ ...song, artist: artist.name, coverImage: artist.coverImage })));
  } catch (error) {
    console.error('Error fetching songs from database:', error);
    res.status(500).json({ message: 'Error fetching songs' });
  }
};

module.exports = { addSong, getSongs };
