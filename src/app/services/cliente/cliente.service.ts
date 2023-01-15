import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseUrl = Environment.ApiBaseUrl;

  constructor(private http: HttpClient) { }

  CadastrarCliente(cliente: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/cliente`, cliente);
  }

  ListarClientes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cliente`);
  }

  EditarCliente(cliente: any): Observable<any> {
    const identificador = cliente.identificador;

    var clientePut = {...cliente};
    delete clientePut.identificador;

    return this.http.put(`${this.baseUrl}/cliente/${identificador}`, clientePut);
  }

  RemoverCliente(identificador: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cliente/${identificador}`);
  }
}
