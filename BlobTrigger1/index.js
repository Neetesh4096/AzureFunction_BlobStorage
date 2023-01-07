module.exports = async function (context, myBlob) {
  const CSV = require("csv-string");
  const sql = require("mssql");

  const value = myBlob.toString();
  const arr = CSV.parse(value);
  arr.shift();

  const sqlConfig = {
    user: "neetesh",
    password: "falana@123",
    database: "task4",
    server: "neetesh01.database.windows.net",
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: false, // change to true for local dev / self-signed certs
    },
  };
  await sql.connect(sqlConfig);
  // .then((res) => context.log(res))
  // .catch((err) => context.log(err));
  async function query(element) {
    try {
      const result =
        await sql.query`insert into [dbo].[info](fistname,lastname,email,email2,profession) values (${element[1]},${element[2]},${element[3]},${element[4]},${element[5]})`;

      // context.log(result);
    } catch (err) {
      // context.log(err);
    }
  }
  arr.forEach((element) => {
    query(element);
  });
  context.log("Done");
  // function getEmployees() {
  //   var dbConn = new sql.Connection(sqlConfig);
  //   dbConn
  //     .connect()
  //     .then(function () {
  //       var request = new sql.Request(dbConn);
  //       request
  //         .query("select * from [dbo].[info]")
  //         .then(function (resp) {
  //           context.log(resp);
  //           dbConn.close();
  //         })
  //         .catch(function (err) {
  //           context.log(err);
  //           dbConn.close();
  //         });
  //     })
  //     .catch(function (err) {
  //       context.log(err);
  //     });
  // }
  // async () => {
  //   try {
  //     // make sure that any items are correctly URL encoded in the connection string
  //     await sql.connect(sqlConfig);
  //     context.log("hello" );
  //     const result = await sql.query`select * from [dbo].[info]]`;
  //     context.log(result);
  //   } catch (err) {
  //     context.log(err);
  //   }
  // };
};
/////Database Connection
//   var Connection = require("tedious").Connection;
//   var config = {
//     server: "neetesh01.database.windows.net",
//     authentication: {
//       type: "default",
//       options: {
//         userName: "neetesh",
//         password: "falana@123",
//       },
//     },
//     options: {
//       // If you are on Microsoft Azure, you need encryption:
//       encrypt: true,
//       database: "task4",
//     },
//   };
//   var connection = new Connection(config);
//   connection.on("connect", function (err) {
//     // If no error, then good to proceed.
//     context.log("Connected");
//   });

//   connection.connect();
//   var Request = require("tedious").Request;
//   var TYPES = require("tedious").TYPES;

//   try {
//     arr.forEach((item) => {
//       executeStatement1();
//       async function executeStatement1() {
//         request = new Request(
//           "INSERT [dbo].[info] (firstname,lastname,email,email2,profession) VALUES (@firstname,@lastname,@email,@email2,@profession);",
//           function (err) {
//             if (err) {
//               context.log(err);
//             }
//           }
//         );
//       }
//       request.addParameter("firstname", TYPES.NVarChar, item[1]);
//       request.addParameter("lastname", TYPES.NVarChar, item[2]);
//       request.addParameter("email", TYPES.NVarChar, item[3]);
//       request.addParameter("email2", TYPES.NVarChar, item[4]);
//       request.addParameter("profession", TYPES.NVarChar, item[5]);
//       request.on("requestCompleted", function (rowCount, more) {
//         connection.close();
//       });
//       connection.execSql(request);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
