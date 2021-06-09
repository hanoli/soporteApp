import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interface/cliente';
import { ClientesService } from 'src/app/servicios/clientes.service';
import {Router} from "@angular/router"; 
import swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IngresaclienteComponent } from '../../altas/ingresaCliente/ingresacliente.component';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  bsModalRef: BsModalRef;
  constructor(private router: Router,private _clienteService:ClientesService,private bsModalService: BsModalService) { }

  ngOnInit(): void {
  this._clienteService.getClientes().subscribe(
  clientes => this.clientes = clientes
  );
  }

  eliminar(cliente:Cliente):void{

console.log("item de cliente: " + cliente.id)

    swal.fire({
      title: 'Confirmacion',
      text: "¿Seguro que deseas eliminar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this._clienteService.borraCliente(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal.fire(
              'Eliminado!',
              'Registro borrado con exito',
              'success'
            )
          }
        )

        
      }
    })

  }

addClient(){
  this.bsModalRef = this.bsModalService.show(IngresaclienteComponent,{class: "modal-lg"});
 
}
  



}
