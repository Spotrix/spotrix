import StringIcon from "../images/string.svg";
import NumberIcon from "../images/number.svg";
import BooleanIcon from "../images/boolean.svg";
import DateIcon from "../images/date.svg";
import DateTimeIcon from "../images/date-time.svg";
import TimeIcon from "../images/time.svg";
import LinkIcon from "../images/link.svg";
import AreaIcon from "../images/area.svg";
import JsonIcon from "../images/json.svg";
import FloatIcon from "../images/float.svg";

function getTypes() {
  return {
    string: {
      tip: "String",
      icon: StringIcon,
    },
    float: {
      tip: "Float",
      icon: FloatIcon,
    },
    number: {
      tip: "Number",
      icon: NumberIcon,
    },
    boolean: {
      tip: "Boolean",
      icon: BooleanIcon,
    },
    date: {
      tip: "Date",
      icon: DateIcon,
    },
    datetime: {
      tip: "Datetime",
      icon: DateTimeIcon,
    },
    time: {
      tip: "Time",
      icon: TimeIcon,
    },
    link: {
      tip: "Link",
      icon: LinkIcon,
    },
    area: {
      tip: "Area",
      icon: AreaIcon,
    },
    json: {
      tip: "Json",
      icon: JsonIcon,
    }
  };
}

function typeMapper(type) {
  let result;

  switch (type) {
    case(1):
    case(12):
    case(-1):
      result = "string";
      break;
    case(16):
      result = "boolean";
      break;
    case(2):
    case(3):
      result = "decimal";
      break;
    case(-7):
      result = "bit";
      break;
    case(4):
    case(5):
    case(-6):
    case(-5):
      result = "number";
      break;
    case(6):
    case(7):
    case(8):
      result = "float";
      break;
    case(-2):
    case(-3):
    case(-4):
      result = "binary";
      break;
    case(91):
      result = "date";
      break;
    case(92):
      result = "time";
      break;
    case(93):
      result = "timestamp";
      break;
    default:
      result = "string";
  }

  return result;
}

export { getTypes, typeMapper };