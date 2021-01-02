////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const crypto                    = require( 'crypto' );
const config                    = require( __base + 'src/config' );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const users                    = {};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

users.authorize                = async ( params ) =>
{
    // Пошук користувача
    const user = await models.orm.users.findOne(
        {
            'where' :
            {
                'email' : params['email']
            }
        }
    );

    if( !user )
    {
        throw new ErrorsException( consts.USERS_AUTHORIZE_USER_NOT_FOUND );
    }

    // Перевірка пароля користувача
    if( !( await user.validPasswd( params['email'], params['passwd'] ) ) )
    {
        throw new ErrorsException( consts.USERS_AUTHORIZE_USER_NOT_VALID_PASSWD );
    }

    // Перевірка стану користувача
    if( user['status'] !== consts.GENERAL_STATUS_ACTIVE )
    {
        throw new ErrorsException( consts.USERS_AUTHORIZE_USER_NOT_ACTIVE );
    }

    const data  = user.dataValues;
    const count = data ? 1 : 0;

    // Створення ключа сесії (токена)

    // генеруємо сесійний токен
    data.token = await users._generateToken();

    await Promise.all(
        [
            // встановлюємо сессійний токен (значення: ID користувача) з TTL
            redis[ config.redis.instances.user.token ].set(
                config.redis.keys.user.token.replace( '%user_token%', data.token ),
                data.id,
                'EX',
                config.redis.expires.user.token
            ),

            // додаємо сессійний токен до списку токенів поточного користувача (значення: сессійний токен)
            redis[ config.redis.instances.user.tokens ].sadd(
                config.redis.keys.user.tokens.replace( '%userId%', data.id ),
                data.token
            )
        ]
    );

    // Повернення даних
    return {
        count,
        'data':
        {
            'id'   : data.id,
            'email': data.email,
            'token': data.token,
        }
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

users.create                    = async ( createParams ) =>
{
    // Перевірка на унікальність поля email
    const user = await models.orm.users.findOne(
        {
            'where' :
            {
                'email' : createParams['email']
            }
        }
    );

    if( user )
    {
        if( user['email'] === createParams['email'] )
        {
            throw new ErrorsException(consts.USERS_CREATE_UNIQUE_ERROR_EMAIL);
        }
    }

    // Створення користувача
    const data = await models.orm.users.create( createParams );
    const count = data ? 1 : 0;

    // Повернення даних
    return {
        count,
        'data':
        {
            'id'   : data.id,
            'email': data.email
        }
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

users.getIdByTokenUpdateTTL = async function( token )
{
    // виконання дій у паралельному режимі
    const [ userId, isUpdated ] = await Promise.all(
        [
            // отримання ID користувача за токеном
            users._getIdByToken( token ),

            // оновлення часу життя токена
            users._updateTokenTTL( token ),
        ]
    );

    if( userId.length <= 0 )
    {
        throw new ErrorsException( consts.GENERAL_CODE_INVALID_OR_EXPIRED_TOKEN_ERROR );
    }

    return userId;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

users._generateToken = async function()
{
    return new Promise(
        ( resolve, reject ) =>
        {
            crypto.randomBytes(
                1024,
                ( err, bytes ) =>
                {
                    if( err )
                    {
                        return reject(err);
                    }

                    return resolve( crypto.createHash('sha512').update( bytes ).digest('hex') );
                });
        }
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

users._getIdByToken = async function( token )
{
    try
    {
        const userId = await redis[ config.redis.instances.user.token ].get(
            config.redis.keys.user.token.replace( '%user_token%', token )
        );

        return ( userId ? userId : '' );
    }
    catch( err )
    {
        return '';
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

users._updateTokenTTL = async function( token )
{
    try
    {
        const isUpdated = await redis[ config.redis.instances.user.token ].expire(
            config.redis.keys.user.token.replace( '%user_token%', token ),
            config.redis.expires.user.token
        );

        return ( isUpdated ? 1 : 0 );
    }
    catch( err )
    {
        return 0;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = users;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
