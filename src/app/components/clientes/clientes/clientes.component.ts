import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interface/cliente';
import { ClientesService } from 'src/app/servicios/clientes.service';
import {Router} from "@angular/router"; 

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private router: Router,private _clienteService:ClientesService) { }

  ngOnInit(): void {

this._clienteService.getClientes().subscribe(
clientes => this.clientes = clientes



);

  }

}
