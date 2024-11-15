import sequelize from '../db.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import Document from './documentModel.js';

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    googleAccount: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    passwordChangedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    },
},
    {
        timestamps: false,
        defaultScope: {
            attributes: { exclude: ['password'] },
        },
        scopes: {
            withPassword: {
                attributes: {},
            },
        },
    }
);

User.associate = (models) => {
    User.hasMany(models.Document, { foreignKey: 'createdBy' });
}

User.beforeCreate(async (user, options) => {
    user.password = await bcrypt.hash(user.password, 12);
});

User.prototype.validPassword = function (password) {
    console.log("password:", password, this.password);

    return bcrypt.compareSync(password, this.password);
};


export default User;