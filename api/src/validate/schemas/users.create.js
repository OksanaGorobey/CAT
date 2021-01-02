module.exports =
{
    "$schema"   : "http://json-schema.org/schema#",
    "$id"       : "users.create.js",
    "title"     : "users.create.js",
    "type"      : "object",
    "properties":
    {
        "name":
        {
            "type"          : "string",
            "minLength"     : 2,
            "maxLength"     : 64,
            "errorMessage"  : consts.USERS_CREATE_VALIDATE_ERROR_NAME.toString()
        },
        "email":
        {
            "type"          : "string",
            "minLength"     : 5,
            "maxLength"     : 64,
            "format"       : "email",
            "errorMessage"  : consts.USERS_CREATE_VALIDATE_ERROR_EMAIL.toString()
        },
        "passwd":
        {
            "type"          : "string",
            "minLength"     : 8,
            "maxLength"     : consts.GENERAL_MAXLENGTH_HALFINPUT,
            "errorMessage"  : consts.USERS_CREATE_VALIDATE_ERROR_PASSWD.toString()
        }
    },
    "additionalProperties": false,
    "required":
    [
        "name",
        "email",
        "passwd",
    ],
    "errorMessage":
    {
        "required":
        {
            "name"                : consts.USERS_CREATE_REQUIRED_ERROR_NAME.toString(),
            "email"               : consts.USERS_CREATE_REQUIRED_ERROR_EMAIL.toString(),
            "passwd"              : consts.USERS_CREATE_REQUIRED_ERROR_PASSWD.toString()
        },
        "additionalProperties": consts.USERS_CREATE_VALIDATE_ERROR_ADDITIONALFIELDS.toString()
    }
};