const pool = require("../config/db");

exports.getLeads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const offset = (page - 1) * limit;

    const leadsQuery = await pool.query(
      "SELECT * FROM leads ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [limit, offset],
    );

    const countQuery = await pool.query("SELECT COUNT(*) FROM leads");

    const total = parseInt(countQuery.rows[0].count);
    const totalPages = Math.ceil(total / limit);

    res.json({
      leads: leadsQuery.rows,
      total,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
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
