import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalClienteDeleteComponent } from '../modal-cliente-delete/modal-cliente-delete.component';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.scss'],
  host: { class: 'content' }
})
export class ClienteDetailComponent implements OnInit {
  cliente: any;

  modalRef: any;

  constructor(
    private location: Location, 
    private router: Router, 
    private route: ActivatedRoute,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    var { data } = this.location.getState() as any;
    this.cliente = data;
  }

  handleVoltar(): void {
    this.router.navigate(['/clientes']);
  }

  handleEditar(): void {
    this.router.navigate([this.cliente.identificador, 'edit'], { relativeTo: this.route.parent, state: { data: this.cliente }});
  }

  handleRemover(): void {
    if (this.modalRef) return;

    this.modalRef = this.dialog.open(ModalClienteDeleteComponent, {
      data: this.cliente.identificador,
      height: '105.2px',
      disableClose: true
    });

    this.modalRef.afterClosed().subscribe(() => this.modalRef = undefined);
  }
}
