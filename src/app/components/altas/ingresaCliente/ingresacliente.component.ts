import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {Cliente} from '../../../interface/Cliente';
import {Router, ActivatedRoute} from "@angular/router"; 
import { ClientesService } from '../../../servicios/clientes.service';
import swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IdClientesService } from 'src/app/servicios/id-clientes.service';

@Component({
  selector: 'app-ingresacliente',
  templateUrl: './ingresacliente.component.html'
})
export class IngresaclienteComponent implements OnInit {
  item:boolean;
  clientes: Cliente[];
  cliente:Cliente = new Cliente()
  bsModalRef: BsModalRef;


  constructor(private router: Router,private activatedRoute:ActivatedRoute,private clienteService: ClientesService,private bsModalService: BsModalService, private idClienteService : IdClientesService) { }

  ngOnInit(): void {
    this.item=false;
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
      );
      
  }

  public creaCliente():void{
    this.clienteService.creaCliente(this.cliente).subscribe(
      
      response => 
      {
        swal.fire('Exito','Registro guardado con exito','success')
        this.item=false
      this.clienteService.getClientes().subscribe(
        clientes => this.clientes = clientes
        );
      }
    )
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
    
            this.clienteService.borraCliente(cliente.id).subscribe(
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

      seleccionar(cliente:Cliente):void{
         this.idClienteService.disparadorIdCliente.emit(cliente)
         this.onClose();
      }

  onClose(){
    
    this.bsModalService.hide();
   }

   cancelar(){
    this.item=false    
   }

   getItem(e:any){
    
    if(this.item==false){
      this.item=true
    }else{
      this.item=false
    }
    }

cargaCliente(cliente:Cliente):void{
    this.clienteService.getCliente(cliente.id).subscribe( (cliente) => this.cliente = this.cliente)
    this.cliente = cliente;
 }


 actualizaCliente():void{
  this.clienteService.updateCliente(this.cliente).subscribe(
      
    response => 
    {
      swal.fire('Exito','Registro actualizado con exito','success')
    //  this.item=false
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
      );
    }
  )
 }



}
