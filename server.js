const app = require("./app");
const conn = require("./db");

const portToListen = 3000;

app.listen(
  portToListen,
  console.log(`Server listening on port ${portToListen}`)
);

conn.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Connection to database established");
});
