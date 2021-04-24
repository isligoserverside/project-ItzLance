const mongoose = require('mongoose');

const psModel = require('../models/playstation');

const connectionString = 'mongodb://127.0.0.1:27017/playstationDB'

mongoose.connect(connectionString, {
    "useNewUrlParser": true,
    "useUnifiedTopology": true,
    'useCreateIndex': true
}).
    catch(error => {
        console.log('Database connection refused' + error);
        process.exit(2);
    })

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log("DB connected")
});


// Check if there is already any data in the database, if so - do nothing.
// if there is no data create three new 'staff' documents and store them in the database.
// 

psModel.find((err, staff) => {
    if (err) return console.error(err);

    if (staff.length) return;

    new psModel({
        "name":"PlayStation",
        "titleOne":"PlayStation",
        "imageOne":"/images/PlayStationOriginal.jpg",
        "releaseYearOne":"1994-1997",
    
        "titleTwo":"PS one",
        "imageTwo":"/images/PlayStationSlim.jpg",
        "releaseYearTwo":"2000-2006",
    
        "titleThree":"PlayStation Classic",
        "imageThree":"/images/PlayStationClassic.jpg",
        "releaseYearThree": "2018-2019",

        "titleFour":"DualShock",
        "imageFour":"/images/DualShock.jpg",
        "releaseYearFour":"1997-2000",

        "titleFive":"Memory Card",
        "imageFive":"/images/memoryCard.jpg",
        "releaseYearFive":"1994-2000",

        "titleSix":"Original Controller",
        "imageSix":"/images/Controller.jpg",
        "releaseYearSix":"1994-1997"
    }).save();

    new psModel({
        "name":"PlayStation2",
            "titleOne":"PlayStation 2",
            "imageOne":"/images/PlayStation2.jpg",
            "releaseYearOne":"2000-2004",
        
            "titleTwo":"PlayStation 2 Slim",
            "imageTwo":"/images/PlayStation2Slim.jpg",
            "releaseYearTwo":"2004-2013",
        
            "titleThree":"DualShock 2 ",
            "imageThree":"/images/DualShock2.jpg",
            "releaseYearThree": "2000-2013",
    
            "titleFour":"Memory Card",
            "imageFour":"/images/memoryCard2.jpg",
            "releaseYearFour":"2000-2013",
    
            "titleFive":"Network Adapter",
            "imageFive":"/images/PlayStation2Network.jpg",
            "releaseYearFive":"2003-2004",
    
            "titleSix":"PS2 Eye Toy",
            "imageSix":"/images/PlayStation2EyeToy.jpg",
            "releaseYearSix":"2003-2006"
    }).save();

    new psModel({
        "name":"PlayStation3",
        "titleOne":"PlayStation 3",
        "imageOne":"/images/PlayStation3.jpg",
        "releaseYearOne":"2000-2004",
    
        "titleTwo":"PlayStation 3 Slim",
        "imageTwo":"/images/PlayStation3Slim.jpg",
        "releaseYearTwo":"2009-2012",
    
        "titleThree":"PlayStation 3 Super Slim ",
        "imageThree":"/images/PlayStation3SuperSlim.jpg",
        "releaseYearThree": "2000-2013",

        "titleFour":"Dualshock 3",
        "imageFour":"/images/DualShock3.jpg",
        "releaseYearFour":"2006-2013",

        "titleFive":"PS3 Eye Toy",
        "imageFive":"/images/PlayStation3EyeToy.jpg",
        "releaseYearFive":"2009-2013",

        "titleSix":"PS Move",
        "imageSix":"/images/PlayStationMove.jpg",
        "releaseYearSix":"2009-2020",
    }).save();

    new psModel({
           "name":"PlayStation4",
            "titleOne":"PlayStation 4",
            "imageOne":"/images/PlayStation4.jpg",
            "releaseYearOne":"2013-2016",
        
            "titleTwo":"PlayStation 4 Slim",
            "imageTwo":"/images/PlayStation4Slim.jpg",
            "releaseYearTwo":"2016-2020",
        
            "titleThree":"PlayStation 4 Pro",
            "imageThree":"/images/PlayStation4Pro.jpg",
            "releaseYearThree": "2016-2020",
    
            "titleFour":"Dualshock 4",
            "imageFour":"/images/DualShock4.jpg",
            "releaseYearFour":"2013-2020",
    
            "titleFive":"PS4 Camera",
            "imageFive":"/images/PlayStation4Camera.jpg",
            "releaseYearFive":"2013-2020",
    
            "titleSix":"PS VR",
            "imageSix":"/images/PlayStationVR.jpg",
            "releaseYearSix":"2009-2020",
        }).save();

        new psModel({
            "name":"PlayStation5",
            "titleOne":"PlayStation 5",
            "imageOne":"/images/PlayStation5.jpg",
            "releaseYearOne":"2020",
        
            "titleTwo":"PlayStation 5 Digital",
            "imageTwo":"/images/PlayStation5Digital.jpg",
            "releaseYearTwo":"2016-2020",
        
            "titleThree":"DualSense",
            "imageThree":"/images/DualSense.jpg",
            "releaseYearThree": "2016-2020",
    
            "titleFour":"PS5 Camera",
            "imageFour":"/images/PlayStation5Camera.jpg",
            "releaseYearFour":"2013-2020",
    
            "titleFive":"PS4 Camera",
            "imageFive":"/images/PlayStation5Dock.jpg",
            "releaseYearFive":"2013-2020",
    
            "titleSix":"PS5 3D Headset",
            "imageSix":"/images/PlayStation5Headset.jpg",
            "releaseYearSix":"2009-2020",
        }).save();

});

async function createPS (data){
    let playStationCreate = new psModel(data);
    await playStationCreate.save()
}

async function deletePS (name){
    staff = await psModel.findOne({name : name});
    await staff.remove();    
}

async function updatePS(data){
    var id = data._id;
    console.log(id);
    await psModel.findByIdAndUpdate({_id: id}, {...data})
}

async function readPS ( options = {}){

 //lean returns a json object rather than a mongoose document.
    return psModel.find(options).lean();
}

module.exports = {
    readPS: readPS, 
    createPS: createPS,
    deletePS: deletePS,
    updatePS: updatePS
}
