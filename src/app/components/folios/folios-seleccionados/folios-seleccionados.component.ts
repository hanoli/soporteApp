import { Component, OnInit } from '@angular/core';
import { Folio } from 'src/app/interface/Folio';
import { FolioService } from 'src/app/servicios/folio.service';
import { IdClientesService } from 'src/app/servicios/id-clientes.service';
import {Router} from "@angular/router"; 
import { MatTableDataSource } from '@angular/material/table';
import { FolioAprobadosModel } from 'src/app/interface/FoliosAprobadosModel';

@Component({
  selector: 'app-folios-seleccionados',
  templateUrl: './folios-seleccionados.component.html',
  styleUrls: ['./folios-seleccionados.component.css']
})
export class FoliosSeleccionadosComponent implements OnInit {
  [x: string]: any;

  array : Array <any> = [];
  folio:Folio = new Folio()
  folios: Array <Folio> = [];
  element: any;
  displayedColumns: String[] = ['folio','fecha','cliente','tipoEquipo','marca','modelo','numSerie','aprobado'];//variables que se usan para armar la tabla con angular material
  dataSource = new MatTableDataSource<FolioAprobadosModel>();

  constructor(
    private router: Router,
    private idClienteService : IdClientesService,
    private folioService: FolioService

  ) {


  /*  this.idClienteService.disparadorIdCliente.subscribe(data =>{
      console.log('Recibiendo datos del disparador..',data);
     // this.listaData.push(data);
      
      this.folios.splice(0, this.folios.length);//Limpia el array
     for (let i =0;i< data.length;i++) {
      this.folios.push(data.at(i));
    } 
  
  });*/

 
    /*  for (let i =0;i< data.length;i++) {
     //   console.log('**data.at**');
       // console.log(data.at(i));
        
        const element = data.at(i);
      //  console.log('**element**');
        //console.log(element);
       // console.log('**element.folio**');
       // console.log(element.folio);
        this.array.push(element);
       }*/

//Recorro Array
/*for (let i =0;i< this.array.length;i++) {
  console.log('Dato' + this.array.)
  const element = this.array[i];
  console.log(element.folio);
 }*/
 
 //this.foliossacaDatos(this.folios)
 //this.sendFolios(this.folios);


   

   // console.log('Datos del array folios')
   // console.log(this.folios)

   }

  public listaData:Array<any> = [];

  ngOnInit(): void {

    this.folioService.getFoliosAprobados().subscribe(
      x => {  
       this.dataSource = new MatTableDataSource();  
       this.dataSource.data = x;  
       this.dataSource.sort = this.sort;
      // console.log(this.dataSource.data);
     });

  }


  foliossacaDatos(folios: Folio[]) {
    console.log('Llegue a foliossacaDatos ' + this.folios.length)
    
    for (let i =0;i< this.folios.length;i++) {
      this.element = this.folios[i];
       console.log(this.element.folio);
      this.array.push(this.element); 
      
     }

   
  }


sacaDatos(){
  console.log('Llegue a sacaDatos ' + this.array.length)

  //this.folios.forEach(element => console.log(element));
  /*for (let i =0;i< this.array.length;i++) {
    console.log('Dato' + this.array[i])
    const element = this.array[i];
    console.log(element.folio);
   }*/
}






}

