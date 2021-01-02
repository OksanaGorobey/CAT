////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const config                    = require( __base + 'src/config' );

const { Sequelize, DataTypes }  = require('sequelize');
const sequelize                 = new Sequelize( config.db.dsn, config.db.options );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const tasks = sequelize.define(
    'tasks',
    {
        'id'                :                       // ID завдання
        {
            type            : DataTypes.UUID,
            unique          : true,
            primaryKey      : true,
            autoIncrement   : true,
        },
        'user_id'           :                       // ID користувача (з таблиці public.users)
        {
            type            : DataTypes.UUID,
            allowNull       : false
        },
        'title'             :                       // Тіло завдання
        {
            type            : DataTypes.STRING(2048),
        },
        'status'            :                       // Стан: 1 - активний, 2 - виконаний, 0 - видалений
        {
            type            : DataTypes.INTEGER,
            defaultValue    : consts.GENERAL_STATUS_ACTIVE
        }
    },
    {
        tableName  : 'tasks',
        createdAt  : 'created_date',
        updatedAt  : 'updated_date',
        deletedAt  : 'deleted_date',
        paranoid   : true,
        underscored: true,
    }
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = tasks;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////