import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    //items is converted to a lodash wrapper(obj)
    //slice: creates a new array from the supplied index
    //take: to pagesize 
    //value: convert the obj back to an array
    return _(items).slice(startIndex).take(pageSize).value();
}