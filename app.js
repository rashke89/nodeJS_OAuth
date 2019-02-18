const express = require('express');
const authRoute = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/auth', authRoute);

app.listen(3000, () => {
    console.log('Application is listening for requests on port - 3000');
});