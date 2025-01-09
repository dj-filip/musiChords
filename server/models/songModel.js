const mongoose = require('mongoose');


const songSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a song title"]
    },
    artist: {
      type: String,
      ref: 'Artist',
      required: [true, "Please enter a song artist  "]
    },
    originalKey: {
      type: String,
      required: [true, "Please enter a song key"]
    },
    intro: {
      type: String,
    },
    lyricsChords: {
      type: String,
      required: [true, "Please enter a song lyrics / chords"]
    },
    coverImage: {
      type: String,
      required: [true, "Please add a cover image"]
    }
  },
  {
    timestamps: true
  }

)

const Song = mongoose.model('Song', songSchema);

module.exports = Song;