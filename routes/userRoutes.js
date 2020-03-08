const express = require('express');
const router = express.Router()
const passport= require('passport')
const fetch = require('node-fetch')
const User = require('./users/models/User')
const userController = require('./controllers/userController');
const userValidation = require('./utils/userValidation');;

/* GET users listing. */
router.get('/weather',userController.apiCall )
router.get('/',userController.renderHome)
//render login
router.get('/login',userController.renderLogin)

//actually log in user
router.post(
  '/login',
  passport.authenticate('local-login', {
    successRedirect: '/users',
    failureRedirect: '/users/login',
    failureFlash: true
  })
);
//render register
router.get('/register',userController.renderRegister)
//create new user
router.post('/register', userValidation, userController.register)

//logout

router.get('/logout',userController.logOut)

module.exports = router;
