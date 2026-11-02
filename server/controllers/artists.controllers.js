const { eq, ilike, or, asc } = require('drizzle-orm');
const { db } = require('../models');
const { artists } = require('../models/schema');

const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) ? id : null;
};

const dbErrorCode = (error) => error.code ?? error.cause?.code;

const addArtist = async (req, res) => {
  try {
    const { name } = req.body;
    const coverImage = req.file ? req.file.filename : '';

    const [newArtist] = await db
      .insert(artists)
      .values({ name, coverImage })
      .returning();

    res.status(201).json({ message: 'Artist added successfully', newArtist });
  } catch (error) {
    if (dbErrorCode(error) === '23505') {
      return res.status(409).json({ message: 'Artist with this name already exists' });
    }
    console.log('Error adding artist', error);
    res.status(500).json({ message: 'Error adding artist' });
  }
};

const getArtists = async (req, res) => {
  try {
    const { name } = req.query;

    // matches the start of the name or the start of any word in it
    const rows = name
      ? await db.select().from(artists)
          .where(or(ilike(artists.name, `${name}%`), ilike(artists.name, `% ${name}%`)))
          .orderBy(asc(artists.name))
      : await db.select().from(artists).orderBy(asc(artists.name));

    res.status(200).json(rows);
  } catch (error) {
    console.log('Error fetching artists', error);
    res.status(500).json({ message: 'Error fetching artists' });
  }
};

const getArtist = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (id === null) return res.status(400).json({ message: 'Invalid artist id' });

    const [artist] = await db.select().from(artists).where(eq(artists.id, id));
    if (!artist) return res.status(404).json({ message: 'Artist not found' });

    res.status(200).json(artist);
  } catch (error) {
    console.log('Error fetching artist from database', error);
    res.status(500).json({ message: 'Error fetching artist' });
  }
};

const getArtistWithSongs = async (req, res) => {
  try {
    const id = parseId(req.params.artistId);
    if (id === null) return res.status(400).json({ message: 'Invalid artist id' });

    const artist = await db.query.artists.findFirst({
      where: eq(artists.id, id),
      with: { songs: true },
    });
    if (!artist) return res.status(404).json({ message: 'Artist not found' });

    const { songs, ...artistInfo } = artist;
    res.status(200).json({
      ...artistInfo,
      songs: songs.map((s) => ({
        ...s,
        artist: artist.name,
        coverImage: artist.coverImage,
      })),
    });
  } catch (error) {
    console.log('Error fetching artist with songs', error);
    res.status(500).json({ message: 'Error fetching artist with songs' });
  }
};

module.exports = { addArtist, getArtists, getArtist, getArtistWithSongs };
