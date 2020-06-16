const express = require('express');
const userRoutes = require('./routes/users.route');
const authRoutes = require('./routes/auth.routes');
const bootcampRoutes = require('./routes/bootcamp.routes');
const courseRoutes = require('./routes/course.routes');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

require('dotenv').config();
require('./db');

const app = express();

app.use(helmet());
app.use(xss())
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 100
});
app.use(limiter);
app.use(cors());


app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bootcamps', bootcampRoutes);
app.use('/api/v1/courses', courseRoutes)


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})