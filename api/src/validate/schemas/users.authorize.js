module.exports =
{
    "$schema"   : "http://json-schema.org/schema#",
    "$id"       : "users.authorize.js",
    "title"     : "users.authorize.js",
    "type"      : "object",
    "properties":
    {
        "email":
        {
            "type"          : "string",
            "minLength"     : 5,
            "maxLength"     : 64,
            "format"       : "email",
            "errorMessage"  : consts.USERS_AUTHORIZE_VALIDATE_ERROR_EMAIL.toString()
        },
        "passwd":
        {
            "type"          : "string",
            "minLength"     : 8,
            "maxLength"     : consts.GENERAL_MAXLENGTH_HALFINPUT,
            "errorMessage"  : consts.USERS_AUTHORIZE_VALIDATE_ERROR_PASSWD.toString()
        }
    },
    "additionalProperties": false,
    "required":
    [
        "email",
        "passwd"
    ],
    "errorMessage":
    {
        "required":
        {
            "email"      : consts.USERS_AUTHORIZE_REQUIRED_ERROR_EMAIL.toString(),
            "passwd"   : consts.USERS_AUTHORIZE_REQUIRED_ERROR_PASSWD.toString()
        },
        "additionalProperties": consts.USERS_AUTHORIZE_VALIDATE_ERROR_ADDITIONALFIELDS.toString()
    }
};