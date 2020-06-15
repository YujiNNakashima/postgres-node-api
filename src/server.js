const express = require('express');
const User = require('./models/User');
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');
const userRoutes = require('./routes/users.route');
const authRoutes = require('./routes/auth.routes')

require('dotenv').config();
require('./db');

const app = express();
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);



app.get('/test', async (req, res) => {
  try {
    
    const user = await User.findAll();
    res.status(200).send({data: user})

  } catch (error) {
    res.status(500).send({error: error})
  }

})

app.post('/:user_id/bootcamps', async (req, res) => {

  try {

    const {user_id} = req.params
    const {name, email, description} = req.body

    const user = await User.findByPk(user_id);

    if(!user) {
      return res.status(404).send({error: 'user not found'})
    }

    const bootcamp = await Bootcamp.create({name, email, description, user_id})

    res.status(200).json({data: bootcamp})
  } catch (error) {
    console.error(error)
    res.status(500).json({error: error})
  }

})

app.post('/:user_id/:bootcamp_id/courses', async (req, res) => {
  try {
    const {user_id, bootcamp_id} = req.params;
    const {title, weeks, tuition} = req.body;

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
}) 

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})