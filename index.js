const express = require("express");
const ConnectDB = require("./config/db");
require("dotenv").config();
const userRoute = require("./routes/userRoutes");
const notesRoute = require("./routes/notesRoutes");

const app = express();
app.use(express.json());
ConnectDB();
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/users", userRoute);
app.use("/api/notes", notesRoute);

app.listen(process.env.PORT, () =>
  console.log(`server started on port:${process.env.PORT}`)
);
