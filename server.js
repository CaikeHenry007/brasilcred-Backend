require("dotenv").config();
const express = require("express");
const cors = require("cors");

const leadRoutes = require("./routes/learoutes");
const adminRoutes = require("./routes/adminroutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/leads", leadRoutes);
app.use("/admin", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
