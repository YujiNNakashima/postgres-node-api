const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  async registerUser(req, res) {
    try {
      const { name, email, role, password } = req.body;

      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        return res.status(500).send({ error: "email already in use" });
      }

      const hash = await bcrypt.hash(password, 10);

      const newUser = await User.create({ name, role, password: hash, email });

      if (!newUser) {
        throw new Error("error creating user");
      }

      const token = await jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60), 
        data: {name, role}
      }, process.env.SECRET);

      res.status(200).json({ success: true, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      // password e email (checar)
      const { password, email } = req.body;
      // checar se existe
      if (!password || !email) {
        throw new Error("Please provide correct email and password");
      }

      // achar no banco
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      if(!user) {
        throw new Error('user not found');
      }

      // checar senha
      const match = await bcrypt.compare(password, user.password);

      if(!match) {
        throw new Error('wrong credentials!')
      }

      const token = await jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60), 
        data: { id: user.id, role: user.role
        }}, process.env.SECRET);

      res.status(200).json({token: token})
      

      // se passar, gerar e enviar token
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  },

  async logout(req, res) {
    // POST
  },

  async testToken(req, res) {
    try {
      res.status(200).json(req.user)
    } catch (error) {
      res.status(500).json({error: error.message})
    }

  } 
};
