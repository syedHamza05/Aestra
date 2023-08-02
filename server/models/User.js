const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    match: [/^[A-Za-z]+$/, "First Name must contain alphabets only"],
  },
  lastName: {
    type: String,
    required: true,
    match: [/^[A-Za-z]+$/, "Last Name must contain alphabets only"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        const currentDate = new Date();
        const birthDate = new Date(value);
        return currentDate - birthDate >= 1000 * 60 * 60 * 24 * 365.25 * 14; // 14 years in milliseconds
      },
      message: "You must be at least 14 years old to register.",
    },
  },
  age: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
