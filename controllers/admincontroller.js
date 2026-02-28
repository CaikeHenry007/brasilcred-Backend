const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, senha } = req.body;

  db.query(
    "SELECT * FROM admin WHERE email = ?",
    [email],
    async (err, results) => {
      if (err || results.length === 0) {
        return res.status(400).json({ error: "Credenciais inválidas" });
      }

      const admin = results[0];
      const senhaValida = await bcrypt.compare(senha, admin.senha);

      if (!senhaValida) {
        return res.status(400).json({ error: "Credenciais inválidas" });
      }

      const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
        expiresIn: "8h",
      });

      res.json({ token });
    }
  );
};
