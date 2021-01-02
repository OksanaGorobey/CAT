///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

global.__base               = __dirname + '/';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// debug functions
global.p = function() { return console.info.apply( this, arguments ); };
global.e = function() { return console.error.apply( this, arguments ); };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// global._                    = require( 'lodash' );

global.ErrorsException      = require( __base + 'src/lib/ErrorsException' );
global.consts               = require( __base + 'src/lib/consts' );
global.utils                = require( __base + 'src/lib/utils' );
global.redis                = require( __base + 'src/lib/redis' );
global.models               = require( __base + 'src/models' );

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const express               = require( 'express' );
const controllers           = require( __base + 'src/controllers' );

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const app                   = express();
app.set( 'x-powered-by',     false);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use( ( require( 'compression' ) )() );
app.use( ( require( 'body-parser' ) ).json() );

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const router = express.Router();

router.get(     '/',                    controllers.base.index );

router.post(    '/user/register',       controllers.users.beforeExecuteRoute, controllers.users.create );
router.post(    '/user/authorize',      controllers.users.beforeExecuteRoute, controllers.users.authorize );

router.get(     '/tasks',               controllers.tasks.beforeExecuteRoute, controllers.tasks.getTasksList );
router.get(     '/task/:id',            controllers.tasks.beforeExecuteRoute, controllers.tasks.getTask );
router.post(    '/task',                controllers.tasks.beforeExecuteRoute, controllers.tasks.createTask );
router.put(     '/task/:id',            controllers.tasks.beforeExecuteRoute, controllers.tasks.updateTask );
router.delete(  '/task/:id',            controllers.tasks.beforeExecuteRoute, controllers.tasks.deleteTask );

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use('/', router );
app.use( controllers.base.notFound );
app.use( controllers.base.internalServerError );

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen( parseInt(process.env.NODE_ENV_PORT || 80) );

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////