import { NextApiRequest, NextApiResponse } from 'next';
import  ControleLivro  from '../../../classes/controle/ControleLivros';

const controleLivro = new ControleLivro();

export default (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'GET') {
    try {

      const livros = controleLivro.obterLivros();
      res.status(200).json(livros);
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  } else if (req.method === 'POST') {
    try {
      const novoLivro = req.body;
      controleLivro.incluir(novoLivro);
      res.status(200).json({ message: 'Livro adicionado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  } else if (req.method === 'DELETE') {
    try{
      const codLivro = Number(req.query);
      // controleLivro.excluir(codLivro);
      res.status(200).json({ message: codLivro });
      // res.status(200).json({ message: 'Livro excluido com sucesso' });
    }catch( error ){
      res.status(500).json({ message: 'Erro interno do servidor' });
    }

  }else {
    res.status(405).json({ message: 'Método não permitido' });
  }
};