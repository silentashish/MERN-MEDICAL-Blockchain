const express = require('express');
const path  =  require('path');
const app = express();
const bodyParser = require('body-parser');
const user = require('./routes/user.route');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');


app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(fileUpload());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

//importing all the router here
app.use('/auth',user);

let dev_db_url = 'mongodb://localhost:27017/userdata';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const port = process.env.PORT || 1038;


app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

console.log(`This program is listening at ${port}`);