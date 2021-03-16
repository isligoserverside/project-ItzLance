const express = require('express');
const router = express.Router();
const galleryData = require('../lib/galleryData');

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
module.exports = router;