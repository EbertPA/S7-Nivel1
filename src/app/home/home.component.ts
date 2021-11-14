import { Component, OnInit } from '@angular/core';

import { Service } from '../../models/service.model';

import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Array de objetos tipo Service donde se añadiran los elementos seleccionados
  myShopping: Service[] = [];

  pageWebSelected: boolean = false;

  // Array que controla los elementos seleccionados
  selected:number[] = [];

  // Variable utilizada para calcular el valor total de los elementos seleccionados
  total:number = 0;

  // Variables del componente padre home
  totalPages: number = 0;
  totalLanguages: number = 0;

  services = [
    {
      id: '1',
      description: 'Una página web',
      price: 500
    },
    {
      id: '2',
      description: 'Una consultoria SEO',
      price: 300
    },
    {
      id: '3',
      description: 'Una campaña de Google Ads',
      price: 200
    }
  ]

  constructor(
    private budgetService: BudgetService
  ) {
    this.myShopping = this.budgetService.getmyShopping();
   }

  ngOnInit(): void {
  }

  // Método que añade elementos seleccionados al array de servicios
  addService(service: Service, index:number){
    let deleteIndex: number = this.selected.indexOf(index);
    if(this.selected.indexOf(index) === -1){
      this.selected.push(index);
      this.myShopping.push(service);
      if(index === 0){
        this.pageWebSelected = !this.pageWebSelected;
      }
    }else{
      this.selected.splice(this.selected.indexOf(index),1);
      this.myShopping.splice(deleteIndex,1);
      if(index === 0){
        this.pageWebSelected = !this.pageWebSelected;
        this.totalPages = 0;
        this.totalLanguages = 0;
      }
    }
    this.calculateTotal();
  }

  onPageSelected(numPage: number){
    this.totalPages = numPage;
    this.calculateTotal();
  }

  onLanguageSelected(numLanguage: number){
    this.totalLanguages = numLanguage;
    this.calculateTotal();
  }

  calculateTotal(){
    this.total = this.budgetService.getTotal(this.totalPages, this.totalLanguages);
  }

}
