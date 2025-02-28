import { Sequelize } from "sequelize";
import userBuilder from "./builders/user.builder.js";
import groupBuilder from "./builders/groupBuilder.js";
import memberBuilder from "./builders/member.builder.js";
import choreBuilder from "./builders/chore.builder.js";
import memberChoreBuilder from "./builders/memberChore.builder.js";


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
const User = userBuilder(sequelize);
const Group = groupBuilder(sequelize);
const Member = memberBuilder(sequelize);
const Chore = choreBuilder(sequelize);
const MemberChore = memberChoreBuilder(sequelize);

// Définition des relations
User.hasMany(Member, { foreignKey: "userId" });
Member.belongsTo(User, { foreignKey: "userId" });

Group.hasMany(Member, { foreignKey: "groupId" });
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
}


export { sequelize, User, Group, Member, Chore, MemberChore, connectDB};