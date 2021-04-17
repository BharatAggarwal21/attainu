const express = require('express');
const router = express.Router();
const bcrypt=require('bcryptjs');

const jwt=require('jsonwebtoken');
const auth=require('../../middleware/auth');
// User Model
const User=require('../../models/user');

const JWT_SECRET  = "sl_myJwtSecret";


/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public,i
 */

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  

  try {
    if (!email || !password) {
      throw Error('Please enter all fields' );
    }
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) throw Error('User Does not exist');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');

    const token = await jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
    if (!token) throw Error('Couldnt sign the token');
    console.log("done");
    res.json({
      token,
      user: {
        id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email
      }
    });
  } catch (e) {
    res.status(400).json({ err: e.message });
  }
});

/**
 * @route   POST api/users
 * @desc    Register new user
 * @access  Public
 */

router.post('/', async (req, res) => {
  const { fname,lname, email, password } = req.body;
  console.log("isme");


  try {
    if (!fname || !lname || !email || !password) {
      throw Error('Please enter all fields' );
    }
    const user = await User.findOne({ email });
    if (user) throw Error('User already exists');

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newUser = new User({
      fname,
      lname,
      email,
      password: hash
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');

    res.status(200).json({
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email
      }
    });
  } catch (e) {
    res.status(400).json({ err: e.message });
  }
});

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

module.exports = router;
