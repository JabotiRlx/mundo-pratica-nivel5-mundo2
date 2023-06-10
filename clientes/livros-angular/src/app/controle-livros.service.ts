import Livro from "./livro";

const baseURL = "http://localhost:3030/livros";

interface LivroMongo {
    _id: string | null;
    codEditora: number,
    titulo:string,
    resumo:string,
    autores:string[]
  }

// const livros:  Array<Livro>=[
//     new Livro(1,2,"Um conto para dormir", "Não há esperança no sonho, apenas pesadelos....",["Alguem de Freitas"] ),
//     new Livro(2,1, "Harry Potter e os Lannister", "Harry e seus amigos aventuram em Westeros",["George Martão", "Hillary Clinton" ] ),
//     new Livro(3,3, "As Aventuras de Doro", "Dora decidiu ser transgenero e esta é sua história", ["Porquinho da India", "Amon rá"]),
// ];
 
class ControleLivro {
    // public constructor(parameters) {};

    async obterLivros() {
        try {
            const response = await fetch(baseURL, { method: 'GET' });
        
            if (!response.ok) throw new Error('Falha ao obter livros');

            const livrosMongo: LivroMongo[] = await response.json();
            const livros: Livro[] = livrosMongo.map((livroMongo) => {
                const livro: Livro = new Livro(
                    livroMongo._id,
                    livroMongo.codEditora,
                    livroMongo.titulo,
                    livroMongo.resumo,
                    livroMongo.autores
                );
                return livro;
            });
        
            return livros;
          
        } catch (error) {
          console.error(error);
          throw new Error('Falha ao obter livros');
        }
    }

    async incluir( livro:Livro ){
        try {
            const livroMongo: LivroMongo = {
              _id: null,
              codEditora: livro.codEditora,
              titulo: livro.titulo,
              resumo: livro.resumo,
              autores: livro.autores
            };
            
            console.log("livroMongo",livroMongo)
             
            const response = await fetch(baseURL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(livroMongo)
            });
        
            return response.ok;
            
          } catch (error) {
            console.error(error);
            throw new Error('Falha ao incluir livro');
          }
    }

    async excluir(codigo: string) {
        try {
          const response = await fetch(`${baseURL}/${codigo}`, {  method: 'DELETE' });
      
          if( !response.ok ) throw new Error( 'Falha ao excluir livro' );
        } catch (error) {
          console.error(error);
          throw new Error('Falha ao excluir livro');
        }
      }
}

export default ControleLivro

