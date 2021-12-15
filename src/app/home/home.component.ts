import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

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

  // Variables del formulario
  paginaWeb: boolean = false;
  campaniaSeo: boolean = false;
  campaniaAds: boolean = false;
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

  constructor(private budgetService: BudgetService, private router: Router) {}

  ngOnInit(): void {
    this.updateUrl();
  }

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
    this.updateUrl();
  }

  // Método que actualiza el precio al incrementar o decrementar el número de páginas
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
    this.updateUrl(); //**
  }

  // Método que actualiza el precio al incrementar o decrementar el número de idiomas
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
    this.updateUrl(); //**
  }

  // Método que pasa parametros al servicio para calcular el valor total de los servicios seleccionados
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

  // Método que guarda en el localStorage los servicios seleccionados del formulario
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

  // Método que actualiza los queryParams de la url en /home
  updateUrl() {
    this.services.forEach((item, i) => {
      if (i === 0) {
        if (this.selected.indexOf(i)) {
          this.paginaWeb = false;
        } else {
          this.paginaWeb = true;
        }
      }
      if (i === 1) {
        if (this.selected.indexOf(i)) {
          this.campaniaSeo = false;
        } else {
          this.campaniaSeo = true;
        }
      }
      if (i === 2) {
        if (this.selected.indexOf(i)) {
          this.campaniaAds = false;
        } else {
          this.campaniaAds = true;
        }
      }
    });

    this.router.navigate(['/home'], {
      queryParams: {
        paginaWeb: this.paginaWeb,
        campaniaSeo: this.campaniaSeo,
        campaniaAds: this.campaniaAds,
        nPagina: this.totalPages,
        nIdiomas: this.totalLanguages,
      },
    });
  }
}
