import express from 'express';
import userModel from '../repositories/user.repository.js';

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
  login: (req, res) => {
    if (!req.body) {
      res.status(400).json({ error: 'Missing request body' });
      return;
    }

    const { email, password } = req.body;

    if (!password || !email) {
      res.status(400).json({ error: 'Missing credentials' });
      return;
    }

    const user = userModel.getByEmail(email);

    if (!user || password !== user.password) {
      res.status(403).json({ error: 'Wrong credentials' });
      return;
    }

    req.session.user = user;
    res.status(200).json(user);
  },

  logout: (req, res) => {
    req.session.destroy();
    res.status(200).json('Session destroyed');
  },
};

export default authController;
