const mongoose = require('mongoose');


const artistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true
    },
    songs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song'
    }]
  },
  {
    timestamps: true
  }
);

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;