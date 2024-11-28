const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/item.routes");
const session = require("express-session");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
require("./config/db").connect();
const { auth } = require("./middlewares/auth.middleware");
const PORT = process.env.PORT || 4000;
const app = express();

// app.use(cors({origin:process.env.CORS_URL}));
app.use(
  cors({
    credentials: true, // Allow credentials (cookies) to be sent
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "your_secret_key", // Replace with a strong secret key
    resave: false, // Avoid resaving session if not modified
    saveUninitialized: true, // Save sessions even if uninitialized
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true, // Prevent client-side JavaScript from accessing cookies
      maxAge: 1000 * 60 * 60 * 1, // Session expires after 1 hours
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hello from Index route");
});

app.use("/", userRoutes);
app.use("/", orderRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
