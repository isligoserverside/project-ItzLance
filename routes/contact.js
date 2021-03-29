const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    let fname = req.query.firstname;
    let sname = req.query.surname;
    let selec = req.query.selection;
    let rad = req.query.radio;
    console.log(`Data Entered ${fname} ${sname} ${selec} ${rad}`);
    let data = {}
      res.render('contactUs');
});
// router.post('/', (req, res) => {
//     console.log("Data received from a  post");
//     console.table(req.body);
//     req.session.flash = 
//     { type: 'success', intro: 'Data Saved:', message:  "Data for <strong>" + req.body.firstname + " " + req.body.surname + "</strong> has been added"}
//     res.redirect(303, '/staff')
//  });

module.exports=router;