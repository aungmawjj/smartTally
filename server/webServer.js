const config = require('./config');
const path = require('path');
const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
mongoose.connect(config.mongodbUri);

app.use(cors({
  'origin': true,
  'credentials': true,
}));

// app.use(morgan('combined'));
app.use(express.static(config.client));
app.use('/api', require('./controllers'));

app.get('*', function (req, res) {
  res.sendFile(path.join(config.client, './index.html'));
});

app.listen(config.port, config.host, () => {
  console.log('Api listening at port:', config.port);
});