import express from 'express';
import morgan from 'morgan';
import userRouter from './src/routers/user.router.js';

const { NODE_ENV, PORT } = process.env;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));

app.use("/users" , userRouter);

app.listen(PORT, () => {
    console.log(`Web server is running on port ${PORT} [${NODE_ENV}]`);
})