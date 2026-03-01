require("dotenv").config();
const express = require("express");
const cors = require("cors");

const leadRoutes = require("./routes/leadroutes");
const adminRoutes = require("./routes/adminroutes");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:8080", "https://seu-frontend.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/leads", leadRoutes);
app.use("/admin", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
