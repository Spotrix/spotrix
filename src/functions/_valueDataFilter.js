import _ from "lodash";

/**
 * https://www.lodashjs.com/docs/lodash.filter
 *
 * @param data collection(Array|Object)
 * @param predicateMap predicate
 * @returns {Array|*}
 * @private true
 */
function _filter(data, predicateMap) {
  if (_.keys(predicateMap).length > 0) {
    return _.filter(data, predicateMap);
  } else {
    return data;
  }
}

export { _filter };