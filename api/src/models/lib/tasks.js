////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const { Op }                    = require('sequelize');
const config                    = require( __base + 'src/config' );

const tasks                     = {};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

tasks.getList                   = async ( params ) =>
{
    // отримання ID користувача за токеном та оновлення часу життя токена
    const userId = await models.lib.users.getIdByTokenUpdateTTL( params._token );

    // Перевірка на наявність завдання з таким ID та власником у БД
    const { count, rows } = await models.orm.tasks.findAndCountAll(
        {
            'attributes': [ 'id', 'title', 'status', ],
            'where' :
            {
                'user_id': userId
            },
            'order':
            [
                ['updated_date', 'DESC'],
            ],
            'offset': params.offset || config.defaults.offset,
            'limit' : params.limit || config.defaults.limit
        }
    );

    // Повернення даних
    return {
        'count' : count || 0,
        'data'  : rows || []
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

tasks.getOne                    = async ( params ) =>
{
    // отримання ID користувача за токеном та оновлення часу життя токена
    const userId = await models.lib.users.getIdByTokenUpdateTTL( params._token );

    const options =
    {
        'where':
        {
            [ Op.and ]:
            [
                { 'id'        : params._id },
                { 'user_id'   : userId },
            ]
        }
    };

    // Перевірка на наявність завдання з таким ID та власником у БД
    const taskData = await models.orm.tasks.findOne( options );

    if( !taskData )
    {
        throw new ErrorsException( consts.TASKS_GETONE_TASK_NOT_FOUND );
    }

    const taskCount = taskData ? 1 : 0;

    // Повернення даних
    return {
        'count' : taskCount,
        'data'  : taskData
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

tasks.create                    = async ( params ) =>
{
    // отримання ID користувача за токеном та оновлення часу життя токена
    const userId = await models.lib.users.getIdByTokenUpdateTTL( params._token );

    // Створення завдання
    const createdData = await models.orm.tasks.create(
        {
            'user_id'  : userId,
            'title'    : params.title
        }
    );

    const createdCount = createdData ? 1 : 0;

    // Повернення даних
    return {
        'count' : createdCount,
        'data'  :
        {
            'id'   : createdData.id,
        }
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

tasks.update                    = async ( params ) =>
{
    // отримання ID користувача за токеном та оновлення часу життя токена
    const userId = await models.lib.users.getIdByTokenUpdateTTL( params._token );

    const options =
    {
        'where':
        {
            [ Op.and ]:
            [
                { 'id'        : params._id },
                { 'user_id'   : userId },
            ]
        }
    };

    // Перевірка на наявність завдання з таким ID та власником у БД
    const taskData = await models.orm.tasks.findOne( options );

    if( !taskData )
    {
        throw new ErrorsException( consts.TASKS_UPDATE_TASK_NOT_FOUND );
    }

    // Оновлення запису у БД
    const updatedData = await models.orm.tasks.update(
        {
            'title' : params.title || null,
            'status': params.status || null,
        },
        Object.assign(
            {},
            options,
            {
                'omitNull' : true
            }
        )
    );

    const updatedCount = updatedData ? 1 : 0;

    // Повернення даних
    return {
        'count' : updatedCount,
        'data'  :
        {
            'id'        : params._id,
            'user_id'   : userId,
        }
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

tasks.delete                    = async ( params ) =>
{
    // отримання ID користувача за токеном та оновлення часу життя токена
    const userId = await models.lib.users.getIdByTokenUpdateTTL( params._token );

    const options =
    {
        'where':
        {
            [ Op.and ]:
            [
                { 'id'        : params._id },
                { 'user_id'   : userId },
            ]
        }
    };

    // Перевірка на наявність завдання з таким ID та власником у БД
    const taskData = await models.orm.tasks.findOne( options );

    if( !taskData )
    {
        throw new ErrorsException( consts.TASKS_DELETE_TASK_NOT_FOUND );
    }

    // Встановлення стану=0 (видалений)
    const updatedData = await models.orm.tasks.update(
        {
            'status': 0,
        },
        options
    );

    // Видалення запису з БД (Soft Delete)
    const deletedData = await models.orm.tasks.destroy(
        options
    );

    const deletedCount = deletedData ? 1 : 0;

    // Повернення даних
    return {
        'count' : deletedCount,
        'data'  :
        {
            'id'        : params._id,
            'user_id'   : userId,
        }
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = tasks;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
