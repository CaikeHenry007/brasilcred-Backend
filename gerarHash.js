const bcrypt = require("bcrypt");

const senha = "Brasilcred@2026"; // coloque a senha real do admin aqui

bcrypt.hash(senha, 10).then((hash) => {
  console.log("HASH GERADO:");
  console.log(hash);
});
