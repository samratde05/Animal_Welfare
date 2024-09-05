const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

//import routes
const routes = require("./routes/routes");
const { db } = require("./models/User");

// db
console.log(process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI || process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connected"));

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

//middlewares
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(fileUpload({ createParentPath: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
app.use("/api", routes);

// server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
