const express = require('express');
const router = express.Router();
//route of about us
router.get('/',(req,res)=>{
      res.render('aboutUs');
      });

module.exports=router;