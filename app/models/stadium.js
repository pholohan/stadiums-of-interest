'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const stadiumSchema = new Schema({
    name: String,
    county: String,
    capacity: Number,
    province: String,
    stadiumURL: String,
    contributer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Mongoose.model('Stadium', stadiumSchema);