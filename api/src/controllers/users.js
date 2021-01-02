////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const customValidator     = require( __base + 'src/lib/customValidator' );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const validateSchemas =
{
    'create'    : require( __base + 'src/validate/schemas/users.create.js' ),
    'authorize' : require( __base + 'src/validate/schemas/users.authorize.js' )
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const controller   = {};

controller.beforeExecuteRoute       = ( req, res, next ) =>
{
    res.apiResponse = function() { return utils.makeApiResponse.apply( this, arguments ) };

    return next();  // ALL OK, Next
};

controller.create                   = async ( req, res, next ) =>
{
    try
    {
        const params = req.body || {};

        // Фільтрація (тільки якщо поле існує)
        if( params.hasOwnProperty('name') )
        {
            params[ 'name' ]    = utils.removeEmptyChars( params[ 'name' ] || '' );
        }
        if( params.hasOwnProperty('email') )
        {
            params[ 'email' ]    = utils.removeEmptyChars( params[ 'email' ] || '' ).toLowerCase();
        }
        if( params.hasOwnProperty('passwd') )
        {
            params[ 'passwd' ]   = utils.removeEmptyChars( params[ 'passwd' ] || '' );
        }

        customValidator.validateRequestParams( params, validateSchemas['create']);

        const userCreate = await models.lib.users.create( params );

        return res.apiResponse( userCreate );
    }
    catch ( err )
    {
        return next( err );
    }
};

controller.authorize                = async ( req, res, next ) =>
{
    try
    {
        const params = req.body || {};

        // Фільтрація (тільки якщо поле існує)
        if( params.hasOwnProperty('email') )
        {
            params[ 'email' ]    = utils.removeEmptyChars( params[ 'email' ] || '' ).toLowerCase();
        }
        if( params.hasOwnProperty('passwd') )
        {
            params[ 'passwd' ]   = utils.removeEmptyChars( params[ 'passwd' ] || '' );
        }

        customValidator.validateRequestParams( params, validateSchemas['authorize']);

        const userData = await models.lib.users.authorize( params );
        return res.apiResponse( userData );
    }
    catch ( err )
    {
        return next( err );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = controller;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
