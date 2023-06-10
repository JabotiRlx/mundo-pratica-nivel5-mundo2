import { NextApiRequest, NextApiResponse } from 'next';
import  ControleEditora from '../../../classes/controle/ControleEditora';
//import  ControleEditora from '.'; nao funcionou

const controleEditora = new ControleEditora();

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
    
            const codEditora = Number(req.query.codEditora);
            const nomeEditora = controleEditora.getNomeEditora(codEditora);

            res.status(200).json({ nomeEditora });
        } catch (error) {
            res.status(500).json({ message: 'Exceção ocorrida no servidor' });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });

    }

 }