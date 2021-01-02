module.exports =
{
    "$schema"   : "http://json-schema.org/schema#",
    "$id"       : "tasks.getList.js",
    "title"     : "tasks.getList.js",
    "type"      : "object",
    "properties":
    {
        "_token":
        {
            "type"          : "string",
            "minLength"     : 128,
            "maxLength"     : 128,
            "pattern"       : "^[abcdef0-9]{128}$",
            "errorMessage"  : consts.TASKS_GETLIST_VALIDATE_ERROR_TOKEN.toString()
        },
        'limit':
        {
            'type'          : 'integer',
            'minimum'       : 0,
            'maximum'       : 1000,
            'errorMessage'  : consts.TASKS_GETLIST_VALIDATE_ERROR_LIMIT.toString()
        },
        'offset':
        {
            'type'          : 'integer',
            'minimum'       : 0,
            'maximum'       : 999999,
            'errorMessage'  : consts.TASKS_GETLIST_VALIDATE_ERROR_OFFSET.toString()
        },
    },
    "additionalProperties": false,
    "required":
    [
        "_token",
        "limit",
        "offset",
    ],
    "errorMessage":
    {
        "required":
        {
            "_token"            : consts.TASKS_GETLIST_REQUIRED_ERROR_TOKEN.toString(),
            "limit"             : consts.TASKS_GETLIST_REQUIRED_ERROR_LIMIT.toString(),
            "offset"            : consts.TASKS_GETLIST_REQUIRED_ERROR_OFFSET.toString(),
        },
        "additionalProperties"  : consts.TASKS_GETLIST_VALIDATE_ERROR_ADDITIONALFIELDS.toString()
    }
};