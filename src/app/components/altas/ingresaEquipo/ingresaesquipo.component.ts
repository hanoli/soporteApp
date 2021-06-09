import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {Folio} from '../../../interface/Folio';
import {Router} from "@angular/router"; 
import { FolioService } from '../../../servicios/folio.service';
import { ClientesService } from '../../../servicios/clientes.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ClientesComponent } from '../../clientes/clientes/clientes.component';
import { IngresaclienteComponent } from '../ingresaCliente/ingresacliente.component';
import { IdClientesService } from 'src/app/servicios/id-clientes.service';
import { DatePipe } from '@angular/common';
import { IngresaEquipoService } from 'src/app/servicios/ingresa-equipo.service';
import { TipoEquipo } from 'src/app/interface/TipoEquipo';
import { Cliente } from 'src/app/interface/Cliente';
import { Marca } from 'src/app/interface/Marca';

@Component({
  selector: 'app-ingresaesquipo',
  templateUrl: './ingresaesquipo.component.html',
  styleUrls: ['./ingresaesquipo.component.css'],
  providers: [DatePipe]
})
export class IngresaesquipoComponent implements OnInit {

 folio:Folio = new Folio()
 cliente:Cliente = new Cliente()
 date = new Date();
 fecha:String;
 selectedTipoEquipo:TipoEquipo = {id:0,tipoEquipo:''};
 selectedMarca:Marca = {id:0,marca:''};
 tipoEquipo: TipoEquipo[];
 marca: Marca[];

  constructor(
    private router: Router,
    private folioService: FolioService,
    private clienteService: ClientesService,
    private bsModalService: BsModalService, 
    private idClienteService : IdClientesService,
    private ingresaEquipoService: IngresaEquipoService,
    private datePipe: DatePipe
    ) {
      this.fecha = this.datePipe.transform(this.date, 'yyyy-MM-dd');
     }
 
  itemMonitor:boolean;
  itemCargador:boolean;
  bsModalRef: BsModalRef;

  idCliente:number;
  nombreCliente:String;
  apellidoPatCliente:String;
  numFolio:String="1";
  verSeleccion: String;
  verSeleccionMarca: String;

  ngOnInit(): void {
    
    console.log('ArrayTipoEquipo..',this.ingresaEquipoService.getTipoEquipo());
    this.tipoEquipo = this.ingresaEquipoService.getTipoEquipo();
    this.marca = this.ingresaEquipoService.getMarca();
    this.itemMonitor=false;
    this.itemCargador=false;
    this.idClienteService.disparadorIdCliente.subscribe(data =>{
      console.log('Recibiendo id..',data);
    this.cliente.id = data.id;
    this.nombreCliente = data.nombre;
    this.apellidoPatCliente = data.apellidoPat;
    }
      )
    
  }

  public creaFolio():void{
    console.log("Llegue a creaFolio: " + this.cliente.id);
    this.folio.cliente = this.cliente;
    this.folio.fecha = this.date;
    this.folio.folio = this.numFolio;
    this.folio.tipoEquipo = this.verSeleccion;
    this.folio.marca =  this.verSeleccionMarca;
    this.folioService.creaFolio(this.folio).subscribe(
      response => this.router.navigate(['/folios'])
    )
  }

  capturar(value) {
    this.verSeleccion = value;
    console.log("Se selecciono: " + this.verSeleccion)
}

capturarMarca(value) {
  this.verSeleccionMarca = value;
  console.log("Se selecciono Marca: " + this.verSeleccionMarca)
}

  


  getAlbumId(e:any, id:string){
    if(e.target.checked)    {
      this.itemMonitor=true;
        console.log(id + 'cheched');
    }else{
      this.itemMonitor=false;
        console.log(id + 'Uncheched');
    }

    console.log(this.itemMonitor);
}

getAlbumId2(e:any, id:string){
    if(e.target.checked){
        console.log(id + 'cheched');
        this.itemCargador=true;
    }else{
        console.log(id + 'Uncheched');
        this.itemCargador=false;
    }

    console.log(this.itemCargador);
}


addClient(){
  this.bsModalRef = this.bsModalService.show(IngresaclienteComponent,{class: "modal-lg"});
}

}
