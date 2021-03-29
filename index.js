const express = require('express')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const {flashMiddleware} = require('./lib/session');
const app = express();
const port = 5000;

var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public/images'));
app.use(express.static('public'));
app.use(cookieParser("Lances Cookie"));
app.use(session(
    {secret: "Lances Cookie", 
    cookie: { maxage: 6000},
    resave: false,
    saveUninitialized: false
}));

const logger = (req,res,next)=>{
    console.log('Logged');
    next();
}
app.use(logger);
app.use(flashMiddleware);
app.get('/',(req,res)=>{
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
app.use('/gallery', require('./routes/gallery'));
app.use('/about', require('./routes/about'));
app.use('/contact', require('./routes/contact'));

app.use((req,res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

app.use((err,req,res,next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(port, () => console.log(`listening on port ${port}`));