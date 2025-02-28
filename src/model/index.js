import { Sequelize } from "sequelize";
import ingredientBuilder from "./ingredient.model.js";
import recetteBuilder from "./recette.model.js";
import recetteIngredientBuilder from "./recette-ingredient.model.js"
import platBuilder from "./plat.model.js";


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

db.ingredient = ingredientBuilder(sequelize);

db.recette = recetteBuilder(sequelize);

db.plat = platBuilder(sequelize);

db.recetteIngredient = recetteIngredientBuilder(sequelize);

//! Définition des contraintes
//? [One to Many] recette - plat
db.plat.hasMany(db.recette, { foreignKey: { allowNull: false } });
db.recette.belongsTo(db.plat, { foreignKey: { allowNull: false } });

//? [Many to Many] recette - ingredient

//? -Simple = Sans aucuns attributs !
// db.recette.belongsToMany(db.ingredient, { through: 'recette_ingredient' });
// db.ingredient.belongsToMany(db.recette, { through: 'recette_ingredient' });

//? - Via un model : Permet de customiser la table intermediaire
db.recette.belongsToMany(db.ingredient, { through: db.recetteIngredient });
db.ingredient.belongsToMany(db.recette, { through: db.recetteIngredient });


export default db;