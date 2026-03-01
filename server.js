require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

const leadRoutes = require("./routes/leadroutes");
const adminRoutes = require("./routes/adminroutes");

app.use(express.json());

app.use("/leads", leadRoutes);
app.use("/admin", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
