let lastId: number = 0;
/**
 * Super short/simple mechanism for generating unique ids for HTMLElements
 * @param prefix
 */
export default function(prefix = "id") {
    lastId++;
    return `${prefix}${lastId}`;
}
