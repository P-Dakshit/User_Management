const express =require('express');

const route = express.Router();

//home page
route.get('/', (req, res) => {
    res.render('home');
})

//create user page
route.get('/usercreate', (req, res) => {
    res.render('user_data');
})

//login
route.get('/login', (req, res) => {
    res.render('login');
});

// forgot password page
route.get('/forget_password', (req, res) => {
  res.render('forget_password');
});

//reset password
route.get('/reset_password/:token', (req, res) => {
  res.render('reset_password', { token: req.params.token ,message: null });
});

module.exports = route;