import _ from "lodash";

function _sort(data, field, click) {
  console.log(field, click);
  switch (click % 3) {
    case 0:
      return data;
    case 1:
      return _.sortBy(data, [field], ["asc"]);
    case 2:
      // `desc` does not work
      return _.reverse(_.sortBy(data, [field], ["asc"]));
    default:
      return data;
  }
}

export { _sort };