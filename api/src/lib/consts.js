////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports =
{
    // APPLICATION CODES //////////////////////////////////////////////////////
    'APPLICATION_CODE_OK'                               : 200,
    'APPLICATION_CODE_NO_CONTENT'                       : 204,
    'APPLICATION_CODE_FORBIDDEN'                        : 403,
    'APPLICATION_CODE_NOT_FOUND'                        : 404,
    'APPLICATION_CODE_INTERNAL_SERVER_ERROR'            : 500,
    // GENERAL ////////////////////////////////////////////////////////////////
    'GENERAL_LIMIT'                                     : 50,
    'GENERAL_SIZE'                                      : 10000,
    'GENERAL_OFFSET'                                    : 0,
    'GENERAL_STATUS_ACTIVE'                             : 1,
    'GENERAL_MAXLENGTH_HALFINPUT'                       : 128,
    'GENERAL_MAXLENGTH_INPUT'                           : 256,
    'GENERAL_MAXLENGTH_TEXT'                            : 65536,        // 64 KB
    'GENERAL_MAXLENGTH_CONTENT'                         : 1073741824,   // 1 GB
    // GENERAL CODES //////////////////////////////////////////////////////////
    'GENERAL_CODE_VALIDATE_PARAMS_ERROR'                : 1000001,
    'GENERAL_CODE_DATABASE_ERROR'                       : 1000002,
    'GENERAL_CODE_REQUEST_ERROR'                        : 1000003,
    'GENERAL_CODE_EMPTY_TOKEN_ERROR'                    : 1000004,
    'GENERAL_CODE_INVALID_OR_EXPIRED_TOKEN_ERROR'       : 1000005,
    // controllers.users.create ///////////////////////////////////////////////
    'USERS_CREATE_VALIDATE_ERROR_NAME'                  : 1001101,
    'USERS_CREATE_VALIDATE_ERROR_EMAIL'                 : 1001102,
    'USERS_CREATE_VALIDATE_ERROR_PASSWD'                : 1001103,
    'USERS_CREATE_VALIDATE_ERROR_ADDITIONALFIELDS'      : 1001100,
    'USERS_CREATE_REQUIRED_ERROR_NAME'                  : 1001201,
    'USERS_CREATE_REQUIRED_ERROR_EMAIL'                 : 1001202,
    'USERS_CREATE_REQUIRED_ERROR_PASSWD'                : 1001203,
    'USERS_CREATE_UNIQUE_ERROR_EMAIL'                   : 1001301,
    // controllers.users.authorize ////////////////////////////////////////////
    'USERS_AUTHORIZE_VALIDATE_ERROR_EMAIL'              : 1002101,
    'USERS_AUTHORIZE_VALIDATE_ERROR_PASSWD'             : 1002102,
    'USERS_AUTHORIZE_VALIDATE_ERROR_ADDITIONALFIELDS'   : 1002100,
    'USERS_AUTHORIZE_REQUIRED_ERROR_EMAIL'              : 1002201,
    'USERS_AUTHORIZE_REQUIRED_ERROR_PASSWD'             : 1002202,
    // controllers.tasks.createTask ///////////////////////////////////////////
    'TASKS_CREATE_VALIDATE_ERROR_TOKEN'                 : 1003101,
    'TASKS_CREATE_VALIDATE_ERROR_TITLE'                 : 1003102,
    'TASKS_CREATE_VALIDATE_ERROR_ADDITIONALFIELDS'      : 1003100,
    'TASKS_CREATE_REQUIRED_ERROR_TOKEN'                 : 1003201,
    'TASKS_CREATE_REQUIRED_ERROR_TITLE'                 : 1003202,
    // controllers.tasks.updateTask ///////////////////////////////////////////
    'TASKS_UPDATE_VALIDATE_ERROR_TOKEN'                 : 1004101,
    'TASKS_UPDATE_VALIDATE_ERROR_ID'                    : 1004102,
    'TASKS_UPDATE_VALIDATE_ERROR_TITLE'                 : 1004103,
    'TASKS_UPDATE_VALIDATE_ERROR_STATUS'                : 1004104,
    'TASKS_UPDATE_VALIDATE_ERROR_ADDITIONALFIELDS'      : 1004100,
    'TASKS_UPDATE_REQUIRED_ERROR_TOKEN'                 : 1004201,
    'TASKS_UPDATE_REQUIRED_ERROR_ID'                    : 1004202,
    // controllers.tasks.deleteTask ///////////////////////////////////////////
    'TASKS_DELETE_VALIDATE_ERROR_TOKEN'                 : 1005101,
    'TASKS_DELETE_VALIDATE_ERROR_ID'                    : 1005102,
    'TASKS_DELETE_VALIDATE_ERROR_ADDITIONALFIELDS'      : 1005100,
    'TASKS_DELETE_REQUIRED_ERROR_TOKEN'                 : 1005201,
    'TASKS_DELETE_REQUIRED_ERROR_ID'                    : 1005202,
    // controllers.tasks.getTask //////////////////////////////////////////////
    'TASKS_GETONE_VALIDATE_ERROR_TOKEN'                 : 1006101,
    'TASKS_GETONE_VALIDATE_ERROR_ID'                    : 1006102,
    'TASKS_GETONE_VALIDATE_ERROR_ADDITIONALFIELDS'      : 1006100,
    'TASKS_GETONE_REQUIRED_ERROR_TOKEN'                 : 1006201,
    'TASKS_GETONE_REQUIRED_ERROR_ID'                    : 1006202,
    // controllers.tasks.getTasksList /////////////////////////////////////////
    'TASKS_GETLIST_VALIDATE_ERROR_TOKEN'                : 1007101,
    'TASKS_GETLIST_VALIDATE_ERROR_LIMIT'                : 1007102,
    'TASKS_GETLIST_VALIDATE_ERROR_OFFSET'               : 1007103,
    'TASKS_GETLIST_VALIDATE_ERROR_ADDITIONALFIELDS'     : 1007100,
    'TASKS_GETLIST_REQUIRED_ERROR_TOKEN'                : 1007201,
    'TASKS_GETLIST_REQUIRED_ERROR_LIMIT'                : 1007202,
    'TASKS_GETLIST_REQUIRED_ERROR_OFFSET'               : 1007203,
    // models/lib /////////////////////////////////////////////////////////////
    'USERS_AUTHORIZE_USER_NOT_FOUND'                    : 1901001,
    'USERS_AUTHORIZE_USER_NOT_ACTIVE'                   : 1901002,
    'USERS_AUTHORIZE_USER_NOT_VALID_PASSWD'             : 1901003,
    'TASKS_UPDATE_TASK_NOT_FOUND'                       : 1902001,
    'TASKS_DELETE_TASK_NOT_FOUND'                       : 1902002,
    'TASKS_GETONE_TASK_NOT_FOUND'                       : 1902003,
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////