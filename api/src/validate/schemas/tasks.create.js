module.exports =
{
    "$schema"   : "http://json-schema.org/schema#",
    "$id"       : "tasks.create.js",
    "title"     : "tasks.create.js",
    "type"      : "object",
    "properties":
    {
        "_token":
        {
            "type"          : "string",
            "minLength"     : 128,
            "maxLength"     : 128,
            "pattern"       : "^[abcdef0-9]{128}$",
            "errorMessage"  : consts.TASKS_CREATE_VALIDATE_ERROR_TOKEN.toString()
        },
        "title":
        {
            "type"          : "string",
            "minLength"     : 1,
            "maxLength"     : consts.GENERAL_MAXLENGTH_INPUT,
            "errorMessage"  : consts.TASKS_CREATE_VALIDATE_ERROR_TITLE.toString()
        }
    },
    "additionalProperties": false,
    "required":
    [
        "_token",
        "title",
    ],
    "errorMessage":
    {
        "required":
        {
            "_token"            : consts.TASKS_CREATE_REQUIRED_ERROR_TOKEN.toString(),
            "title"             : consts.TASKS_CREATE_REQUIRED_ERROR_TITLE.toString()
        },
        "additionalProperties"  : consts.TASKS_CREATE_VALIDATE_ERROR_ADDITIONALFIELDS.toString()
    }
};