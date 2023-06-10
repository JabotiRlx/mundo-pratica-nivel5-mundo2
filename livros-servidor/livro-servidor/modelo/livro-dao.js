const Livro = require('./livro-schema');

const obterLivros = async () => {
    try{
        return await Livro.find();

    }catch( error ) {
        console.error( 'Erro!', error )
    }
}

const incluir = async livro => {
    try{
        return await Livro.create( livro );
    }catch( error ) {
        console.error( 'Erro!', error )
    }
}

const excluir = async codigo => {
    try{
        return await Livro.deleteOne( { _id:codigo } );
    }catch( error ) {
        console.error( 'Erro!', error )
    }
}

module.exports = {
    obterLivros,
    incluir,
    excluir
  };