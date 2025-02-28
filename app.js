import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './src/routers/user.router.js';
import choresRouter from './src/routers/chores.router.js';
import groupRouter from './src/routers/group.router.js';
import db from './src/model/index.js';

const { NODE_ENV, PORT, CLIENT_ORIGIN } = process.env;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

// Middelware pour traiter les json en POST
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));

// Enable CORS to allow the front-end to access our routes
app.use(cors({
    origin: CLIENT_ORIGIN
}))

// DB connection
try {
    await db.sequelize.authenticate();

    console.log('Connexion DB - Success !');
}
catch (err) {
    console.log('Connection DB - Fail');
    console.log(err);
    process.exit();
}

if (process.env.NODE_ENV === 'dev') {
    //? Méthode d'initialisation de la DB (basic)
    // await db.sequelize.sync();

    //? Methode d'initialisation et modification de la DB
    //? Modification autorisé sur les tables
    // await db.sequelize.sync({
    //     alter: true
    // });

    //? Ajouts autorisé sur les tables
    // await db.sequelize.sync({
    //     alter: { drop: false }
    // });

    //? Methode pour forcer la recréation complete des tables (Dernier recours - Uniquement en DEV !!!)
    await db.sequelize.sync({
        force: true
    });
}

app.use("/users", userRouter);
app.use("/chores", choresRouter);
app.use("/groups", groupRouter);

app.listen(PORT, () => {
    console.log(`Web server is running on port ${PORT} [${NODE_ENV}]`);
});