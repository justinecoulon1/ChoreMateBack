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
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                    isAfter: new Date(Date.now() - 86400000).toISOString()
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