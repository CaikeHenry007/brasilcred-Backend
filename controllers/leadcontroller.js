const pool = require("../config/db");

exports.getLeads = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM leads ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar leads" });
  }
};

exports.createLead = async (req, res) => {
  try {
    const {
      nome,
      whatsapp,
      email,
      cpf,
      faz_parte_bolsa_familia,
      recebe_caixa_tem,
      recebe_400_ou_mais,
      possui_emprestimo_crefisa,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO leads 
      (nome, whatsapp, email, cpf, faz_parte_bolsa_familia, recebe_caixa_tem, recebe_400_ou_mais, possui_emprestimo_crefisa) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8) 
      RETURNING *`,
      [
        nome,
        whatsapp,
        email,
        cpf,
        faz_parte_bolsa_familia,
        recebe_caixa_tem,
        recebe_400_ou_mais,
        possui_emprestimo_crefisa,
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao salvar lead" });
  }
};
