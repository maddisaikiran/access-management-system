const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/data", (req, res) => {
  const db = router.db; // Access lowdb instance
  const newData = req.body;

  // Add the new object to the "data" array in the database
  db.get("data").push(newData).write();

  // Respond with the updated "data" array
  const updatedData = db.get("data").value();
  res.status(200).json({
    message: "",
    result: true,
    data: updatedData
  });
});

// Use default router
server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});