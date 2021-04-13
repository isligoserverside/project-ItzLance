const express = require('express');
const router = express.Router();
const bodyParser= require('body-parser');
const galleryData = require('../lib/galleryData');
const multer = require('multer');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const uploaderEngine = multer.diskStorage({
   destination: "./public/uploads",
   filename: (req, file, cb) => {
     cb(null, Date.now() + "--" + file.originalname)
   }
 });
const upload = multer({ storage: uploaderEngine });

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

router.post('/', upload.single("fileUpload"), (req, res)=>{
      console.log(req.file);
      res.redirect(303,'/gallery')
});



module.exports = router;