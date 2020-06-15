const User = require("../models/User");
const { Op } = require("sequelize");

module.exports = {
  async getUsers(req, res) {
    try {
      let options = {where: {}}

      function checkProperties(obj) {
        if(Object.keys(obj).length === 0 && obj.constructor === Object) return false

        for (var key in obj) {
          if (obj[key] != "") return false;
        }

        return true;
      }

      const query = req.query;

      let haveProps = checkProperties(query);

      if (haveProps) {
        const props = Object.keys(query);
        options.attributes = [...props]
      } 
      
      if (query && !query.limit && !query.offset) {
        options.where = {...query}
      }

      if(query.limit) {
        options.limit = query.limit
      }

      if(query.offset) {
        options.offset = query.offset
      }

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
