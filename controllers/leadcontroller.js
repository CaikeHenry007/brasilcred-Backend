const db = require("../config/db");

function toBoolean(value) {
  return value === true || value === "true" || value === 1 || value === "1";
}

function classificar(dados) {
  const fazParte = toBoolean(dados.faz_parte_bolsa_familia);
  const caixaTem = toBoolean(dados.recebe_caixa_tem);
  const recebe400 = toBoolean(dados.recebe_400_ou_mais);
  const possuiCrefisa = toBoolean(dados.possui_emprestimo_crefisa);

  if (fazParte && caixaTem && recebe400 && !possuiCrefisa) {
    return "qualificado";
  }

  return "desqualificado";
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
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({
            error: "CPF já cadastrado",
          });
        }

        return res.status(500).json({
          error: "Erro interno ao salvar lead",
        });
      }

      res.json({ message: "Lead salvo com sucesso", status });
    },
  );
};

exports.listarLeads = (req, res) => {
  db.query("SELECT * FROM leads ORDER BY criado_em DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar leads" });
    res.json(results);
  });
};
