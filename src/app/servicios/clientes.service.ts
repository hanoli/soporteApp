import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { Cliente } from 'src/app/interface/cliente';
import { CLIENTES } from '../components/clientes/clientes/clientes.json';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor() { }

getClientes(): Observable<Cliente[]>{
return of(CLIENTES);
}


}
