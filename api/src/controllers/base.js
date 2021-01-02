////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const controller   = {};

controller.beforeExecuteRoute       = ( req, res, next ) =>
{
    return next();  // ALL OK, Next
};

controller.index                   = (req, res) =>
{
    return res.json(
        {
            message     : 'Мяу ;-)'
        }
    );
};

controller.notFound                = (req, res) =>
{
    e( '] error 404: ' + req.url );

    return res.json(
        {
            errors      : [ consts.APPLICATION_CODE_NOT_FOUND ],
            message     : 'Не знайдено'
        }
    );
};

controller.internalServerError     = ( err, req, res, next ) =>
{
    console.error( '] error 500: ', err );

    return res.json(
        {
            errors      : utils.getErrorCodes( err )
        }
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = controller;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
