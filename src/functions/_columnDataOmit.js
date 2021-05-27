import _ from "lodash";

function _omit(data, fields) {
  let result = [];

  if (fields.length === 0) {
    return data;
  } else {
    for (let item of data) {
      let newItem = _.omit(item, fields);
      result.push(newItem);
    }
    return result;
  }
}

export { _omit };