import express from 'express';
import morgan from 'morgan';
import userRouter from './src/routers/user.router.js';
import choresRouter from './src/routers/chores.router.js';

const { NODE_ENV, PORT } = process.env;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

// Middelware pour traiter les json en POST
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));

app.use("/users" , userRouter);
app.use("/chores", choresRouter);

app.listen(PORT, () => {
    console.log(`Web server is running on port ${PORT} [${NODE_ENV}]`);
});