module.exports =
{
    "$schema"   : "http://json-schema.org/schema#",
    "$id"       : "tasks.getOne.js",
    "title"     : "tasks.getOne.js",
    "type"      : "object",
    "properties":
    {
        "_token":
        {
            "type"          : "string",
            "minLength"     : 128,
            "maxLength"     : 128,
            "pattern"       : "^[abcdef0-9]{128}$",
            "errorMessage"  : consts.TASKS_GETONE_VALIDATE_ERROR_TOKEN.toString()
        },
        "_id":
        {
            "type"          : "string",
            "format"        : "uuid",
            "errorMessage"  : consts.TASKS_GETONE_VALIDATE_ERROR_ID.toString()
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
            "_token"            : consts.TASKS_GETONE_REQUIRED_ERROR_TOKEN.toString(),
            "_id"               : consts.TASKS_GETONE_REQUIRED_ERROR_ID.toString(),
        },
        "additionalProperties"  : consts.TASKS_GETONE_VALIDATE_ERROR_ADDITIONALFIELDS.toString()
    }
};