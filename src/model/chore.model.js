import { DataTypes, Sequelize } from "sequelize";

/**
 * Chore Builder
 * @param {Sequelize} sequelize
 * @returns 
 */
export default function choreModel(sequelize) {
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
                type: DataTypes.ENUM('TODO', 'DONE'),
                allowNull: false,
                defaultValue: 'TODO'
            },
            dueDate: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    isAfter: new Date().toISOString()
                }
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