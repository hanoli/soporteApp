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
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import swal from 'sweetalert2';
import * as internal from 'events';
import { DomSanitizer } from '@angular/platform-browser';
import { FileModel } from 'src/app/interface/FileModel';
import {FormGroup,FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-ingresaesquipo',
  templateUrl: './ingresaesquipo.component.html',
  styleUrls: ['./ingresaesquipo.component.css'],
  providers: [DatePipe]
})
export class IngresaesquipoComponent implements OnInit {

selectedFiles: FileList;
progressInfo = []
fileName = "";
message = '';


  dataFile:FileModel = new FileModel();
 folio:Folio = new Folio()
 cliente:Cliente = new Cliente()
 date = new Date();
 fecha:String;
 selectedTipoEquipo:TipoEquipo = {id:0,tipoEquipo:''};
 selectedMarca:Marca = {id:0,marca:''};
 tipoEquipo: TipoEquipo[];
 marca: Marca[];
 cargaImagen:Boolean;
  fileInfos: Observable<any>;


  formFolio = new FormGroup({
    nombre:new FormControl(''),
    tipoEquipo: new FormControl(''),
    marca: new FormControl(''),
    modelo: new FormControl(''),
    numSerie: new FormControl('',Validators.max[10]),
    comentarios:new FormControl('')
   
    
  });

  constructor(
    private router: Router,
    private folioService: FolioService,
    private clienteService: ClientesService,
    private bsModalService: BsModalService, 
    private idClienteService : IdClientesService,
    private ingresaEquipoService: IngresaEquipoService,
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer
    ) {
      this.fecha = this.datePipe.transform(this.date, 'yyyy-MM-dd');
     }

     imagenPrevia: any;
     files: any = []
     loading: boolean;
 
  itemMonitor:boolean;
  itemCargador:boolean;
  bsModalRef: BsModalRef;

  idCliente:number;
  nombreCliente:String;
  apellidoPatCliente:String;
  apellidoMatCliente:String;
  numFolio:String="1";
  folioEnd:number;
  verSeleccion: String;
  verSeleccionMarca: String;

  ngOnInit(): void {
    this.cargaImagen=false;
    this.nombreCliente="";
    this.cliente.id=null;
    this.apellidoPatCliente="";
    this.apellidoMatCliente="";
    
    this.tipoEquipo = this.ingresaEquipoService.getTipoEquipo();
    this.marca = this.ingresaEquipoService.getMarca();
    this.itemMonitor=false;
    this.itemCargador=false;
    this.idClienteService.disparadorIdCliente.subscribe(data =>{
      console.log('Recibiendo id..',data);
    this.cliente.id = data.id;
    this.nombreCliente = data.nombre;
    this.apellidoPatCliente = data.apellidoPat;
    this.apellidoMatCliente = data.apellidoMat;
    }
      )

      this.folioService.getEndFolio().subscribe(
        data => {
          if (data) {
            console.log('Recibiendo folioEnd..',data);
            this.folio.folio = data+1;
        } else {
          console.log('data esta null..');
          this.folio.folio = 1;
        }
          
        }
     
     )

    
    
  }

  public creaFolio():void{
    console.log("Llegue a creaFolio: " + this.cliente.id);
    console.log("Comentario ingresado: " + this.folio.comentarios);

    this.folio.cliente = this.cliente;
    this.folio.fecha = this.date;
  //  this.folio.folio = this.folio.folio;
    this.folio.tipoEquipo = this.verSeleccion;
    this.folio.marca =  this.verSeleccionMarca;
    
    this.folioService.creaFolio(this.folio).subscribe(
     // response => this.router.navigate(['/folios'])
     response => {
      swal.fire({
        title: 'Confirmacion',
        text: "¿Desea cargar imagenes para el folio " + this.folio.folio+ " ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.cargaImagen=true;
          this.formFolio.reset();
        }else{
          this.formFolio.reset();
          this.ngOnInit();
        }
      })
     }
      
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

  
actualizarBoolean(){
  this.ngOnInit();
  
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
  this.bsModalRef = this.bsModalService.show(IngresaclienteComponent,{class:"modal-lg"});
}


selectFiles(event) {
  this.progressInfo = [];
  //Validación para obtener el nombre del archivo si es uno solo
  //En caso de que sea >1 asigna a fileName length
  event.target.files.length == 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + " archivos";
  this.selectedFiles = event.target.files;
  
}


uploadFiles() {
  this.message = '';
  for (let i = 0; i < this.selectedFiles.length; i++) {
    console.log(this.selectedFiles[i].name);
    this.getBase64(this.selectedFiles[i]).then((res: any) => {
      this.upload(i, res, this.selectedFiles[i].name);
    })
   
  }
}


upload(index, file, nameFile) {

  this.progressInfo[index] = { value: 0, fileName: nameFile };
  this.dataFile.folio = this.folio.folio.toString();
  this.dataFile.base64 = file;
  this.dataFile.nameFile = nameFile;
  
  
  this.folioService.upload(this.dataFile).subscribe(
    event => {
      console.log('event in upload: ' + event.message);
      if (event.message === '100') {
        this.progressInfo[index].value = 100;
        this.fileName = nameFile;
        this.message = 'Se agregaron las imagenes al folio ' + this.folio.folio;
      }else{
        this.progressInfo[index].value = 0;
      }
     

    },
    err => {
      this.progressInfo[index].value = 0;
      this.message = 'No se puede subir el archivo ' + file.name;
    });
}

deleteFile(filename: string) {
  this.folioService.deleteFile(filename).subscribe(res => {
    this.message = res['message'];
    this.fileInfos = this.folioService.getFiles();
  });
}


public onFileSelected(event: any) {

  const imagen = event.target.files[0];
  console.log(imagen);
 
    this.getBase64(imagen).then((res: any) => {
      //this.imagenPrevia = res.base;
      console.log(res);

    })
  
}


loadImages = () => {
 
}

 

  getBase64 = (file: any) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  








}
