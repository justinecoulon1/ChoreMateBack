import { DataTypes, Sequelize } from "sequelize";

/**
 * Group Builder
 * @param {Sequelize} sequelize
 * @returns 
 */
export default function groupModel(sequelize) {
    const Group = sequelize.define(
        // Nom du Model
        'group',
        // Attributs
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull: false
            }
        },
        // Options
        {
            tableName: 'group',
            timestamps: false
        }
    );

    return Group;
};