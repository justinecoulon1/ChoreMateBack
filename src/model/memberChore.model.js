import { DataTypes, Sequelize } from "sequelize";

/**
 * memberChore Builder
 * @param {Sequelize} sequelize
 * @returns 
 */

export default function memberChoreModel(sequelize) {
    const MemberChore = sequelize.define(
        'memberChore',
        {},
        {
            tableName: 'memberChore',
            timestamps: false
        }
    );

    return MemberChore;
};
