const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library

const handleServerError = (res, message) => {
  console.error(message);
  res.status(500).json({
    success: false,
    message,
  });
};

exports.createUser = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      name,
      password: hashedPassword,
    };

    await User.create(newUser);
    res.status(201).json({
      success: true,
      message: "New user created",
    });
  } catch (error) {
    handleServerError(res, "An error occurred while creating the user");
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. User not found.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "3d" });
      
      // Set the token in a cookie for client-side storage
      user.password=undefined;
      res.cookie('token', token, { httpOnly: true }).status(200).json({
        success: true,
        message: "Authentication successful",
        user,
      });
    } else {

      return res.status(401).json({
        success: false,
        message: "Authentication failed. Incorrect password.",
      });
    }
  } catch (error) {
    handleServerError(res, "An error occurred during login.");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    handleServerError(res, "An error occurred while deleting the user");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({
      success: true,
      users: allUsers,
    });
  } catch (error) {
    handleServerError(res, "An error occurred while retrieving users");
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    handleServerError(res, "An error occurred while retrieving the user");
  }
};
exports.logout=async(req,res)=>{
  res.cookie('token','').json({
    message:"Cookie resetted"
  })
}
exports.updateUser = async (req, res) => {
  const userId = req.user.id;
  const { email, firstname, lastname, password } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user data
    user.email = email || user.email;
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.password = password || user.password;

    // Save the updated user
    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    handleServerError(res, "An error occurred while updating the user");
  }
};
