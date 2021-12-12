import { Component, OnInit } from '@angular/core';

import { BudgetService } from '../services/budget.service';
import { Presupuesto } from '../../models/service.presupuesto';


@Component({
  selector: 'app-pressupost-list',
  templateUrl: './pressupost-list.component.html',
  styleUrls: ['./pressupost-list.component.scss']
})
export class PressupostListComponent implements OnInit {

  searchName: string = '';

  presupuesto: Presupuesto = {
    date: new Date,
    name: '',
    customer: '',
    service: [{
      id: '',
      description: '',
      price: 0,
    }],
    total: 0,
  };

  arrayPresupuestos: Presupuesto[] = [];

  filtered: Presupuesto[] = [];

  encontrado: boolean = false;

  constructor(
    private bs: BudgetService
  ) {
    this.arrayPresupuestos = this.bs.getmyPresupuestos();
   }

  ngOnInit(): void {
  }

  buscar(){
    this.reiniciar();
    if(this.searchName.trim() === ''){
      return;
    }
    this.searchName = this.searchName.toLowerCase();
    this.arrayPresupuestos.forEach(item => {
      if(item.name.toLowerCase().indexOf(this.searchName.toLowerCase()) >= 0){
        this.filtered.push(item);
      }
    })
    this.arrayPresupuestos = this.filtered;
    if(this.filtered.length > 0){
      this.encontrado = false;
    }else {
      this.encontrado = true;
    }
    this.searchName = '';
  }

  alfabeticamente() {
    this.filtered = this.arrayPresupuestos.sort((a,b) => {
      if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });
  }

  porFecha() {
    this.filtered = this.arrayPresupuestos.sort((a,b) => {
      if(a.date < b.date) return -1;
      if(a.date > b.date) return 1;
      return 0;
    });
  }

  reiniciar(){
    this.encontrado = false;
    this.filtered = [];
    if(localStorage.getItem('arraybudget')){
      this.arrayPresupuestos = JSON.parse(localStorage.getItem('arraybudget')!);
    }
  }

}
