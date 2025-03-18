const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/item.routes");
const transactionRoutes= require("./routes/transactions.js")
const express = require("express");
const cors = require("cors");
const { db } = require("./config/db");
const { readdirSync } = require("fs");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./config/db").connect();
const { auth } = require("./middlewares/auth.middleware");
const PORT = process.env.PORT || 4000;
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true, // Allow credentials (cookies) to be sent
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
    origin:['http://localhost:3000',"*"]
  })
);

app.use(
  session({
    secret: "your_secret_key", // Replace with a strong secret key
    resave: false, // Avoid resaving session if not modified
    saveUninitialized: true, // Save sessions even if uninitialized
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true, // Prevent client-side JavaScript from accessing cookies
      maxAge: 1000 * 60 * 60 * 1, // Session expires after 1 hour
    },
  })
);

// Default Route
app.get("/", (req, res) => {
  res.send("Hello from Index route");
});

app.use("/", userRoutes);
app.use("/", orderRoutes);
app.use("/",transactionRoutes);

// // Dynamically Load Routes
// readdirSync("./routes").map((route) =>
//   app.use("/", require("./routes/" + route))
// );

// // Serve frontend build files
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// // Serve React app for any other route
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
// });

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

// Start Server
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
