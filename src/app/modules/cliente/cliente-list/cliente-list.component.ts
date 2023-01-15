import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss'],
  host: { class: 'content' }
})
export class ClienteListComponent implements OnInit {
  $clientes: Observable<any>;

  constructor(private clienteService: ClienteService, private router: Router, private route: ActivatedRoute) {
    this.$clientes = new Observable<any>();
  }
  
  ngOnInit(): void {
    this.$clientes = this.clienteService.ListarClientes();
  }

  handleCriar(): void {
    this.router.navigate(['new'], { relativeTo: this.route});
  }

  handleVisualizar(cliente: any): void {
    this.router.navigate(['details'], { relativeTo: this.route, state: { data: cliente }});
  }
}
