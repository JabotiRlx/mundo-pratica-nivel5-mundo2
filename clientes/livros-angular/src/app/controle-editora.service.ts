import { Injectable } from '@angular/core';
import Editora from "./editora";


const editoras:  Array<Editora>=[
    new Editora(1, "Saraiva"),
    new Editora(2, "Cultura"),
    new Editora(3, "Saber do amanha"),
];
 
class ControleEditora {
    // public constructor(parameters) {};

    getNomeEditora(codEditora: number): string  {
        const editora = editoras.filter( editora => editora.codEditora === codEditora );
        return editora[0] ? editora[0].nome: "não encontrado!";
      }

    getEditoras(): Array<Editora> {
        return editoras;
    }
}

export default ControleEditora