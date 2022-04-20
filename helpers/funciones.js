const express = require('express');
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        const pathImg = `${__dirname}/../public/`;
        callback(null, pathImg);
    },
    filename: function(req, file, callback){
        const ext      = file.originalname.split('.').pop();
        const filename = `file-${Date.now()}.${ext}`;
        file.fieldname = filename
        callback(null, filename);
    }
})

const uploadMiddleware = multer({storage});

module.exports = uploadMiddleware;