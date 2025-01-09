const mongoose = require('mongoose');


const repertoireSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    songs: [
      {
        song: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Song'
        },
        transposeStep: {
          type: Number,
          default: 0
        },
        order: {
          type: Number,
          default: 0
        }
      }
    ],
  },
  {
    timestamps: true
  }
)

const Repertoire = mongoose.model('Repertoire', repertoireSchema);

module.exports = Repertoire;