const express = require('express');
const multer = require('multer');
const router = express.Router();
const galleryData = require('../lib/galleryData');
const path = require('path');

const storage = multer.diskStorage({
   destination: '../uploads',
   filename: function(req, file, cb){
     cb(null,file.fieldname + '-' + Date.now() + 
     path.extname(file.originalname));
   }
 });
 
 const upload = multer({
   storage: storage,
   limits:{fileSize: 1000000},
   fileFilter: function(req, file, cb){
     checkFileType(file, cb);
   }
 }).single('fileUpload');

router.get('/',(req,res)=>{
    res.render('gallery',{PSGallery: galleryData});
    });

router.get('/:name',(req,res)=>{
        let name = req.params.name;
         if(galleryData[name]){
            res.render('PlayStationGallery',{PSGallery: galleryData[name]});
            console.log(`${name}`);
         }else{
            res.type('text/plain');
            res.send('Server 404 Error');
         }
      });

router.post('/', (req, res) => {
   upload(req, res, (err) => {
         res.redirect('/gallery', {
           msg: 'File Uploaded!',
           file: `uploads/${req.file.filename}`
    });
 })});

module.exports = router;