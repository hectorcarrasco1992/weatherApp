const User = require('../users/models/User');
const { validationResult } = require('express-validator');
const fetch = require('node-fetch')
const passport = require('passport')
const faker = require('faker');
const bcrypt = require('bcryptjs')
require('dotenv').config()
require('../../lib/Passport')

module.exports ={
register: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;
        User.findOne({ email }).then(user => {
          if (user) {
            // return req.flash('errors', 'User Already Exists');
            return res.send('User Exists');
          } else {
            const newUser = new User();
            newUser.profile.name = name;
            newUser.profile.picture = faker.image.avatar();
            newUser.email = email;
            newUser.password = password;
    
            newUser
              .save()
              .then(user => {
                req.login(user, err => {
                  if (err) {
                    return res
                      .status(400)
                      .json({ confirmation: false, message: err });
                  } else {
                    res.redirect('/');
                    next();
                  }
                });
              })
              .catch(err => {
                return next(err);
              });
          }
        })
    },

renderRegister:(req,res)=>{
        res.render('register')
      },

apiCall:(req,res)=>{

        if(req.isAuthenticated()) {
          // return res.render('error')
          
          cityName = req.query
          const apiKey = `&appid=${process.env.KEY}`
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.cityName}${apiKey}&units=imperial`;
          ;
          fetch(url)
          .then((weather) => weather.json())
          .then((weather) => {
            console.log(weather)
            console.log(apiKey)
            console.log(cityName.cityName)
             
            return res.render('weather',{weather})
          })
          .catch((err) => console.log(err))
         }
        //else{
        //   return res.redirect('/error')
        // }
          
      },

renderLogin:(req,res)=>{
        res.render('login')
      },

renderHome:(req,res)=>{
        if(req.isAuthenticated()){
          res.render('index')
        }else{
          res.redirect('/users/login')
        }
      },

logOut:(req,res)=>{
        
        req.logOut()
        req.flash('successMessage','you are now logged out')
        return res.redirect('/users/login')
      },
}