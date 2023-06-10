import { NextApiRequest, NextApiResponse } from 'next';
import  ControleLivro  from '../../../classes/controle/ControleLivros';

const controleLivro = new ControleLivro();

export default (req: NextApiRequest, res: NextApiResponse) => {


  if (req.method === 'DELETE') {
    try{
      const codLivro = Number(req.query.codigo );
      controleLivro.excluir(codLivro);
    //   res.status(200).json({ message: codLivro });
      res.status(200).json({ message: 'Livro excluido com sucesso' });
    }catch( error ){
      res.status(500).json({ message: 'Erro interno do servidor' });
    }

  }else {
    res.status(405).json({ message: 'Método não permitido' });
  }
};