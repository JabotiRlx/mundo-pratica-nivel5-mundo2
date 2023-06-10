import { useState,useEffect } from 'react';
import ControleLivros from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

const LinhaLivro = ( props ) => {

  const { livro, excluir } = props;

    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);
    return (
        <tr>
          <td>
            {livro.titulo}
            <br></br>  
            <button className="btn btn-danger" onClick={() => excluir(livro._id)}>Excluir</button>
          </td>
          <td>{livro.resumo}</td>
          <td>{nomeEditora}</td>
          <td>
            <ul>
              {livro.autores.map((autor, index) => ( <li key={index}>{autor}</li>  ))}
            </ul>
          </td>
        </tr>
    );
};

const LivroLista =()=> {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);
  
    useEffect( () => {
      
      controleLivro.obterLivros()
        .then((livrosObtidos) => {
          setLivros(livrosObtidos);
          setCarregado(true);
        })
      
    },[carregado]);
  
    const excluir = codigo => {
      controleLivro.excluir(codigo).then(() => {
        const livrosAtualizados = livros.filter((livro) => livro.codigo !== codigo);
        setLivros(livrosAtualizados);
        setCarregado(false);
      })
      
    };
  
    return (
      <main className="container text-start">
        <h1><b>Catálogo de Livros</b></h1>
        <table className="table table-striped">
          <thead>
            <tr className="table-dark">
              <th className="col-2">Título</th>
              <th className="col-4">Resumo</th>
              <th className="col-2">Editora</th>
              <th className="col-2">Autores</th>
            </tr>
          </thead>
          <tbody >
            {carregado && livros.map((livro, index) => ( <LinhaLivro key={index}  livro={livro} excluir={excluir} /> ))}
          </tbody>
        </table>
      </main>
    );
};
  
  export default LivroLista;