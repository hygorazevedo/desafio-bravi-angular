import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteCreateComponent } from './cliente-create/cliente-create.component';
import { ClienteEditComponent } from './cliente-edit/cliente-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalClienteDeleteComponent } from './modal-cliente-delete/modal-cliente-delete.component';

@NgModule({
  declarations: [
    ClienteListComponent,
    ClienteDetailComponent,
    ClienteCreateComponent,
    ClienteEditComponent,
    ModalClienteDeleteComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class ClienteModule { }
