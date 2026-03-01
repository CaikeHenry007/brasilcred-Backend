const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function criarTabelas() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      nome TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      email TEXT,
      cpf TEXT NOT NULL,
      faz_parte_bolsa_familia BOOLEAN,
      recebe_caixa_tem BOOLEAN,
      recebe_400_ou_mais BOOLEAN,
      possui_emprestimo_crefisa BOOLEAN,
      status TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("Tabelas verificadas/criadas com sucesso");
}

criarTabelas();

pool
  .connect()
  .then((client) => {
    console.log("Banco conectado com sucesso!");
    client.release();
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco:", err);
  });

module.exports = pool;
