////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Redis                 = require('ioredis');
const config                = require( __base + 'src/config' );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const redis                 =
{
    '_instances_list' :
    [
        's1/db10',
        's1/db11',
        's1/db12',
    ],

    'init'          : function()
    {
        let _this = this;

        _this._instances_list.forEach(
            function( instance_key )
            {
                _this[ instance_key ] = new Redis( config.redis.hosts[ instance_key ] );

                _this[ instance_key ].on(
                    'ready',
                    () =>
                    {
                        console.info( 'Redis [' + instance_key + ']: Ready' );
                    }
                );

                _this[ instance_key ].on(
                    'error',
                    ( err ) =>
                    {
                        console.error( 'Redis Error [' + instance_key + ']: ' + err );
                    }
                );
            }
        );
    }
};

redis.init();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = redis;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////