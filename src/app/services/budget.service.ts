import { Injectable } from '@angular/core';

import { Service } from '../../models/service.model';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  // Array de objetos tipo Service donde se añadiran los elementos seleccionados
  private myShopping: Service[] = [];

  constructor() { }

  getTotal(totalPage: number, totalLanguage: number){
    return this.myShopping.reduce((sum, item) => sum + item.price, 0) + (totalPage*totalLanguage*30);
  }

  getmyShopping(){
    return this.myShopping;
  }
}
