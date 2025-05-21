import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

const secret = 'test';

export const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ username: existingUser.username, id: existingUser._id, name: existingUser.nam }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// server/controllers/user.js
export const signup = async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      username,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ username: result.username, id: result._id }, secret, { expiresIn: "1h" });

    res.status(201).json({ result, token });
  } catch (err) {
    console.error('Signup error:', err); // Log the error
    res.status(500).json({ message: 'Something went wrong', error: err.message }); // Send error message
  }
};

