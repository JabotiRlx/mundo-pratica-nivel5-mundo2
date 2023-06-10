import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Menu } from '@/componentes/Menu';

// import styles from '../styles/Home.module.css';
import ControleEditora from '@/classes/controle/ControleEditora';
import ControleLivro from '@/classes/controle/ControleLivros';
// import Livro from '@/classes/modelo/Livro';

const controleEditora = new ControleEditora();
const controleLivros = new ControleLivro();
// const baseURL = 'http://localhost:3000/api/livros';

const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    controleLivros.obterLivros()
      .then( livros => {

        setLivros( livros );
        setCarregado(true);
      })
      .catch((error) => {
        console.error('Erro ao obter os livros:', error);
      });
  },[carregado]);

 // const obterLivros = async () => await fetch(baseURL).then( resp => resp.json() );
 

  // const excluirLivro = async (codigo: number) => {
  //   const response = await fetch(`${baseURL}/${codigo}`, {
  //     method: 'DELETE',
  //   });
  //   return response.ok;
  // };

  const excluir = async (codigo: string) => {
      console.log( "codigo", codigo)
      controleLivros.excluir(codigo).then(() => {
      const livrosAtualizados = livros.filter((livro) => livro._id !== codigo);
      setLivros(livrosAtualizados);
      setCarregado(false);
    })
  };

  return (
    <div >
      <Head>
        <title>LivroLista</title>
      </Head>
      <Menu />
      <main className="container text-start">
        <h1><b>Catálogo de Livros</b></h1>
        <table className='table table-striped mt-3'>
          <thead>
            <tr className="table-dark">
              <th className="col-4">Título</th>
              <th className="col-2">Editora</th>
              <th className="col-2">Autor</th>
              <th className="col-2">Resumo</th>
            </tr>
          </thead>
          <tbody>
            {carregado &&
              livros.map((livro, index) => (
                <LinhaLivro
                  key={index}
                  livro={livro}
                  excluir={excluir}
                />
              ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

interface Livro {
  _id: string|null;
  titulo: string;
  autores: string[];
  resumo: string;
  codEditora:number;
}

interface LinhaLivroProps {
  livro: Livro;
  excluir: (codigo: string) => void;
}

const LinhaLivro: React.FC<LinhaLivroProps> = ({ livro, excluir }) => {
  return (
    <tr>

      <td>
        {livro.titulo} <br />
       <button className="btn btn-danger" onClick={() => excluir(livro._id)}>Excluir</button>
      </td>
      <td>
          { controleEditora.getNomeEditora( livro.codEditora ) }
      </td>
      <td>
        <ul>
          {livro.autores.map((autor, index) => ( <li key={index}>{autor}</li>  ))}
        </ul>
      </td>
      <td>{livro.resumo}</td>

    </tr>
  );
};

export default LivroLista;