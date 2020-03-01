'use strict';

const Stadium = require('../models/stadium');
const User = require('../models/user');
const ImageStore = require('../utils/image-store');

const Stadiums = {
    home: {
        handler: async function(request, h) {
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
    },

    showStadium: {
        handler: async function(request, h) {
            try {
                const id = request.params.id;
                const stadium = await Stadium.findById(id).lean();
                return h.view('editstadium', {title: 'Edit Stadium Details', stadium: stadium});
            }catch(err){
                return h.view('login', { errors: [{ message: err.message }] });
            }
        }
    },

    updateStadium: {
        handler: async function(request, h) {
            try {
                const stadiumEdit = request.payload;
                const id = request.params.id;
                const stadium = await Stadium.findById(id);
                stadium.name = stadiumEdit.name;
                stadium.capacity = stadiumEdit.capacity;
                stadium.county = stadiumEdit.county;
                stadium.province = stadiumEdit.province;
                await stadium.save();
                return h.redirect('/report');
            }catch(err){
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },

    deleteStadium: {
        handler: async function(request, h) {
            try {
                const id = request.params.id;
                const stadium = await Stadium.findById(id).lean();
                await Stadium.deleteOne(stadium);
                return h.redirect('/report');
            }catch(err){
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },
    uploadstadiumimages: {
        handler: async function(request, h) {
            const id = request.params.id;
            const stadium = await Stadium.findById(id).lean();
            return h.view('stadiumupload', { title: 'Upload A Stadium Image',stadium: stadium });
        }
    },

};

module.exports = Stadiums;