import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interface/cliente';
import { ClientesService } from 'src/app/servicios/clientes.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

clientes:Cliente[] = [];

  constructor(private _clienteService:ClientesService) { }

  ngOnInit(): void {

this._clienteService.getClientes().subscribe(
clientes => this.clientes = clientes

);

  }

}
