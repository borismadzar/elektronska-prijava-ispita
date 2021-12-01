exports.express = {
  port: process.env.EXPRESS_PORT || 3000,
  ip: "0.0.0.0",
};

exports.mysql = {
  connectionParameters: {
    host: "my-mysql",
    user: "root",
    password: "root",
    database: "studentska-sluzba",
    connectionLimit: 10,
    supportBigNumbers: true,
  },
};
