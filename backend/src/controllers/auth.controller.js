import User from "../models/User.js";
import { generateToken } from "../utils/token.js";
import bcrypt from "bcryptjs";

// Signup controller function
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // test constion for input data
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Passsword must be of 6 characters" });
    }
    // for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    // work in DB
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email Areday Exists" });
    }
    // storing password by hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    // if user come save this after generating token
    if (newUser) {
      generateToken(newUser._id, res); // craete a function for this
      await newUser.save(); // save to db
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
      // sends welcome mail to user
      
    } else {
      res.status(400).json({ message: "Invalid User data" });
    }
  } catch (error) {
    console.log("Error in singnup controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login controller function
export const login = (req, res) => {
  res.send("login");
};

// logout controller function
export const logout = (req, res) => {
  res.send("logout");
};
