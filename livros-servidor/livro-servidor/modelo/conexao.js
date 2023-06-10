const banco = require("mongoose");

banco.connect(   "mongodb://127.0.0.1:27017/Livraria"  , {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => {
    console.log("Conectado ao MongoDB!");
  })
  .catch((err) => console.log(err));

  banco.Promise = global.Promise;

module.exports = banco;
// module.exports = mongoose;