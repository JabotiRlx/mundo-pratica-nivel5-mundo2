import { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router'
import { Menu } from '@/componentes/Menu';
import ControleEditora from '@/classes/controle/ControleEditora';
import ControleLivros from '@/classes/controle/ControleLivros';

const controleEditora = new ControleEditora();
const controleLivros = new ControleLivros();

interface Livro {
  _id: string|null;
  titulo: string;
  resumo: string;
  autores: string[];
  codEditora: number;
}

//const baseURL = 'http://localhost:3000/api/livros';

const LivroDados: React.FC = () => {
  const opcoes = controleEditora.getEditoras();
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0].codEditora);

  // const incluirLivro = async (livro: Livro) => {
  //   const response = await fetch(baseURL, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(livro),
  //   });
  //   return response.ok;
  // };

  const tratarCombo = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const value = parseInt(event.target.value, 10);
    setCodEditora(value);
  };

  const incluir = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const livro: Livro = {
      _id: null,
      titulo,
      resumo,
      autores: autores.split('\n').map((autor) => autor.trim()),
      codEditora,
    };

    console.log("livro",livro);

    controleLivros.incluir(livro).then( () =>{ Router.push('/LivroLista'); });
    // await incluirLivro(livro);

  };

  return (
    <div >
      <Head>
        <title>Dados do Livro</title>
      </Head>
      <Menu />
      <main className="container">
        <h1><b> Dados do Livro</b></h1>
        <form onSubmit={incluir}>

          <div className="mb-3">
            <label>Título:</label>
            <input
              className="form-control"
              type="text"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Resumo:</label>
            <textarea
              className="form-control"
              value={resumo}
              onChange={(event) => setResumo(event.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label>Editora:</label>
            <select className="form-select" value={codEditora} onChange={tratarCombo}>
              {opcoes.map((opcao) => (
                <option key={opcao.codEditora} value={opcao.codEditora}>
                  {opcao.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Autores(1 por linha):</label>
            <textarea
              className="form-control"
              value={autores}
              onChange={(event) => setAutores(event.target.value)}
            ></textarea>
          </div>

          <button className="btn btn-primary" type="submit">Salvar Dados</button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;