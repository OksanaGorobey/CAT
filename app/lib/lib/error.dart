
import 'package:app_cat_7/lib/consts.dart';
import 'package:app_cat_7/messages/translateUk.dart';

abstract class CustomException {
    factory CustomException([var message]) => _CustomException(message);
}

class _CustomException implements CustomException {
    final message;

    final tokenError =
    [
        GENERAL_CODE_EMPTY_TOKEN_ERROR,
        TASKS_CREATE_VALIDATE_ERROR_TOKEN,
        TASKS_CREATE_REQUIRED_ERROR_TOKEN,
        TASKS_GETLIST_REQUIRED_ERROR_TOKEN,
        TASKS_GETLIST_VALIDATE_ERROR_TOKEN,
        TASKS_DELETE_VALIDATE_ERROR_TOKEN,
        TASKS_DELETE_REQUIRED_ERROR_TOKEN,
        TASKS_GETONE_VALIDATE_ERROR_TOKEN,
        TASKS_GETONE_REQUIRED_ERROR_TOKEN,
        TASKS_UPDATE_VALIDATE_ERROR_TOKEN,
        TASKS_UPDATE_REQUIRED_ERROR_TOKEN
    ];

    _CustomException( [this.message] );

    String toString() {
        if ( message == null )
            return "Exception";
        else if
            (tokenError.contains( message ) ) return message.toString();
        else
            return i18n['errors_' + message.toString() ];
    }
}