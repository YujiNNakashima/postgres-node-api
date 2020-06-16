const Course = require('../models/Course');
const User = require('../models/User');
const Bootcamp = require('../models/Bootcamp');

module.exports = {
  async getCourses (req, res) {
    try {

      const {options} = req;
      
      const courses = await Course.findAll(options)

      if(!courses) {
        throw new Error('Course not found')
      }

      res.status(200).json({
        data: courses
      })

    } catch (error) {
      res.status(500).json({error: error.message})
    }
  },

  async getCourseById(req, res) {

    try {
      const {course_id} = req.params

      const course = await Course.findByPk(course_id)

      if(!course) {
        throw new Error('course not found')
      }

      res.status(200).json({data: course})
  
    } catch (error) {
      res.status(500).json({error: error.message})
    }

  },

  async createCourse(req, res) {
    try {
      const {title, weeks, tuition, bootcamp_id, user_id} = req.body;
  
      const data = {user_id, bootcamp_id, title, weeks, tuition}
  
      const user = await User.findByPk(user_id);
  
      if(!user) {
        return res.status(404).send({error: 'user not found!'});
      }
  
      const bootcamp = await Bootcamp.findByPk(bootcamp_id)
  
      if(!bootcamp) {
        return res.status(404).send({error: 'bootcamp not found!'});
      }
  
      const course = await Course.create(data);
  
      res.status(200).send({data: course})
  
    } catch (error) {
      res.status(500).send({error: error})
    }
  },

  async updateCourse(req, res) {
    try {
      const { course_id } = req.params;
      const updated = await Course.update(req.body, {
        where: {
          id: course_id,
        },
      });

      if (!updated) {
        throw new Error("couldn`t be updated!");
      }

      const updatedCourse = await Course.findOne({ where: { id: course_id } });

      res.status(200).json({ data: updatedCourse });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteCourse(req, res) {
    try {
      const { course_id } = req.params;
      const course = await Course.findByPk(course_id);

      if (!course) {
        throw Error("Course not found");
      }

      // delete
      await Course.destroy({
        where: {
          id: course_id
        },
      });

      res.status(200).json({ data: "course deleted" });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  
}