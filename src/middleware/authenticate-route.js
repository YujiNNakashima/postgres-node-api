const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");


module.exports = {
  async protect(req, res, next) {
    try {
      const header = req.header('Authorization');
      const token = header.split(' ')[1];

      if(!token || !header) {
        throw new Error('not authenticated!')
      }

      const authenticated = await jwt.verify(token, process.env.SECRET)

      const user = await User.findOne({
        where: {
          id: authenticated.data.id
        }
      })

      req.user = user

      next();

    } catch (error) {
      res.status(400).json({error: error.message, authenticated: false})
    }

  } 
}