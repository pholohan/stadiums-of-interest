'use strict';

const cloudinary = require('cloudinary');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

const ImageStore = {
    configure: function() {
        const credentials = {
            cloud_name: process.env.name,
            api_key: process.env.key,
            api_secret: process.env.secret
        };
        cloudinary.config(credentials);
    },

    getAllImages: async function() {
        const result = await cloudinary.v2.api.resources();
        return result.resources;
    },

    uploadImage: async function(imagename,imagefile) {
        await writeFile(imagename, imagefile);
        var stadiumURL = '';
        await cloudinary.v2.uploader.upload(imagename,{use_filename: true, unique_filename: false}, function(error,result) {
            if(error){
                console.log(error, result);
                return;
            }
            stadiumURL = result.url;
            console.log(stadiumURL)});
        return stadiumURL;
    },

    deleteImage: async function(id) {
        await cloudinary.v2.uploader.destroy(id, {});
    },

};

module.exports = ImageStore;
