////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class ErrorsException extends Error
{
    constructor( errors )
    {
        super();
        Error.captureStackTrace( this, ErrorsException );

        // перетворюємо вхідний параметр на integer-масив помилок
        this.errors =
            ( Array.isArray(errors) ? errors : [ errors ] )
                .map( ( i ) => parseInt( i.toString().replace( /[^0-9]/g, '' ) ) )
                .filter( x => x )                                   // видаляємо пусті значення
                .filter( ( v, i, a ) => a.indexOf( v ) === i );     // видаляємо неунікальні елементи
    }

    getErrors()
    {
        return this.errors;
    }
}

module.exports = ErrorsException;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////