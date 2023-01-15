import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteCreateComponent } from './cliente-create/cliente-create.component';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { ClienteEditComponent } from './cliente-edit/cliente-edit.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';

const routes: Routes = [
  {
    path: '', 
    component: ClienteListComponent
  },
  {
    path: 'new',
    component: ClienteCreateComponent
  },
  {
    path: 'details',
    component: ClienteDetailComponent
  },
  {
    path: ':identificador/edit',
    component: ClienteEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
