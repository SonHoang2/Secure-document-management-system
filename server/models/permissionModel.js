import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const Permission = sequelize.define('permission', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    documentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    action: {
        type: DataTypes.ENUM('read', 'modify'),
        allowNull: false
    },
},
    {
        timestamps: false,
    }
);

export default Permission;