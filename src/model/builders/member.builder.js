import { DataTypes, Sequelize } from "sequelize";

/**
 * Ingredient Builder
 * @param {Sequelize} sequelize
 * @returns 
 */
export default function userBuilder(sequelize) {
    const User = sequelize.define(
        // Nom du Model
        'user',
        // Attributs
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false
            }
        },
        // Options
        {
            tableName: 'user',
            timestamps: false
        }
    );

    return User;
};