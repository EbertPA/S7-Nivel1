import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  validaForm: FormGroup = this.fb.group({
  numeroPaginas: ['', [Validators.required, Validators.min(0)] ],
  numeroIdiomas: ['', [Validators.required, Validators.min(0)]],
  })

  numPages: number = 0;
  numLanguages:number = 0;

  @Output() pageSelected = new EventEmitter<number>();
  @Output() languageSelected = new EventEmitter<number>();

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
  }

  enviar(pages?: number, tipo?: string) {
    if(tipo != undefined){
        if(tipo === 'pages'){
        this.pageSelected.emit(pages);
        this.languageSelected.emit(this.numLanguages);
      }else{
        this.pageSelected.emit(this.numPages);
        this.languageSelected.emit(pages);
      }
  }
  }

  pages(numPages: number, namepages: string){
    this.numPages = numPages;
    this.enviar(this.numPages, namepages);
  }
  languages(numLanguages: number, namelang: string){
    this.numLanguages = numLanguages;
    this.enviar(this.numLanguages, namelang);
  }

}
