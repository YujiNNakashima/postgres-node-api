const express = require('express');
const {getUsers, getUserById, createUser, deleteUser, updateUser} = require('../controllers/users.controller'); 
const {protect} = require('../middleware/authenticate-route')
const {advancedSearch} = require('../middleware/advanced-search');
const router = express.Router()

router.use(protect)

router
  .route('/')
  .get(advancedSearch, getUsers)
  .post(createUser)

router
  .route('/:id')
  .get(getUserById)
  .delete(deleteUser)
  .put(updateUser)


  module.exports = router