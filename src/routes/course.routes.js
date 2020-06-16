const express = require('express');
const {getCourses, getCourseById, createCourse, updateCourse, deleteCourse} = require('../controllers/course.controllers')
const {protect} = require('../middleware/authenticate-route');
const {advancedSearch} = require('../middleware/advanced-search');
const router = express.Router();

router.use(protect)

router
.route('/')
.get(advancedSearch, getCourses)
.post(createCourse)

router
.route('/:course_id')
.get(getCourseById)
.put(updateCourse)
.delete(deleteCourse)


module.exports = router