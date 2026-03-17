const express = require("express");
const cors = require("cors");
require("dotenv").config();

const adminRoutes = require("./routes/adminroutes");
const leadRoutes = require("./routes/leadroutes");
const configRoutes = require("./routes/configRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/leads", leadRoutes);
app.use("/config", configRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando...");
});
