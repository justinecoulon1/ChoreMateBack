import { Sequelize } from "sequelize";
import userModel from "./user.model.js";
import groupModel from "./group.model.js";
import memberModel from "./member.model.js";
import choreModel from "./chore.model.js";
import memberChoreModel from "./memberChore.model.js";


const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_DIALECT } = process.env;

//! Initialisation de l'instance de Sequelize
const sequelize = new Sequelize({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: DB_DIALECT
});

//! Object << db >> qui contient l'instance de sequelize et les infos des Models

export const db = {};
db.sequelize = sequelize;

//! Definition des modèles
// Initialisation des modèles

const models = {
    User: userModel(sequelize),
    Group: groupModel(sequelize),
    Member: memberModel(sequelize),
    Chore: choreModel(sequelize),
    MemberChore: memberChoreModel(sequelize)
}

// Définition des relations
const { User, Group, Member, Chore, MemberChore } = models;

User.hasMany(Member, { foreignKey: "userId" });
Member.belongsTo(User, { foreignKey: "userId" });

Group.hasMany(Member, { foreignKey: "groupId", onDelete: 'CASCADE' });
Member.belongsTo(Group, { foreignKey: "groupId" });

Group.hasMany(Chore, { foreignKey: "groupId" });
Chore.belongsTo(Group, { foreignKey: "groupId" });

// Many-to-Many : Member <-> Chore via MemberChore
Member.belongsToMany(Chore, { through: MemberChore, foreignKey: "memberId" });
Chore.belongsToMany(Member, { through: MemberChore, foreignKey: "choreId" });



const connectDB = async () => {
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
        await db.sequelize.sync({
            alter: true
        });

        //? Ajouts autorisé sur les tables
        // await db.sequelize.sync({
        //     alter: { drop: false }
        // });

        //? Methode pour forcer la recréation complete des tables (Dernier recours - Uniquement en DEV !!!)
        // await db.sequelize.sync({
        //     force: true
        // });
    }
}

db.connectDB = connectDB;
db.models = models;

export default { db };