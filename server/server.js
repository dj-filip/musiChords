require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static('uploads'));


const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true,
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use('/', router);


const port = process.env.PORT;

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port} (Neon PostgreSQL)`);
});
