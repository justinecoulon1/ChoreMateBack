import { DataTypes, Sequelize } from "sequelize";

/**
 * Ingredient Builder
 * @param {Sequelize} sequelize
 * @returns 
 */
export default function memberBuilder(sequelize) {
    const Member = sequelize.define(
        // Nom du Model
        'member',
        // Attributs
        {
            groupId: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            userId: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            role: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            score: {
                type: DataTypes.NUMBER
            }
        },
        // Options
        {
            tableName: 'member',
            timestamps: false
        }
    );

    return Member;
};