const User = require("../models/User");
const {checkProperties} = require('../utils');


module.exports = {
  async getUsers(req, res) {
    try {
      const {options} = req

      const users = await User.findAll(options)

      res.status(200).json({ data: users });
    } catch (error) {
      res.status(200).json({ error: "users not found!" });
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        include: { association: "bootcamps" },
      });

      if (!user) {
        throw new Error("user not found!");
      }

      res.status(200).json({ data: user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createUser(req, res) {
    try {
      const { name, email, role, password } = req.body;

      const user = await User.create({ name, role, password, email });

      res.status(200).json({ data: user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updated = await User.update(req.body, {
        where: {
          id: id,
        },
      });

      if (!updated) {
        throw new Error("couldn`t be updated!");
      }

      const updatedUser = await User.findOne({ where: { id: id } });
      res.status(200).json({ data: updatedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        throw Error("User not found");
      }

      // delete
      await User.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({ data: "user deleted" });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};
