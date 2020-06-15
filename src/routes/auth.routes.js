const express = require('express');
const {registerUser, login, logout, testToken} = require('../controllers/auth.controller'); 
const {protect} = require('../middleware/authenticate-route');
const router = express.Router()

router
  .route('/register')
  .post(registerUser);

router
  .route('/login')
  .post(login)

router
  .route('/logout')
  .post(logout)

router  
  .route('/token')
  .post(protect, testToken)



  module.exports = router