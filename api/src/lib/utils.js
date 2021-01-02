////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const utils                         = {};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

utils.getErrorCodes                 = ( err ) =>
{
    switch( true )
    {
        // просто число
        case ( typeof err === 'number' ):
            return [ err ];

        // масив чисел (строго)
        case ( Array.isArray( err ) && err.length > 0 && err.every( i => typeof i === 'number' ) ):
            return err;

        // обʼєкт RequestError
        case ( typeof RequestError !== 'undefined' && err instanceof RequestError ) :
        case ( err.hasOwnProperty( 'name' ) && err.name === 'RequestError' ) :
            return [ consts.GENERAL_CODE_REQUEST_ERROR ];

        // обʼєкт ErrorsException
        case ( typeof ErrorsException !== 'undefined' && err instanceof ErrorsException ) :
            return err.getErrors();

        // помилка валідації Sequelize
        case ( err.hasOwnProperty( 'errors' ) && Array.isArray( err.errors ) && err.errors.length > 0 ) :
            return err.errors
                .map(
                    ( i ) => parseInt(                              // приводимо до цілого числа текст в ключі "message"
                        ( i.hasOwnProperty('message') ? i.message : consts.GENERAL_CODE_DATABASE_ERROR )
                            .toString()
                            .replace( /[^0-9]/g, '' )
                    )
                )
                .filter( x => x )                                   // видаляємо пусті значення
                .filter( ( v, i, a ) => a.indexOf( v ) === i );     // видаляємо неунікальні елементи

        // помилка бази даних Sequelize
        case ( typeof SequelizeDatabaseError !== 'undefined' && err instanceof SequelizeDatabaseError ) :
        case ( err.hasOwnProperty( 'name' ) && err.name === 'SequelizeDatabaseError' ) :
            return [ consts.GENERAL_CODE_DATABASE_ERROR ];

        // загальна (невизначена помилка, 500)
        default:
            return [ consts.APPLICATION_CODE_INTERNAL_SERVER_ERROR ];
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

utils.makeApiResponse               = function ( data )
{
    return this.json(
        {
            'content' :
            {
                'count' : ( data ? data['count'] || 0 : 0 ),
                'data'  : ( data ? data['data'] || {} : {} )
            }
        }
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

utils.removeEmptyChars                  = ( str ) =>
{
    const emptyChars =
    [
        "\u0000",    // null-byte
        "\u0009",    // character tabulation
        "\u000A",    // line feed
        "\u000B",    // line tabulation
        "\u000C",    // form feed
        "\u000D",    // carriage return
        "\u0020",    // space
        "\u0085",    // next line
        "\u00A0",    // no-break space
        "\u1680",    // ogham space marka
        "\u2000",    // en quad
        "\u2001",    // em quad
        "\u2002",    // en space
        "\u2003",    // em space
        "\u2004",    // three-per-em space
        "\u2005",    // four-per-em space
        "\u2006",    // six-per-em space
        "\u2007",    // figure space
        "\u2008",    // punctuation space
        "\u2009",    // thin space
        "\u200A",    // hair space
        "\u2028",    // line separator
        "\u2029",    // paragraph separator
        "\u202F",    // narrow no-break space
        "\u205F",    // medium mathematical space
        "\u3000",    // ideographic space
        "\u180E",    // mongolian vowel separator
        "\u200B",    // zero width space
        "\u200C",    // zero width non-joiner
        "\u200D",    // zero width joiner
        "\u2060",    // word joiner
        "\uFEFF",    // zero width non-breaking space
    ];

    return ( str || '' ).toString().replace( new RegExp( emptyChars.join( '|' ), 'gi' ), ' ' ).replace( /\s{1,}/g, ' ' ).trim();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// utils.ip                            =
// {
//     'getIP'                         : ( req ) =>
//     {
//         let ip = utils.ip._getIP( req );
//
//         if( ip.substr(0, 7) === "::ffff:" )
//         {
//             return ip.substr(7);
//         }
//
//         return ip;
//     },
//
//     '_getIP'                         : ( req ) =>
//     {
//         // custom body "source_ip" (set by Mapping Template in AWS API Gateway)
//         if( req.hasOwnProperty('body') && !utils.empty(req.body) )
//         {
//             if( req.body.hasOwnProperty('source_ip') )
//             {
//                 if( utils.ip.is.ip(req.body['source_ip']) )
//                 {
//                     return req.body['source_ip'];
//                 }
//             }
//         }
//
//         // Server is probably behind a proxy.
//         if( req.hasOwnProperty('headers') && !utils.empty(req.headers) )
//         {
//             // Standard headers used by Amazon EC2, Heroku, and others.
//             if( req.headers.hasOwnProperty('x-client-ip') && utils.ip.is.ip(req.headers['x-client-ip']) )
//             {
//                 return req.headers['x-client-ip'];
//             }
//
//             // Load-balancers (AWS ELB) or proxies.
//             if( req.headers.hasOwnProperty('x-forwarded-for') && !utils.empty(req.headers['x-forwarded-for']) )
//             {
//                 const x_forwarded_for_ip =
//                 (
//                     function( value )
//                     {
//                         if( !utils.ip.is.existy(value) )
//                         {
//                             return null;
//                         }
//
//                         // x-forwarded-for may return multiple IP addresses in the format:
//                         // "client IP, proxy 1 IP, proxy 2 IP"
//                         // Therefore, the right-most IP address is the IP address of the most recent proxy
//                         // and the left-most IP address is the IP address of the originating client.
//                         // source: http://docs.aws.amazon.com/elasticloadbalancing/latest/classic/x-forwarded-headers.html
//                         // Azure Web App's also adds a port for some reason, so we'll only use the first part (the IP)
//                         const forwarded_ips = value.split(',').map(
//                             (e) =>
//                             {
//                                 const ip = e.trim();
//
//                                 if( ip.includes(':'))
//                                 {
//                                     const splitted = ip.split(':');
//
//                                     // make sure we only use this if it's ipv4 (ip:port)
//                                     if( splitted.length === 2)
//                                     {
//                                         return splitted[0];
//                                     }
//                                 }
//
//                                 return ip;
//                             });
//
//                         // Sometimes IP addresses in this header can be 'unknown' (http://stackoverflow.com/a/11285650).
//                         // Therefore taking the left-most IP address that is not unknown
//                         // A Squid configuration directive can also set the value to "unknown" (http://www.squid-cache.org/Doc/config/forwarded_for/)
//                         return forwarded_ips.find( utils.ip.is.ip );
//                     }
//                 )( req.headers['x-forwarded-for'] );
//
//                 if( utils.ip.is.ip(x_forwarded_for_ip))
//                 {
//                     return x_forwarded_for_ip;
//                 }
//             }
//
//             // Cloudflare.
//             // @see https://support.cloudflare.com/hc/en-us/articles/200170986-How-does-Cloudflare-handle-HTTP-Request-headers-
//             // CF-Connecting-IP - applied to every request to the origin.
//             if( req.headers.hasOwnProperty('cf-connecting-ip') && utils.ip.is.ip(req.headers['cf-connecting-ip']) )
//             {
//                 return req.headers['cf-connecting-ip'];
//             }
//
//             // Akamai and Cloudflare: True-Client-IP.
//             if( req.headers.hasOwnProperty('true-client-ip') && utils.ip.is.ip(req.headers['true-client-ip']) )
//             {
//                 return req.headers['true-client-ip'];
//             }
//
//             // Default nginx proxy/fcgi; alternative to x-forwarded-for, used by some proxies.
//             if( req.headers.hasOwnProperty('x-real-ip') && utils.ip.is.ip(req.headers['x-real-ip']) )
//             {
//                 return req.headers['x-real-ip'];
//             }
//
//             // (Rackspace LB and Riverbed's Stingray)
//             // http://www.rackspace.com/knowledge_center/article/controlling-access-to-linux-cloud-sites-based-on-the-client-ip-address
//             // https://splash.riverbed.com/docs/DOC-1926
//             if( req.headers.hasOwnProperty('x-cluster-client-ip') && utils.ip.is.ip(req.headers['x-cluster-client-ip']) )
//             {
//                 return req.headers['x-cluster-client-ip'];
//             }
//
//             if( req.headers.hasOwnProperty('x-forwarded') && utils.ip.is.ip(req.headers['x-forwarded']) )
//             {
//                 return req.headers['x-forwarded'];
//             }
//
//             if( req.headers.hasOwnProperty('forwarded-for') && utils.ip.is.ip(req.headers['forwarded-for']) )
//             {
//                 return req.headers['forwarded-for'];
//             }
//
//             if( req.headers.hasOwnProperty('forwarded') && utils.ip.is.ip(req.headers['forwarded']) )
//             {
//                 return req.headers['forwarded'];
//             }
//         }
//
//         // Remote address checks.
//         if( req.hasOwnProperty('connection') && !utils.empty(req.connection) )
//         {
//             if( req.connection.hasOwnProperty('remoteAddress') && utils.ip.is.ip(req.connection.remoteAddress) )
//             {
//                 return req.connection.remoteAddress;
//             }
//             if( req.connection.hasOwnProperty('socket') &&
//                 !utils.empty(req.connection.socket) &&
//                 req.connection.socket.hasOwnProperty('remoteAddress') &&
//                 utils.ip.is.ip(req.connection.socket.remoteAddress) )
//             {
//                 return req.connection.socket.remoteAddress;
//             }
//         }
//
//         if( req.hasOwnProperty('socket') &&
//             !utils.empty(req.socket) &&
//             req.socket.hasOwnProperty('remoteAddress') &&
//             utils.ip.is.ip(req.socket.remoteAddress))
//         {
//             return req.socket.remoteAddress;
//         }
//
//         if( req.hasOwnProperty('info') &&
//             !utils.empty(req.info) &&
//             req.info.hasOwnProperty('remoteAddress') &&
//             utils.ip.is.ip(req.info.remoteAddress))
//         {
//             return req.info.remoteAddress;
//         }
//
//         // AWS Api Gateway + Lambda
//         if(
//             req.hasOwnProperty('requestContext') &&
//             !utils.empty(req.requestContext) &&
//             req.requestContext.hasOwnProperty('identity') &&
//             !utils.empty(req.requestContext.identity) &&
//             req.requestContext.identity.hasOwnProperty('sourceIp') &&
//             utils.ip.is.ip(req.requestContext.identity.sourceIp))
//         {
//             return req.requestContext.identity.sourceIp;
//         }
//
//         return '127.0.0.1';
//     },
//
//     'is'            :               // tiny part of https://www.npmjs.com/package/is_js, https://github.com/arasatasaygin/is.js
//     {
//         '_regexes'                  :
//         {
//             ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
//             ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
//         },
//
//         'existy'                    : (value) =>
//         {
//             return value != null;
//         },
//
//         'ipv4'                      : (value) =>
//         {
//             return utils.ip.is.existy(value) && utils.ip.is._regexes['ipv4'].test(value);
//         },
//
//         'ipv6'                      : (value) =>
//         {
//             return utils.ip.is.existy(value) && utils.ip.is._regexes['ipv6'].test(value);
//         },
//
//         'ip'                        : (value) =>
//         {
//             return utils.ip.is.ipv4(value) || utils.ip.is.ipv6(value);
//         }
//     }
// };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = utils;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
