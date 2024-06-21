require("dotenv").config();
const { app, setDB } = require("./app");
const connectDB = require("./db");

const port = process.env.PORT || 5000;

connectDB().then((db) => {
  setDB(db);
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
