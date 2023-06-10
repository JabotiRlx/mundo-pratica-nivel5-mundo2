class Livro {
    public _id: string|null;
    public  codEditora: number;
    public  titulo: string;
    public  resumo: string;
    public  autores: string[];
        
    public constructor(  _id:string|null, codEditora:number, titulo:string, resumo:string, autores:string[]) {
        this._id = _id;
        this.codEditora = codEditora;
        this.titulo = titulo;
        this.resumo = resumo;
        this.autores = autores;
    }
}

export default Livro;