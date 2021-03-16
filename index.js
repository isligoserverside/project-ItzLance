const express = require('express')
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;

var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public/images'));
app.use(express.static('public'));
app.use(cookieParser("Lances Cookie"));

const logger = (req,res,next)=>{
    console.log('Logged');
    next();
}
app.use(logger);

app.use('/home', require('./routes/home'));
app.use('/gallery', require('./routes/gallery'));
app.use('/about', require('./routes/about'));

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