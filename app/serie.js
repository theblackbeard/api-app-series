"use strict";
const
    mongoose = require('mongoose')
,   Schema = mongoose.Schema
,   uniqueValidator = require('mongoose-unique-validator')


const SerieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    photo: {
        type: String,
        default: "http://i.imgur.com/c00Aoc6.jpg"
    },

  // media : [{ type: Schema.Types.ObjectId, ref: 'Season' }],
    seasons : [
      {
        _id: false,
        episodes: [
          {
            title: String,
            viewed: { type: Boolean, default: false }
          }
        ]
      }
    ],

    created_at: {
        type: Date,
        default: Date.now
    }

});

SerieSchema.plugin(uniqueValidator, { message: 'Erro: Serie já cadastrada.' });

module.exports = mongoose.model('Serie', SerieSchema);
