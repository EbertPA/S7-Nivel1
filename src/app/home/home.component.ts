import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ElementRef,
} from '@angular/core';

import { Service } from '../../models/service.model';

import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChildren('checkboxes') checkboxes!: QueryList<ElementRef>;

  // Array de objetos tipo Service donde se añadiran los elementos seleccionados
  myShopping: Service[] = [];

  // Variable que activa peticion numero de páginas e idiomas
  pageWebSelected: boolean = false;

  // Array que controla los elementos seleccionados
  selected: number[] = [];

  // Variable utilizada para calcular el valor total de los elementos seleccionados
  total: number = 0;

  // Variables del componente
  totalPages: number = 0;
  totalLanguages: number = 0;
  namePresupuesto: string = '';
  cliente: string = '';

  date = new Date();

  services = [
    {
      id: '1',
      description: 'Una página web',
      price: 500,
    },
    {
      id: '2',
      description: 'Una consultoria SEO',
      price: 300,
    },
    {
      id: '3',
      description: 'Una campaña de Google Ads',
      price: 200,
    },
  ];

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {}

  // Método que añade elementos seleccionados al array de servicios myShopping
  addService(service: Service, index: number) {
    let deleteIndex: number = this.selected.indexOf(index);
    if (this.selected.indexOf(index) === -1) {
      this.selected.push(index);
      this.myShopping.push(service);
      if (index === 0) {
        this.pageWebSelected = !this.pageWebSelected;
      }
    } else {
      this.selected.splice(this.selected.indexOf(index), 1);
      this.myShopping.splice(deleteIndex, 1);
      if (index === 0) {
        this.pageWebSelected = !this.pageWebSelected;
        this.totalPages = 0;
        this.totalLanguages = 0;
      }
    }
    this.addToPresupuesto();
    this.calculateTotal();
  }

  onPageSelected(numPage: number) {
    this.totalPages = numPage;
    this.myShopping.map((item) => {
      if (item.id === '1') {
        item.pages = numPage;
        item.price = 500 + this.totalPages * this.totalLanguages * 30;
      }
    });

    this.addToPresupuesto();
    this.calculateTotal();
  }

  onLanguageSelected(numLanguage: number) {
    this.totalLanguages = numLanguage;
    this.myShopping.map((item) => {
      if (item.id === '1') {
        item.languages = numLanguage;
        item.price = 500 + this.totalPages * this.totalLanguages * 30;
      }
    });

    this.addToPresupuesto();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.budgetService.getTotal(
      this.myShopping,
      this.totalPages,
      this.totalLanguages
    );
  }

  addToPresupuesto() {
    this.calculateTotal();
    this.budgetService.addService(
      this.date,
      this.namePresupuesto,
      this.cliente,
      this.total
    );
  }

  onRegister() {
    console.log(this.onRegister);
  }

  addToBudget() {
    this.budgetService.addPresupuestoToArray(this.myShopping);
    localStorage.setItem('services', JSON.stringify(this.myShopping));
    this.reiniciarVariables();
  }

  reiniciarVariables() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.pageWebSelected = false;
    this.total = 0;
    this.selected = [];

    this.totalPages = 0;
    this.totalLanguages = 0;
    this.namePresupuesto = '';
    this.cliente = '';

    this.budgetService.resetPresupuesto();
    this.myShopping = [];
    this.services = [
      {
        id: '1',
        description: 'Una página web',
        price: 500,
      },
      {
        id: '2',
        description: 'Una consultoria SEO',
        price: 300,
      },
      {
        id: '3',
        description: 'Una campaña de Google Ads',
        price: 200,
      },
    ];
  }
}
