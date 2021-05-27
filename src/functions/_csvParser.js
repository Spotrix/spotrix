import Papa from "papaparse";

// const config = {
//   delimiter: ",",	// auto-detect
//   newline: "",	// auto-detect
//   quoteChar: '"',
//   escapeChar: '"',
//   header: true,
//   transformHeader: undefined,
//   dynamicTyping: false,
//   preview: 0,
//   encoding: "",
//   worker: false,
//   comments: false,
//   step: undefined,
//   error: undefined,
//   download: false,
//   downloadRequestHeaders: undefined,
//   downloadRequestBody: undefined,
//   skipEmptyLines: false,
//   chunk: undefined,
//   chunkSize: undefined,
//   fastMode: undefined,
//   beforeFirstChunk: undefined,
//   withCredentials: undefined,
//   transform: undefined,
//   delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
// };

function _parse(path) {
  let data = null;
  Papa.parse(path, {
    worker: true,  // for big file
    delimiter: "auto",
    header: true,
    dynamicTyping: true,
    step: function(results) {
      console.log("Rows: ", results.data);
    },
    // complete: (results) => {
    //   data = results;
    // },
  });
  return data;
}

export { _parse };