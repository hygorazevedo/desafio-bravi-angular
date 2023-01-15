import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-modal-cliente-delete',
  templateUrl: './modal-cliente-delete.component.html',
  styleUrls: ['./modal-cliente-delete.component.scss']
})
export class ModalClienteDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ModalClienteDeleteComponent>, 
    private clienteService: ClienteService, 
    private router: Router,
    private route: ActivatedRoute) {}

  handleCancelar(): void {
    this.dialogRef.close();
  }

  handleRemover(): void {
    this.clienteService.RemoverCliente(this.data).subscribe(() => {
      this.dialogRef.close();
      this.router.navigate([''], { relativeTo: this.route.parent });
    });
  }
}
