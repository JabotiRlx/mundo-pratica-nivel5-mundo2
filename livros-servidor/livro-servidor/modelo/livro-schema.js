const banco = require('./conexao');

const LivroSchema = banco.Schema({
    _id:banco.Schema.Types.ObjectId,
    titulo: String,
    codEditora: Number,
    resumo: String,
    autores: [String]
});

module.exports = banco.model('Livro', LivroSchema);