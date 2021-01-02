////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const
    env         = process.env.ENVIRONMENT || '',
    db_host     = process.env.DB_HOST || '127.0.0.1',
    db_port     = parseInt( process.env.DB_PORT || 5432 ),
    db_user     = process.env.DB_USER || '',
    db_password = process.env.DB_PASSWORD || '',
    db_name     = process.env.DB_NAME || '',
    timezone    = process.env.TZ || '+00:00';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports =
{
    'env'           : env,
    'defaults'      :
    {
        'limit'     : 50,
        'offset'    : 0,
    },
    'db'            :
    {
        'dsn'       : `postgres://${db_user}:${db_password}@${db_host}:${db_port}/${db_name}`,
        'options'   :
        {
            'timezone'  : timezone
        },
    },
    'redis'         :
    {
        'keys'      :
        {
            'user'  :
            {
                'token'                 : 'user#token:%user_token%',
                'tokens'                : 'user#user:%user_id%:tokens',
                // 'invalid_logins_counter': 'user#user_ip:%user_ip%:invalid_logins_counter',
            },
        },
        'instances' :
        {
            'user'  :
            {
                'token'                 : 's1/db10',
                'tokens'                : 's1/db11',
                // 'invalid_logins_counter': 's1/db12',
            },
        },
        'expires'   :
        {
            'user'  :
            {
                'token'                     : 86400,
                // 'invalid_logins_counter'    : 900,
            },
        },
        'hosts'     :
        {
            's1/db10' :
            {
                'port'          : 6432,
                'host'          : '127.0.0.1',
                'family'        : 4,
                'password'      : 'JxoGOOHu2gi5Ne5AVV1l0TZ6Ga9rhOjWY17e2M2fNsnFcvBxeyO7FTIyHARbI1d0',
                'db'            : 10,
                'retryStrategy' : () => 2000,
            },
            's1/db11' :
            {
                'port'          : 6432,
                'host'          : '127.0.0.1',
                'family'        : 4,
                'password'      : 'JxoGOOHu2gi5Ne5AVV1l0TZ6Ga9rhOjWY17e2M2fNsnFcvBxeyO7FTIyHARbI1d0',
                'db'            : 11,
                'retryStrategy' : () => 2000,
            },
            's1/db12' :
            {
                'port'          : 6432,
                'host'          : '127.0.0.1',
                'family'        : 4,
                'password'      : 'JxoGOOHu2gi5Ne5AVV1l0TZ6Ga9rhOjWY17e2M2fNsnFcvBxeyO7FTIyHARbI1d0',
                'db'            : 12,
                'retryStrategy' : () => 2000,
            },
        }
    },
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////