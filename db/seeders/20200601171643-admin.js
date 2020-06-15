"use strict";
const bcrypt = require("bcrypt");
const crypto = require("crypto");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = crypto.randomBytes(15).toString("hex");
    const hashedPwd = await bcrypt.hash(password, 10)

    return queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Yuji",
          id: 0,
          email: "yuji@uol.com",
          role: "admin",
          password: hashedPwd,
          resetPasswordToken: '',
          resetPasswordExpire: '',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },


  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
