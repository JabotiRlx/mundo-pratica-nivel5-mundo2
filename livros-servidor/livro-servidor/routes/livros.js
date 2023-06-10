const livroDAO = require('../modelo/livro-dao');
const express = require( 'express' );
const router = express.Router();

router.get( '/', async (req, res) => {
    try {
      const livros = await livroDAO.obterLivros();
      res.json(livros);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter os livros.' });
    }});

router.post('/', async (req, res) => {
    try {
        const novoLivro = await livroDAO.incluir(req.body);
        res.json({ message: 'Sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao incluir o livro.' });
    }});

router.delete('/:codigo', async (req, res) => {
    try {
        const codigo = req.params.codigo;
        await livroDAO.excluir(codigo);
        res.json({ message: 'Excluido com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir o livro.' });
    }});

module.exports = router;