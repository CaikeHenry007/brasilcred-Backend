const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// LOGIN
exports.loginAdmin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query("SELECT * FROM admin WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const admin = result.rows[0];

    const senhaValida = await bcrypt.compare(senha, admin.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};

// CRIAR ADMIN
exports.criarAdmin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verifica se já existe admin
    const adminExistente = await pool.query("SELECT * FROM admin");

    if (adminExistente.rows.length > 0) {
      return res.status(403).json({
        message: "Já existe um administrador cadastrado",
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await pool.query("INSERT INTO admin (email, senha) VALUES ($1, $2)", [
      email,
      senhaHash,
    ]);

    res.status(201).json({
      message: "Administrador criado com sucesso",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar administrador" });
  }
};
