const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      gender,
      dob,
      age,
    } = req.body;

    const user = await User.create({
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      gender,
      dob,
      age,
    });

    return res.status(201).json({
      status: 201,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
