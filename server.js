require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const passport = require('passport');
const connectDB = require('./config/db');
const app = express();
connectDB();
app.use(cors());

app.use(bodyParser.json());
app.use(require('./routes'));
require('./config/passport')(passport);
app.use(passport.initialize());
app.listen(process.env.PORT || 5000, () => {
	console.log('Server is started');
});
