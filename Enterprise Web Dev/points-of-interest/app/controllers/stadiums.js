'use strict';

const Stadium = require('../models/stadium');
const User = require('../models/user');

const Stadiums = {
    home: {
        handler: function(request, h) {
            return h.view('home', { title: 'Add A Stadium' });
        }
    },
    report: {
        handler: async function(request, h) {
            const id = request.auth.credentials.id;
            const user = await User.findById(id);
            const stadiums = await Stadium.find({contributer:user}).populate('contributer').lean();
            return h.view('report', {
                title: 'Stadiums Added to Date',
                stadiums: stadiums,
            });
        }
    },

    contribute: {
        handler: async function(request, h) {
            const data = request.payload;
            const id = request.auth.credentials.id;
            const user = await User.findById(id);
            const newStadium = new Stadium({
                name: data.name,
                county: data.county,
                capacity: data.capacity,
                province: data.province,
                contributer: user._id
            })
            await newStadium.save();
            return h.redirect('/report');
        }
    }
};

module.exports = Stadiums;