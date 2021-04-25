const express = require('express');
const bodyParser= require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sessionStore = new session.MemoryStore();
const {flashMiddleware} = require('./lib/session');
const app = express();
const port = 5000;

//Specifying which layout engine to use
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public/images'));
app.use(express.static('public'));

//Cookie
app.use(cookieParser("Lances Cookie"));

app.use(express.urlencoded({extended:false}));

//Session 
app.use(session(
    {secret: "Lances Cookie", 
    cookie: { maxage: 6000},
    resave: false,
    saveUninitialized: false,
}));

//Logging our events
const logger = (req,res,next)=>{
    console.log('Logged');
    next();
}
app.use(logger);
app.use(flashMiddleware);
//Default route when application loads
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
//Routes that display other parts of the applicaton
app.use('/gallery', require('./routes/gallery'));
app.use('/about', require('./routes/about'));
app.use('/contact', require('./routes/contact'));
app.use('/login', require('./routes/login'));

//Server 404 error route
app.use((req,res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});
//Server 500 error route
app.use((err,req,res,next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(port, () => console.log(`listening on port ${port}`));