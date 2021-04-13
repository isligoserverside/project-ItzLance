const express = require('express');
const bodyParser= require('body-parser');
const { query } = require('express');
const router = express.Router();
session = require('express-session');
const AWS = require('aws-sdk');
const config = require('../lib/dynamoDB');


const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/',(req,res)=>{
res.render('contactUs');
});

router.post('/',urlencodedParser,(req,res)=>{
req.session.data = { query: req.body.firstname + " " + req.body.surname + " " + req.body.email + " " + req.body.query};
res.redirect(303, '/contact/formQuery');
});

router.get('/formQuery',urlencodedParser,(req, res) => {
  if (req.session.data) {
      var userQuery = req.session.data.query;
  }else {
      var userQuery = "";
  }
  res.render('formSuccess', {query: userQuery});
  console.log(query);
});

module.exports=router;