import { DataTypes, Sequelize } from "sequelize";

/**
 * Member Builder
 * @param {Sequelize} sequelize
 * @returns 
 */
export default function memberBuilder(sequelize) {
    const Member = sequelize.define(
        // Nom du Model
        'member',
        // Attributs
        {
            role: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            score: {
                type: DataTypes.INTEGER,
                validate: {
                    isPositive(value) {
                        if (value < 0) throw new Error ("Score can't be negative");
                    }
                }
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