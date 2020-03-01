'use strict';

const ImageStore = require('../utils/image-store');
const Stadium = require('../models/stadium');
const User = require('../models/user');

const Gallery = {
    index: {
        handler: async function(request, h) {
            try {
                const allImages = await ImageStore.getAllImages();
                return h.view('gallery', {
                    title: 'Cloudinary Gallery',
                    images: allImages
                });
            } catch (err) {
                console.log(err);
            }
        }
    },

    uploadFile: {
        handler: async function(request, h) {
            try {
                const id = request.params.id;
                const imagename = './public/' + id;
                const file = request.payload.imagefile;
                const stadium = await Stadium.findById(id).lean();
                if (Object.keys(file).length > 0) {
                    const test = await ImageStore.uploadImage(imagename, request.payload.imagefile);
                    console.log(test);
                    stadium.stadiumURL = test;
                    await Stadium.findOneAndUpdate({_id: id}, {stadiumURL: test});
                    return h.redirect('/report');
                }
                return h.view('gallery', {
                    title: 'Cloudinary Gallery',
                    error: 'No file selected'
                });
            } catch (err) {
                console.log(err);
            }
        },
        payload: {
            multipart: true,
            output: 'data',
            maxBytes: 209715200,
            parse: true,
        }
    },

    deleteImage: {
        handler: async function(request, h) {
            try {
                await ImageStore.deleteImage(request.params.id);
                return h.redirect('/');
            } catch (err) {
                console.log(err);
            }
        }
    },

    getsingleimage: {
        handler: async function(request, h) {
            try {
                const allImages = await ImageStore.getAllImages();
                return h.view('gallery', {
                    title: 'Cloudinary Gallery',
                    images: allImages
                });
            } catch (err) {
                console.log(err);
            }
        }
    },
};

module.exports = Gallery;
