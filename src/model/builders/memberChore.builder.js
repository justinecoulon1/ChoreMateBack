import { DataTypes, Sequelize } from "sequelize";

/**
 * memberChore Builder
 * @param {Sequelize} sequelize
 * @returns 
 */

export default function memberChoreBuilder(sequelize) {
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
