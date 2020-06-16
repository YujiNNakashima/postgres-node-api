const Bootcamp = require('../models/Bootcamp');
const User = require('../models/User');

module.exports = {
  async getBootcamps (req, res) {
    try {

      const bootcamps = await Bootcamp.findAll()

      if(!bootcamps) {
        throw new Error('bootcamp not found')
      }

      res.status(200).json({
        data: bootcamps
      })

    } catch (error) {
      res.status(500).json({error: error.message})
    }
  },

  async getBootcampById(req, res) {

    try {
      const {bootcamp_id} = req.params

      const bootcamp = await Bootcamp.findByPk(bootcamp_id)

      if(!bootcamp) {
        throw new Error('bootcamp not found')
      }

      res.status(200).json({data: bootcamp})
  
    } catch (error) {
      res.status(500).json({error: error.message})
    }

  },

  async createBootcamp(req, res) {
    try {

      const {name, email, description, user_id} = req.body
  
      const user = await User.findByPk(user_id);
  
      if(!user) {
        return res.status(404).send({error: 'user not found'})
      }
  
      const bootcamp = await Bootcamp.create({name, email, description, user_id})
  
      res.status(200).json({data: bootcamp})
    } catch (error) {

      res.status(500).json({error: error})
    }
  },

  async updateBootcamp(req, res) {
    try {
      const { bootcamp_id } = req.params;
      const updated = await Bootcamp.update(req.body, {
        where: {
          id: bootcamp_id,
        },
      });

      if (!updated) {
        throw new Error("couldn`t be updated!");
      }

      const updatedBootcamp = await Bootcamp.findOne({ where: { id: bootcamp_id } });

      res.status(200).json({ data: updatedBootcamp });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteBootcamp(req, res) {
    try {
      const { bootcamp_id } = req.params;
      const bootcamp = await Bootcamp.findByPk(bootcamp_id);

      if (!bootcamp) {
        throw Error("User not found");
      }

      // delete
      await Bootcamp.destroy({
        where: {
          id: bootcamp_id
        },
      });

      res.status(200).json({ data: "user deleted" });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  
}