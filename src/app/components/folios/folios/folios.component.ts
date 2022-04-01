import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

import {Folio} from '../../../interface/Folio';
import {Router} from "@angular/router"; 
import { FolioService } from '../../../servicios/folio.service';
import { FormGroup, FormControl,Validators, FormArray, FormBuilder  } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Cliente } from 'src/app/interface/Cliente';
import { MatSort, Sort } from '@angular/material/sort';
import { FolioModel } from 'src/app/interface/FolioModel';
import { IdClientesService } from 'src/app/servicios/id-clientes.service';
import { FolioAprobadosModel } from 'src/app/interface/FoliosAprobadosModel';
import { tap } from 'rxjs/operators';


//const DATA: Folio[] = [];
/*export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}*/

@Component({
  selector: 'app-folios',
  templateUrl: './folios.component.html',
  styleUrls: ['./folios.component.css']
})
export class FoliosComponent implements OnInit, AfterViewInit {

  formCheck = new FormGroup({
  folio: new FormControl(''),
  fecha: new FormControl(''),
  tipoEquipo: new FormControl(''),
  marca: new FormControl(''),
  modelo: new FormControl(''),
  numSerie: new FormControl('')
  });

  formFolio = new FormGroup({
    folio: new FormControl(''),
    fecha: new FormControl(''),
    tipoEquipo: new FormControl(''),
    modelo: new FormControl(''),
    fechaInicio: new FormControl(''),
    fechaFin: new FormControl(''),
    marca: new FormControl('',Validators.max[10]),
    correo: new FormControl('',[Validators.required,Validators.email])
  });

  
  pageEvent: PageEvent;
  
  pageIndex:number;
  pageSize:number = 5;
  length:number;
  sortedData: Folio[];
  folios: Folio[];
  folio:FolioModel = new FolioModel();
  selectedId: FormArray;
  @Input() array : Array <FolioAprobadosModel> = [] 
  capturaCochesId = [];
  displayedColumns: String[] = ['select','folio','fecha','cliente','tipoEquipo','marca','modelo','numSerie','exportarPDF'];//variables que se usan para armar la tabla con angular material
  dataSource = new MatTableDataSource<Folio>();
 // dataSource:any = new MatTableDataSource<any>([]);
  folioModel:FolioModel = new FolioModel();
  disabled = false;
  @ViewChildren ('checkBox') checkBox: QueryList<any> | undefined;
  checked: any[] = [];
  dataFolio: any;

  constructor(
    private router: Router,
    private folioService: FolioService,
    _fb: FormBuilder,
    private idClienteService : IdClientesService
   ) {
    this.formCheck = _fb.group({
        selectedId: new FormArray([])
      });

   }

   ngOnInit(): void {
    /*this.folioService.getFolios().subscribe(
          folios => this.dataSource.data = folios
       );*/
       this.folioService.getFolios().subscribe(
       x => {  
        this.dataSource = new MatTableDataSource();  
       this.dataSource.data = x;
       this.length = x.length;
       this.dataSource.paginator = this.paginator;
       console.log(this.dataSource.data);
       this.dataSource.sort = this.sort;
       console.log(this.dataSource.data);
      
      });
      
    }


   //Inicia Seccion para checkbox
  getCheckbox(checkbox: any){
 
    this.selectedId = (this.formCheck.controls.selectedId as FormArray);

    if(checkbox.checked){
     // console.log('El valor boleano es ' + checkbox.checked)
      this.selectedId.push(new FormControl(checkbox));//Se mete el registro activado al FormArray
    }else{
    //  console.log('El valor boleano es ' + checkbox.checked)
      let i: number = 0;
  
      this.selectedId.controls.forEach((ctrl: FormControl) => {//Recorremos el FormArray para encontrar el registro que se desactivo
        if(ctrl.value === checkbox) {
       //   console.log('Voy a eliminar un item con id ' + ctrl.value.id + ' con folio: ' + ctrl.value.folio)
          this.selectedId.removeAt(i); //Elimina el registro cuando se le desactiva el check
          return;
        }
  
        i++;
      });
    }

    
    this.array.splice(0, this.array.length);//Limpia el array
    //Recorre el FormArray y mete cada elemento seleccionado en un Array[] para poder recorrerlo en la vista
    for (let i =0;i< this.selectedId.length;i++) {
      const element = this.selectedId.at(i);
      this.array.push(element.value);
     }
  
  }

viewCheckboxTrue(){
    /*console.log("Tamaño de selectedId: " + this.selectedId.length);
    console.log('**Lo que contiene selectedId al final**');
    this.array.splice(0, this.array.length);

    for (let i =0;i< this.selectedId.length;i++) {
      const element = this.selectedId.at(i);
      this.array.push(element.value);
      console.log(this.array);
  }*/
    console.log("Llegue a viewCheckboxTrue y el tamaño de array es: " + this.array.length);
    console.log("datos: " + this.array[0].folio);

   /* for (let i =0;i< this.array.length;i++) {
      console.log(this.array[i]);
  }*/
    
    this.folioService.sendFolio(this.array).subscribe(
      response => {
        this.router.navigate(['/foliosSeleccionados'])
        this.array.splice(0, this.array.length);//Limpia el array
      }
    )
    
  
/*console.log('Tamaño del array Array in viewCheckboxTrue de componenete folios ' + this.array.length)
  this.idClienteService.disparadorIdCliente.emit(this.array);*/

}

//Termina Seccion para checkbox


@ViewChild(MatPaginator) 
paginator:MatPaginator;

@ViewChild(MatSort, {static: true}) sort!: MatSort;

loadFoliosPage(){
  this.folioService.getFolios() 
  .pipe(
    tap(()=> this.folioService.getFolios())
  )
  .subscribe(
    x => {  
     this.dataSource = new MatTableDataSource();  
    this.dataSource.data = x;  
  //   this.dataSource.sort = this.sort;
    // console.log(this.dataSource.data);
   });
}


ngAfterViewInit(){

  this.paginator.page.subscribe(
    (event) => console.log(event)
);
  
}

  get f(){
    return this.formFolio.controls;
  }


  exportaPdf(elementPDF: FolioModel){
    this.folioService.exportPdf(elementPDF).subscribe(x =>{

      const blob = new Blob([x],{type:'aplication/pdf'});

      if(window.navigator && window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(blob);
      }

      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'folio-'+elementPDF.folio+'.pdf';
      link.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));

      setTimeout(function(){
      window.URL.revokeObjectURL(data);
      link.remove();
      }, 100);
    });
  }

  busqueda(){
    this.folioService.getFolioByMarca(this.folio.marca).subscribe(
    folios => this.folios = folios
    );   

  }

  busquedaByFiltros(){
    this.folioService.getByFiltros(this.folio).subscribe(
     x => {  
      this.dataSource = new MatTableDataSource();  
      this.dataSource.data = x;  
      this.dataSource.sort = this.sort;
      console.log(this.dataSource.data);
    }
     
    );

console.log('datosTraces:' + this.dataSource)

    this.formFolio.reset();  

  }
  

}


