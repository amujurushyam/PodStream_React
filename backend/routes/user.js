const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
// signup - route
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (username.length < 5) {
      return res
        .status(400)
        .json({ message: "Username should be at least 5 characters" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be at least 6 characters" });
    }

    // check if user already exists
    const existingEmail = await User.findOne({ email: email });
    const existingUsername = await User.findOne({ username: username });
    if (existingEmail || existingUsername) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });
    await newUser.save();
    res.status(200).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// sig-in - route
router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    // check if user exists
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // check password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("podstreamUsertoken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
    return res.status(200).json({
      id: existingUser._id,
      username: existingUser.username,
      email: email,
      message: "Sign-in successful",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// logout - route
router.post("/logout", async (req, res) => {
  res.clearCookie("podstreamUsertoken", {
    httpOnly: true,
  });
  res.json({
    message: "Logout successful",
  });
});

// check cookie - route
router.get("/check-cookie", async (req, res) => {
  const token = req.cookies.podstreamUsertoken;
  if (token) {
    res.status(200).json({
      message: true,
    });
  }
  res.status(200).json({
    message: false,
  });
});

// route to get user details

router.get("/user-details", authMiddleware, async (req, res) => {
  try {
    const { email } = req.user;
    const existingUser = await User.findOne({ email: email }).select(
      "-password"
    );
    return res.status(200).json({
      user: existingUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});
module.exports = router;
