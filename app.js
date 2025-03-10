import cors from 'cors';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import authRouter from './src/routers/auth.router.js';
import choresRouter from './src/routers/chores.router.js';
import groupRouter from './src/routers/group.router.js';
import { db } from './src/model/index.js';
import userRouter from './src/routers/user.router.js';
import { authentificationMiddleware } from './src/middlewares/auth/auth.middelware.js';

const { NODE_ENV, PORT, CLIENT_ORIGIN, SESSION_SECRET } = process.env;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

// Middelware pour traiter les json en POST
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
  }),
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use(authentificationMiddleware());

// Enable CORS to allow the front-end to access our routes
app.use(
  cors({
    origin: CLIENT_ORIGIN,
  }),
);

await db.connectDB();

app.use("/users", userRouter);
app.use("/chores", choresRouter);
app.use("/groups", groupRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Web server is running on port ${PORT} [${NODE_ENV}]`);
});
