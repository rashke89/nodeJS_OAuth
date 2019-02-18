const router = require('express').Router();
const passport = require('passport');

//login
router.get('/login', (req, res) => {
    res.render('login');
});

//logout
router.get('/logout', (req, res) => {
    res.send('loging out')
});

//google
router.get('/google', passport.authenticate('google', { scope: ['profile']}));

//callback route for google to redirect
router.get(
    '/google/redirect',
    passport.authenticate('google'),
    (req, res) => {

    });

module.exports = router;