////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const config                    = require( __base + 'src/config' );

const bcrypt                    = require( 'bcrypt' );

const { Sequelize, DataTypes }  = require('sequelize');
const sequelize                 = new Sequelize( config.db.dsn, config.db.options );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const users = sequelize.define(
    'users',
    {
        'id'                    :               // ID користувача
        {
            type            : DataTypes.UUID,
            unique          : true,
            primaryKey      : true,
            autoIncrement   : true,
        },
        'name'                 :                // Імʼя користувача
        {
            type            : DataTypes.STRING(64),
            allowNull       : false,
        },
        'email'                 :               // Email користувача
        {
            type            : DataTypes.STRING(64),
            unique          : true,
            allowNull       : false,
            validate:
            {
                isEmail :
                {
                    msg: consts.USERS_CREATE_VALIDATE_ERROR_EMAIL.toString()
                }
            }
        },
        'passwd'              :                 // Хешований пароль
        {
            type            : DataTypes.STRING(128),
            allowNull       : false,
        },
        'status'                :               // Стан: 1 - активний, 0 - видалений
        {
            type            : DataTypes.INTEGER,
            defaultValue    : consts.GENERAL_STATUS_ACTIVE,
            allowNull       : false
        }
    },
    {
        tableName  : 'users',
        createdAt  : 'created_date',
        updatedAt  : 'updated_date',
        deletedAt  : 'deleted_date',
        paranoid   : true,
        underscored: true,
        hooks      :
        {
            beforeCreate: async function( user )
            {
                user.passwd = await bcrypt.hash( user.email + user.passwd, 10 );
            },
            beforeUpdate: async function( user, options )
            {
                if( user.changed().includes( 'passwd' ) )
                {
                    user.passwd = await bcrypt.hash( user.email + user.passwd, 10 );
                }
            }
        },
    }
);

users.prototype.validPasswd = async function ( email, passwd )
{
    return await bcrypt.compare( email + passwd, this.passwd );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = users;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////