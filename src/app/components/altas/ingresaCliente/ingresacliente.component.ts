import { Component, OnInit } from '@angular/core';

import {Cliente} from '../../../interface/Cliente';
import {Router} from "@angular/router"; 
import { FolioService } from '../../../servicios/folio.service';


@Component({
  selector: 'app-ingresacliente',
  templateUrl: './ingresacliente.component.html'
})
export class IngresaclienteComponent implements OnInit {

  cliente:Cliente = new Cliente()

  constructor(private router: Router,private folioService: FolioService) { }

  ngOnInit(): void {
  }

  public creaFolio():void{
    this.folioService.creaFolio(this.cliente).subscribe(
      response => this.router.navigate(['/clientes'])
    )
  }

}
