import { Injectable } from '@angular/core';

import { Service } from '../../models/service.model';
import { Presupuesto } from '../../models/service.presupuesto';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {

  presupuesto: Presupuesto = {
    date: new Date(),
    name: '',
    customer: '',
    service: [
      {
        id: '',
        description: '',
        price: 0,
      },
    ],
    total: 0,
  };

  // Array de objetos tipo Service donde se añadiran los elementos seleccionados
  private arrayPresupuestos: Presupuesto[] = [];

  constructor() {
    if(localStorage.getItem('arraybudget')){
      this.arrayPresupuestos = JSON.parse(localStorage.getItem('arraybudget')!);
    }
  }

  getTotal(mySelect: Service[], totalPage: number, totalLanguage: number) {
    return (
      mySelect.reduce((sum, item) => sum + item.price, 0)
    );
  }

  getmyPresupuestos() {
    return this.arrayPresupuestos;
  }

  addService(date: Date, name: string, cliente: string, total: number) {
      this.presupuesto.date = date;
      this.presupuesto.name = name;
      this.presupuesto.customer = cliente;
      this.presupuesto.total = total;
  }

  addPresupuestoToArray(mySelect: Service[]) {
    let i = 0;
    mySelect.map((item) => {
      i++;
      if (this.presupuesto.service.length === 1) {
        this.presupuesto.service.map((i) => {
          if (i.id === '') {
            this.presupuesto.service.splice(0, 1);
          }
        });
      }
      if (this.presupuesto.service.indexOf(item) === -1 && item.id != '') {
        this.presupuesto.service.push(item);
      }
    });
    let indice = this.arrayPresupuestos.indexOf(this.presupuesto);
    if (this.arrayPresupuestos.indexOf(this.presupuesto) === -1) {
      this.arrayPresupuestos.push(this.presupuesto);
    } else {
      this.arrayPresupuestos[indice].total = this.presupuesto.total;
    }

    // Almacena lista de presupuestos en Localstorage
    localStorage.setItem('arraybudget', JSON.stringify( this.arrayPresupuestos ) );
  }

  resetPresupuesto(){
    this.presupuesto = {
      date: new Date(),
      name: '',
      customer: '',
      service: [
        {
          id: '',
          description: '',
          price: 0,
        },
      ],
      total: 0,
    };
  }

}
