const pool = require("../config/db");
const bcrypt = require("bcrypt");
const validator = require("validator");

const User = {
  // ✅ সব User দেখাও
  // ✅ ID দিয়ে একজন User খোঁজো
  // ✅ নতুন User তৈরি করো

  createUser: async (name, email, password, age) => {
    // do something before insert
    console.log("Before insert");
    // validation

    if (!name || !email || !password || !age) {
      throw new Error("All fields are required");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email");
    }

    if (!validator.isInt(age.toString(), { min: 18 })) {
      throw new Error("Age must be at least 18");
    }

    if (
      !validator.isStrongPassword(password, { minLength: 6, minNumbers: 1 })
    ) {
      throw new Error("Password too weak");
    }
    // password hashing
    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, age)
             VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, hashed, age],
    );
    // do something after insert
    console.log("After insert");

    return result.rows[0];
  },

  // ✅ User আপডেট করো
  // ✅ User মুছো
};

module.exports = User;
