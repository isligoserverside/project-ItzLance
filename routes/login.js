const express = require('express');
const bodyParser= require('body-parser');
const { query } = require('express');
const router = express.Router();
const session = require('express-session');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const loginData = require('../lib/userLogin');

router.get('/',(req,res)=>{
      res.render('login');
});
router.post('/', (req,res)=>{
    
    const {username,password} = req.body;
    if(username == loginData['name'] & password == loginData['userpassword']){
        res.redirect(303,'../');
    }else{
        console.log('Invalid Credientials');
        res.redirect(303,'/login');
    }
    console.table(` Username: ${req.body.username} Password: ${req.body.password}`);
});

//DIASTER 1
// router.get('/signup', (req,res)=>{
//     res.render('signup'); 
// });

// router.post('/signup',urlencodedParser,(req,res)=>{
//     req.session.userdata = { query: req.body.username + " " + req.body.email + " " + req.body.password + " "};
//     res.redirect(303, '../');
//     });
    
// router.get('../',urlencodedParser,(req, res) => {
//       if (req.session.userdata) {
//           var newUser = req.session.userdata.query;
//           console.table(newUser);
//       }else {
//           var newUser = "";
//       }
//       res.render('home', {query: newUser});
//       console.log(newUser);
// });


// DISASTER 2
// router.post('/signup', urlencodedParser,(req,res)=>{
//   const {username, email, password} = req.body;
//   if(username && password && email){
//       if(req.session.authenticated){}
//   }
//   res.redirect(303, '../');
// });

// router.get('../',urlencodedParser,(req, res) => {;
//  console.log(req.body.username);
// });
module.exports=router;