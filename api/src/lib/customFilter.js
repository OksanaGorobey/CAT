////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const customFilter                                 = {};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Формує масив с умовами для запиту в БД
 *
 * @param params
 * @returns {{}}
 */
customFilter.parseRequestParamsForList         = ( params ) =>
{

    let request_params = {};
    let count_params = {};

    if( Array.isArray(params['attributes']) && !params['attributes'].includes('*') )
    {
        request_params['attributes'] = params['attributes'];
    }
    request_params['where'] = params['where'];
    request_params['limit']  = params['limit'];
    request_params['offset'] = params['offset'];

    request_params['order'] = [];
    for (let order_item in params['order'])
    {
        if (params['order'].hasOwnProperty(order_item))
        {
            request_params['order'].push( [ order_item, params['order'][order_item] ] );
        }
    }

    count_params['where']  = params['where'];

    return [
        count_params,
        request_params
    ];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = customFilter;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
