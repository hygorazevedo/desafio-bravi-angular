import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'clientes', 
    pathMatch: 'full'
  },
  {
    path: 'clientes',
    loadChildren: () => import('./modules/cliente/cliente.module').then(i => i.ClienteModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
