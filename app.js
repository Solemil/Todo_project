const express = require("express");
const app = express();
const conn = require("./db");
const path = require("path");

app.use(express.json());

app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname + "/public/" + "index.html"));
});

app.get("/todos", (req, res) => {
  const query = `SELECT * FROM todoList`;
  conn.query(query, (error, response) => {
    if (error) res.status(500).send({ error });
    res.status(200).send(response);
  });
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM todoList WHERE id = "${id}"`;
  conn.query(query, (error, response) => {
    if (error) res.status(500).send({ error });
    res.status(200).send(response);
  });
});

app.post("/todos", (req, res) => {
  const task = req.body;
  const query = `INSERT INTO todoList (text) VALUES (?)`;
  const params = [task.text];
  conn.query(query, params, (error, response) => {
    if (error) res.status(500).send({ error });
    res
      .status(200)
      .send({ id: response.insertId, text: task.text, completed: false });
  });
});

app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const isCompleted = req.body.completed;
  const text = req.body.text;
  const query = `UPDATE todoList SET completed = ?, text = ? WHERE id = ?`;
  const params = [isCompleted, text, id];
  conn.query(query, params, (err, response) => {
    if (err) res.status(500).send({ error: "error" });
    if (response.affectedRows === 0) return res.status(404).send();
    res.status(200).send({ id: id, text: text, completed: isCompleted });
  });
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM todoList WHERE id = ?`;
  const params = [id];

  conn.query(query, params, (err, response) => {
    if (err) res.status(500).send();
    if (response.affectedRows === 0) return res.status(404).send();
    res.status(200).send(response);
  });
});

// app.delete("/todos/:id", async (req, res) => {
//   const id = req.params.id;
//   const deleteQuery = `DELETE FROM todoList WHERE id = ?`;
//   const idParams = [id];

//   try {
//     const [result] = await conn.promise().query(deleteQuery, idParams);
//     if (response.affectedRows === 0) return res.sendStatus(404);
//     res.status(200).send({ deleted: result });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ error: "Databas error" });
//   }
// });

module.exports = app;
