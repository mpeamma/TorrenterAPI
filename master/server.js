const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 9000;

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./app/routes')(app);

app.listen(port, '0.0.0.0', () => {
    console.log('We are live on ' + port);
});