import { Component, OnInit } from '@angular/core';
import  Editora  from '../editora';
import  Livro  from '../livro';
import  ControleEditoraService from '../controle-editora.service';
import  ControleLivrosService  from '../controle-livros.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
  editoras: Editora[] = [];
  livros: Livro[] = [];
  constructor(private servEditora: ControleEditoraService, private servLivros: ControleLivrosService) { }

  async ngOnInit() {
    this.editoras = this.servEditora.getEditoras();
    this.livros = await this.servLivros.obterLivros().then( livros => livros );
  }
  
  excluir= async (codigo: string) => {
    await this.servLivros.excluir(codigo);
    this.livros = await this.servLivros.obterLivros().then( livros => livros );
  }

  obterNome = (codEditora: number): string => this.servEditora.getNomeEditora(codEditora);
  
}
