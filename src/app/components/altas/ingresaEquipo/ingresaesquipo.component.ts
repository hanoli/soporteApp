import { Component, OnInit } from '@angular/core';

import {Folio} from '../../../interface/Folio';
import {Router} from "@angular/router"; 
import { FolioService } from '../../../servicios/folio.service';

@Component({
  selector: 'app-ingresaesquipo',
  templateUrl: './ingresaesquipo.component.html',
  styleUrls: ['./ingresaesquipo.component.css']
})
export class IngresaesquipoComponent implements OnInit {

 folio:Folio = new Folio()

  constructor(private router: Router,private folioService: FolioService) { }

  ngOnInit(): void {
  }

  public creaFolio():void{
    this.folioService.creaFolio(this.folio).subscribe(
      response => this.router.navigate(['/folios'])
    )
  }


}
