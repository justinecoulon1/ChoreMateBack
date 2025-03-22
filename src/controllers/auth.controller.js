import argon2 from "argon2";
import express from 'express';
import { generateJWT } from '../helpers/jwt.helper.js';
import userRepository from '../repositories/user.repository.js';
import { UserRegisterSchema } from "../validators/user.validator.js";

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

    const token = await generateJWT(user);

    req.session.user = user;
    res.status(200).json(token);
  },
  register: async (req, res) => {
    const { data, success, error } = UserRegisterSchema.safeParse(req.body);
    if (!success) {
      res.status(422).json({ error: error.flatten().fieldErrors });
      return;
    }

    const { name, password, email } = data;

    const existingUser = await userRepository.getByEmail(email)
    if (existingUser) {
      res.status(409).json('Email already in use');
      return;
    }

    const hashedPassword = await argon2.hash(password);
    const newUser = await userRepository.addUser({ name, email, hashedPassword });
    res.status(201).json(newUser);
  },
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).json('Session destroyed');
  },
};

export default authController;
