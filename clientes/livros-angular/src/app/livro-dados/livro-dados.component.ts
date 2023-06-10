import { Component, OnInit } from '@angular/core';
import  ControleEditoraService from '../controle-editora.service';
import  ControleLivrosService  from '../controle-livros.service';
import { Router } from '@angular/router';
import  Livro  from '../livro';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css']
})


export class LivroDadosComponent implements OnInit {

  editoras:{ codEditora: number; nome: string; }[] = [];

  autoresForm:string = "";

   livro:Livro = {
    _id:null,
    codEditora: 1,
    titulo:"",
    resumo:"",
    autores:[]
  };
  
  constructor(private servEditora: ControleEditoraService, private servLivros: ControleLivrosService,private router: Router) { }
  
  
  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras().map( editora => ({
      codEditora: editora.codEditora,
      nome: editora.nome,
    }));

    this.livro.codEditora = this.editoras[0].codEditora;
  }
  
  incluir=():void=>{
    this.livro = {
      ...this.livro,
      _id: null,
      autores: this.autoresForm.split('\n'),
      codEditora: Number( this.livro.codEditora ) ,
    };

    console.log( "livro", this.livro)

    this.servLivros.incluir( this.livro ).then( () =>{
      this.router.navigateByUrl('/lista');
    } )
  }

  obterNome = (codEditora: number): string => this.servEditora.getNomeEditora(codEditora);
}
