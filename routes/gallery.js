const express = require('express');
const router = express.Router();
const bodyParser= require('body-parser');
const galleryData = require('../lib/galleryData');
const PSMongo = require('../lib/mongodb');
const multer = require('multer');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

//Creating the File Upload Engine
const uploaderEngine = multer.diskStorage({
   destination: "./public/uploads",
   filename: (req, file, cb) => {
     cb(null, Date.now() + "--" + file.originalname)
   }
 });
 //Speicifying where the file needs to go
const upload = multer({ storage: uploaderEngine });

router.get('/',(req,res)=>{
    res.render('gallery',{PSGallery: galleryData});
});

router.post('/', upload.single('uploader'), (req, res) => {
   console.log(req.file);
   res.redirect(303,'/gallery')
});

//Route for displaying a specific PlayStation generations content
router.get('/:name',async(req,res)=>{
   let name = req.params.name;
   let psData = await PSMongo.readPS({ name: name });
   console.table(psData);
   if (psData[0]) {
      res.render('PlayStationGallery',{PSGallery: psData[0]});
   }else{
     res.render('404');
   }
});

//Route for editing 
router.get('/:name/edit', async (req, res) => {
   var name = req.params.name;
   var data = await PSMongo.readPS({ name: name });

   res.render('PlayStationEdit', { person: data[0] })
});

router.post('/:name/edit', async (req, res) => {
   console.log("Data received from a Edit post");
   console.table(req.body);
   PSMongo.updatePS(req.body)
       .then(() => {
           req.session.flash =
               { type: 'success', intro: 'Data Edited:', message: "Data for <strong>" + req.body.name + "</strong> has been edited" }
           res.redirect(303, '/gallery')
       })
       .catch(() => {
           req.session.flash =
               { type: 'danger', intro: 'Data not Edited:', message: "Editing failed" }
           res.redirect('/gallery')
       });
});
router.get('/:name/delete', async (req, res) => {
   var name = req.params.name;

   await PSMongo.deletePS(name)
       .then(() => {
           req.session.flash =
               { type: 'success', intro: 'Data Removed:', message: "<strong>" + name + "</strong> has been removed" }
           res.redirect('/gallery')
       })
       .catch(() => {
           req.session.flash =
               { type: 'danger', intro: 'Data not Removed:', message: "<strong>" + name + "</strong> has not been removed" }
           res.redirect('/gallery')
       });
});


//File Upload Post Request



module.exports = router;