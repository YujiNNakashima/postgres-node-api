const express = require('express');
const {getBootcamps, createBootcamp, getBootcampById, updateBootcamp, deleteBootcamp} = require('../controllers/bootcamp.controller')
const {protect} = require('../middleware/authenticate-route')
const router = express.Router();

router.use(protect)

router
.route('/')
.get(getBootcamps)
.post(createBootcamp)

router
.route('/:bootcamp_id')
.get(getBootcampById)
.put(updateBootcamp)
.delete(deleteBootcamp)


module.exports = router