import express from 'express';
import argon2 from "argon2";
import userRepository from '../repositories/user.repository.js';

/**
 * @callback ExpressCallback
 * @param {express.Request} req
 * @param {express.Response} res
 */
/**
 * Auth Controller
 * @type {Object<string, ExpressCallback>}
 */
const authController = {
  login: async (req, res) => {
    if (!req.body) {
      res.status(400).json({ error: 'Missing request body' });
      return;
    }

    const { email, password } = req.body;

    if (!password || !email) {
      res.status(400).json({ error: 'Missing credentials' });
      return;
    }

    const user = await userRepository.getByEmail(email);

    if (!user) {
      res.status(403).json({ error: 'Wrong credentials' });
      return;
    }
    const matchPassword = await argon2.verify(user.password, password)
    if (!matchPassword) {
      res.status(401).json({ error: 'Wrong credentials' });
      return;
    }

    req.session.user = user;
    res.status(200).json(user);
  },
  register: async (req, res) => {
    let { name, password, email } = req.body;
    name = name?.trim();
    // TODO More validation here : (ZOD ? )
    // TODO check if user has already the same email
    if (!name || !password || !email) {
      res.status(400).json({ error: 'Missing credentials !' });
      return;
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = await userRepository.addUser({ name, email, hashedPassword });
    res.json(newUser);
  },
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).json('Session destroyed');
  },
};

export default authController;
