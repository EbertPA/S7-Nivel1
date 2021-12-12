import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() message: string = "";

  constructor(public modal: NgbModal) { }

  ngOnInit(): void {
  }

  openXL(contenido: TemplateRef<Component>){
    this.modal.open(contenido, {size: 'xl', centered: true});
  }

}
