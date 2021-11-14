import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  numPage: number = 0;
  numValid: boolean = false;
  error: string = '';

  @Output() onNewNumber: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  actualiza(numero: number){
    if(!isNaN(this.numPage)){
      this.numPage *=1;
      if(this.numPage>0 || numero>0){
        this.numPage+=numero;
      }
      this.compruebaInput(this.numPage);
    }
  }

  compruebaInput(pagina: number){
    this.error = '';
    this.numValid = false;
    if(pagina.toString() === ""){
      this.numValid = !this.numValid;
      this.error = "Es un campo obligatorio";
    }else
    if(isNaN(pagina)){
      this.numValid = !this.numValid;
      this.error = "Ingresar un valor numérico";
    }else
    if(pagina<0){
      this.numValid = !this.numValid;
      this.error = "Ingresar un valor entero positivo";
    }
    else{
      this.sendNumero();
    }
  }

  sendNumero(){
    this.onNewNumber.emit(this.numPage);
  }

}
