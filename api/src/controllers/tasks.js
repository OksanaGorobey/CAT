////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const customValidator           = require( __base + 'src/lib/customValidator' );
const config                    = require( __base + 'src/config' );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const validateSchemas =
{
    'getList': require( __base + 'src/validate/schemas/tasks.getList.js' ),
    'getOne' : require( __base + 'src/validate/schemas/tasks.getOne.js' ),
    'create' : require( __base + 'src/validate/schemas/tasks.create.js' ),
    'update' : require( __base + 'src/validate/schemas/tasks.update.js' ),
    'delete' : require( __base + 'src/validate/schemas/tasks.delete.js' ),
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const controller   = {};

controller.beforeExecuteRoute       = ( req, res, next ) =>
{
    res.apiResponse = function() { return utils.makeApiResponse.apply( this, arguments ) };

    req.token = ( req.headers['x-token'] || '' ).toString();

    if( req.token.length <= 0 )
    {
        throw new ErrorsException( consts.GENERAL_CODE_EMPTY_TOKEN_ERROR );
    }

    return next();  // ALL OK, Next
};

controller.getTasksList                   = async ( req, res, next ) =>
{
    try
    {
        const params =
        {
            'limit'     : parseInt( ( req.query || {} ).limit || config.defaults.limit ),
            'offset'    : parseInt( ( req.query || {} ).offset || config.defaults.offset ),
            '_token'    : req.token
        };

        customValidator.validateRequestParams( params, validateSchemas['getList']);

        const taskResponse = await models.lib.tasks.getList( params );

        return res.apiResponse( taskResponse );
    }
    catch ( err )
    {
        return next( err );
    }
};

controller.getTask                   = async ( req, res, next ) =>
{
    try
    {
        const params = { "_token": req.token };

        // Фільтрація (тільки якщо поле існує)
        if( ( req.params || {} ).hasOwnProperty( 'id' ) )
        {
            params[ '_id' ]     = utils.removeEmptyChars( ( req.params || {} ).id || '' );
        }

        customValidator.validateRequestParams( params, validateSchemas['getOne']);

        const taskResponse = await models.lib.tasks.getOne( params );

        return res.apiResponse( taskResponse );
    }
    catch ( err )
    {
        return next( err );
    }
};

controller.createTask                   = async ( req, res, next ) =>
{
    try
    {
        const params = Object.assign( {}, ( req.body || {} ), { "_token": req.token } );

        // Фільтрація (тільки якщо поле існує)
        if( params.hasOwnProperty('title') )
        {
            params[ 'title' ]   = utils.removeEmptyChars( params[ 'title' ] || '' );
        }

        customValidator.validateRequestParams( params, validateSchemas['create']);

        const taskResponse = await models.lib.tasks.create( params );

        return res.apiResponse( taskResponse );
    }
    catch ( err )
    {
        return next( err );
    }
};

controller.updateTask                   = async ( req, res, next ) =>
{
    try
    {
        const params = Object.assign( {}, ( req.body || {} ), { "_token": req.token } );

        // Фільтрація (тільки якщо поле існує)
        if( ( req.params || {} ).hasOwnProperty( 'id' ) )
        {
            params[ '_id' ]     = utils.removeEmptyChars( ( req.params || {} ).id || '' );
        }
        if( params.hasOwnProperty('title') )
        {
            params[ 'title' ]   = utils.removeEmptyChars( params[ 'title' ] || '' );
        }
        if( params.hasOwnProperty('status') )
        {
            params[ 'status' ]   = parseInt( utils.removeEmptyChars( params[ 'status' ] || consts.GENERAL_STATUS_ACTIVE ) );
        }

        customValidator.validateRequestParams( params, validateSchemas['update']);

        const taskResponse = await models.lib.tasks.update( params );

        return res.apiResponse( taskResponse );
    }
    catch ( err )
    {
        return next( err );
    }
};

controller.deleteTask                   = async ( req, res, next ) =>
{
    try
    {
        const params = { "_token": req.token };

        // Фільтрація (тільки якщо поле існує)
        if( ( req.params || {} ).hasOwnProperty( 'id' ) )
        {
            params[ '_id' ]     = utils.removeEmptyChars( ( req.params || {} ).id || '' );
        }

        customValidator.validateRequestParams( params, validateSchemas['delete']);

        const taskResponse = await models.lib.tasks.delete( params );

        return res.apiResponse( taskResponse );
    }
    catch ( err )
    {
        return next( err );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = controller;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
