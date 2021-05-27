import _ from "lodash";

function _summary(props) {
  let result = [];
  let data = props.data;
  let header = _.keys(props.header);

  // let columnCount = props.columnCount;
  let rowCount = props.rowCount;
  for (let key of header) {
    let values = [];
    for (let item of data) {
      values.push(item[key]);
    }
    let name = key;
    let type = props.header[key];
    let sample = _.sampleSize(values,100);
    let nullCount = rowCount - _.uniqBy(values, _.isEmpty);
    let uniqCount = _.uniq(values).length;
    let item = {
      name: name,
      type: type,
      sample: sample,
      nullCount: nullCount,
      uniqCount: uniqCount,
    };
    result.push(item);
  }
  return result;
}

export { _summary };