const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
     // res.render('home',{playstation: psData});
     var message = "";
     if (req.signedCookies.tracking){
         var dateLastVisit = req.signedCookies.tracking;
         var message = "This Webpage contains cookies, your last visit was on: " + dateLastVisit;
     }
     var currentDate = new Date();
     res.cookie('tracking',currentDate.toDateString(), {signed : true});
     res.render('home', {'message': message});
      });
  module.exports = router;