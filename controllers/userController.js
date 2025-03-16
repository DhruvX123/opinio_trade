const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerAdmin = async (req, res) => {
  const { name, email, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser  = new User({ name, email, username, password: hashedPassword, role: 'admin' });

  try {
    await newUser .save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering admin', error });
  }
};

// Admin login
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || user.role !== 'admin') {
    return res.status(404).json({ message: 'Admin not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, 'SECRET_KEY');
  res.json({ token });
};

exports.signup = async (req, res) => {
  const { name, username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, username, email, password: hashedPassword });
  res.status(201).json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, 'SECRET_KEY');
  res.status(200).json({ token });
};
