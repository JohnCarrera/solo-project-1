'use strict';

const bcrypt = require('bcryptjs');
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {

        static async login({ credential, password }) {
            const { Op } = require('sequelize');
            const user = await User.scope('loginUser').findOne({
                where: {
                    [Op.or]: {
                        username: credential,
                        email: credential
                    }
                }
            });
            if (user && user.validatePassword(password)) {
                return await User.scope('currentUser').findByPk(user.id);
            }
        }

        static async signup({ username, email, password, firstName, lastName }) {
            const hashedPassword = bcrypt.hashSync(password);
            const user = await User.create({
                username,
                email,
                hashedPassword,
                firstName,
                lastName,
            });
            return await User.scope('currentUser').findByPk(user.id);
        }

        static getCurrentUserById(id) {
            return User.scope("currentUser").findByPk(id);
        }

        toSafeObject() {
            const { id, firstName, lastName, email } = this; // context will be the User instance
            return { id, firstName, lastName, email };
        }

        validatePassword(password) {
            return bcrypt.compareSync(password, this.hashedPassword.toString());
        }
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsToMany(models.Group, {
                through: models.Membership,
                foreignKey: 'userId'
            });

            User.belongsToMany(models.Event, {
                through: models.Attendance,
                foreignKey: 'userId'
            });

            User.hasMany(models.Group, {
                foreignKey: 'organizerId'
            });

            User.hasMany(models.Membership, {
                foreignKey: 'userId',
                as: 'Membership'
            });

            User.hasMany(models.Attendance, {
                foreignKey: 'userId',
                as: 'Attendance'
            });
        }
    }
    User.init({
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [4, 30],
                isNotEmail(value) {
                    if (Validator.isEmail(value)) {
                        throw new Error("emailVal");
                    }
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'userEmailVal'
            },
            validate: {
                len: [3, 256],
                isEmail: true
            }
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 30]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 30]
            }
        },
        hashedPassword: {
            type: DataTypes.STRING.BINARY,
            allowNull: false,
            validate: {
                len: [60, 60]
            }

        },
    },
        {
            sequelize,
            modelName: "User",
            defaultScope: {
                attributes: {
                    exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
                }
            },
            scopes: {
                currentUser: {
                    attributes: { exclude: ["hashedPassword"] }
                },
                loginUser: {
                    attributes: {}
                },
                organizer: {
                    attributes: ['id', 'firstName', 'lastName']
                },
                userMembership: {
                    attributes: ['id', 'firstName', 'lastName']
                },
                userAttendance: {
                    attributes: ['id', 'firstName', 'lastName']
                }
            }
        });
    return User;
};
