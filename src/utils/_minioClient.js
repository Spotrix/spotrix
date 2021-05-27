const MinIo = require('minio');

const MinIoClient = new MinIo.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'minioadmin',
  secretKey: 'minioadmin'
});

export { MinIoClient };