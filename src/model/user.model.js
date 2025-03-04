import { DataTypes, Sequelize } from "sequelize";

/**
 * User Builder
 * @param {Sequelize} sequelize
 * @returns 
 */
export default function userModel(sequelize) {
    const User = sequelize.define(
        // Nom du Model
        'user',
        // Attributs
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
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