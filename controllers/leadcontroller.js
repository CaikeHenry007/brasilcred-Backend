const db = require("../config/db");

function classificar(dados) {
  if (
    dados.faz_parte_bolsa_familia &&
    dados.recebe_caixa_tem &&
    dados.recebe_400_ou_mais &&
    !dados.possui_emprestimo_crefisa
  ) {
    return "classificado";
  }
  return "desclassificado";
}

exports.criarLead = (req, res) => {
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

  if (
    !nome ||
    !whatsapp ||
    !email ||
    !cpf ||
    faz_parte_bolsa_familia === undefined ||
    recebe_caixa_tem === undefined ||
    recebe_400_ou_mais === undefined ||
    possui_emprestimo_crefisa === undefined
  ) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const status = classificar(req.body);

  const sql = `
    INSERT INTO leads 
    (nome, whatsapp, email, cpf,
     faz_parte_bolsa_familia,
     recebe_caixa_tem,
     recebe_400_ou_mais,
     possui_emprestimo_crefisa,
     status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      nome,
      whatsapp,
      email,
      cpf,
      faz_parte_bolsa_familia,
      recebe_caixa_tem,
      recebe_400_ou_mais,
      possui_emprestimo_crefisa,
      status,
    ],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao salvar lead" });
      }

      res.json({ message: "Lead salvo com sucesso", status });
    }
  );
};

exports.listarLeads = (req, res) => {
  db.query("SELECT * FROM leads ORDER BY criado_em DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar leads" });
    res.json(results);
  });
};
