import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import {Cliente} from '../../../interface/Cliente';
import {Router, ActivatedRoute} from "@angular/router"; 
import { ClientesService } from '../../../servicios/clientes.service';
import swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IdClientesService } from 'src/app/servicios/id-clientes.service';
import { MatTableDataSource } from '@angular/material/table';
//import { FormGroup, FormControl,Validators  } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {FormGroup,FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';



@Component({
  selector: 'app-ingresacliente',
  templateUrl: './ingresacliente.component.html',
  styleUrls: ['./ingresacliente.component.css']
})
export class IngresaclienteComponent implements OnInit {
  item:boolean;
  clientes: Cliente[];
  cliente:Cliente = new Cliente()
  bsModalRef: BsModalRef;
  descripcionAlta:String;
  btnGuardar:boolean;
  pageIndex:number;
  pageSize:number = 5;
  length:number;
 
  displayedColumns: String[] = ['select','nombre','paterno','materno','direccion','telefono','correo','eliminar','editar'];//variables que se usan para armar la tabla con angular material
  dataSource = new MatTableDataSource<Cliente>();

  constructor(
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private clienteService: ClientesService,
    private bsModalService: BsModalService, 
    private idClienteService : IdClientesService) { }

    @ViewChild(MatPaginator) 
    paginator:MatPaginator;

  ngOnInit(): void {
    this.item = false;
    this.btnGuardar = false;
    this.descripcionAlta = "Alta de cliente";
    /*this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
      );*/
      this.clienteService.getClientes().subscribe(
        clientes => {  
         this.dataSource = new MatTableDataSource();  
        this.dataSource.data = clientes;
        this.length = clientes.length;
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource.data);
        //this.dataSource.sort = this.sort;
        console.log(this.dataSource.data);
       
       });
      
  }



  formCliente = new FormGroup({
    nombre: new FormControl(''),
    apellidoPat: new FormControl(''),
    apellidoMat: new FormControl(''),
    direccion : new FormControl(''),
    telefono: new FormControl('',Validators.max[10]),
    correo: new FormControl('',[Validators.required,Validators.email])
   // emailFormControl : new FormControl('', [Validators.required, Validators.email])
   
    
  });

  

  get f(){

    return this.formCliente.controls;

  }

  clear() {
    this.formCliente.reset();
    this.clienteService.getClientes().subscribe( clientes => this.clientes = clientes);
  }


  public creaCliente():void{

    this.clienteService.creaCliente(this.cliente).subscribe(
      response => 
      {
        swal.fire('Exito','Registro guardado con exito','success')
      //  this.item=false;
       this.formCliente.reset();
      this.clienteService.getClientes().subscribe(
        //clientes => this.clientes = clientes
        clientes => {  
          this.dataSource = new MatTableDataSource();  
         this.dataSource.data = clientes;
         this.length = clientes.length;
         this.dataSource.paginator = this.paginator;
         console.log(this.dataSource.data);
         //this.dataSource.sort = this.sort;
         console.log(this.dataSource.data);
        
        });
        //);
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
                /*this.dataSource = new MatTableDataSource();  
              //    this.dataSource = new MatTableDataSource();  
                this.clientes = this.clientes.filter(cli => cli !== cliente)
                this.dataSource = this.clientes;*/
                
                
                swal.fire(
                  'Eliminado!',
                  'Registro borrado con exito',
                  'success'
                )


                this.clienteService.getClientes().subscribe(
                  //  clientes => this.clientes = clientes
                  clientes => {  
                    this.dataSource = new MatTableDataSource();  
                   this.dataSource.data = clientes;
                   this.length = clientes.length;
                   this.dataSource.paginator = this.paginator;
                   console.log(this.dataSource.data);
                   //this.dataSource.sort = this.sort;
                   console.log(this.dataSource.data);
                  
                  });

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
    this.descripcionAlta = "Alta de cliente";
    this.btnGuardar = false;
    this.cliente.id=null;
    this.item=false;
    this.formCliente.reset();
    this.clienteService.getClientes().subscribe( 
     // clientes => this.clientes = clientes
     clientes => {  
      this.dataSource = new MatTableDataSource();  
     this.dataSource.data = clientes;
     this.length = clientes.length;
     this.dataSource.paginator = this.paginator;
     console.log(this.dataSource.data);
     //this.dataSource.sort = this.sort;
     console.log(this.dataSource.data);
    
    });
      //);
   }

   

   getItem(e:any){
    
    if(this.item==false){
      this.item=true
    }else{
      this.item=false
    }
    }

cargaCliente(cliente:Cliente):void{
    this.descripcionAlta = "Edicion de cliente";
    this.btnGuardar = true;
    this.item=true;
    this.clienteService.getCliente(cliente.id).subscribe( (cliente) => this.cliente = this.cliente)
    this.cliente = cliente;
 }


 actualizaCliente():void{
  
  this.descripcionAlta = "Alta de cliente";
  this.btnGuardar = false;
  this.item=false;
  this.clienteService.updateCliente(this.cliente).subscribe(
      
    response => 
    {
      swal.fire('Exito','Registro actualizado con exito','success')
   
      this.clienteService.getClientes().subscribe(
     clientes => {  
     this.dataSource = new MatTableDataSource();  
     this.dataSource.data = clientes;
     this.length = clientes.length;
     this.dataSource.paginator = this.paginator;
    });
  
    }
 
  )
  
  this.formCliente.reset(); 

 }



}
