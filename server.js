require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const passport = require('passport');
const connectDB = require('./config/db');
const app = express();
connectDB();
app.use(cors({
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true
  }));

app.use(bodyParser.json());
app.use(require('./routes'));
require('./config/passport')(passport);
app.use(passport.initialize());
app.listen(8000, () => {
	console.log('Server is started');
});
