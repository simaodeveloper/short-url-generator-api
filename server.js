const path = require('path');

const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Set Environments Variables
dotenv.config({ path: './config/.env' });

const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 5002;

app.set('views', path.resolve(process.cwd(), 'views'));
app.set('view engine', 'ejs');

// Log
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Routes
app.use(routes);

// Start MongoBD with Mongoose
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch((e) => {
  console.log(e);
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`API is running at http://localhost:${PORT}`);
});
