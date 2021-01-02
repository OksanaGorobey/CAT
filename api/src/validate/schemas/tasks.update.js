module.exports =
{
    "$schema"   : "http://json-schema.org/schema#",
    "$id"       : "tasks.update.js",
    "title"     : "tasks.update.js",
    "type"      : "object",
    "properties":
    {
        "_token":
        {
            "type"          : "string",
            "minLength"     : 128,
            "maxLength"     : 128,
            "pattern"       : "^[abcdef0-9]{128}$",
            "errorMessage"  : consts.TASKS_UPDATE_VALIDATE_ERROR_TOKEN.toString()
        },
        "_id":
        {
            "type"          : "string",
            "format"        : "uuid",
            "errorMessage"  : consts.TASKS_UPDATE_VALIDATE_ERROR_ID.toString()
        },
        "title":
        {
            "type"          : "string",
            "minLength"     : 1,
            "maxLength"     : consts.GENERAL_MAXLENGTH_INPUT,
            "errorMessage"  : consts.TASKS_UPDATE_VALIDATE_ERROR_TITLE.toString()
        },
        "status":
        {
            "type"          : "integer",
            "minimum"       : 1,
            "maximum"       : 2,
            "errorMessage"  : consts.TASKS_UPDATE_VALIDATE_ERROR_STATUS.toString()
        },
    },
    "additionalProperties": false,
    "required":
    [
        "_token",
        "_id",
    ],
    "errorMessage":
    {
        "required":
        {
            "_token"            : consts.TASKS_UPDATE_REQUIRED_ERROR_TOKEN.toString(),
            "_id"               : consts.TASKS_UPDATE_REQUIRED_ERROR_ID.toString(),
        },
        "additionalProperties"  : consts.TASKS_UPDATE_VALIDATE_ERROR_ADDITIONALFIELDS.toString()
    }
};