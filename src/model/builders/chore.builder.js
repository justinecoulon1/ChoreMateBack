import { DataTypes, Sequelize } from "sequelize";

/**
 * Chore Builder
 * @param {Sequelize} sequelize
 * @returns 
 */
export default function choreBuilder(sequelize) {
    const Chore = sequelize.define(
        // Nom du Model
        'chore',
        // Attributs
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            status: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            dueDate: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        // Options
        {
            tableName: 'chore',
            timestamps: false
        }
    );

    return Chore;
};