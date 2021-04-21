import { Component, OnInit } from '@angular/core';

import {Folio} from '../../../interface/Folio';
import {Router} from "@angular/router"; 
import { FolioService } from '../../../servicios/folio.service';

@Component({
  selector: 'app-folios',
  templateUrl: './folios.component.html',
  styleUrls: ['./folios.component.css']
})
export class FoliosComponent implements OnInit {
  
  folios: Folio[];
  constructor(private router: Router,private folioService: FolioService) { }

  ngOnInit(): void {
    this.folioService.getFolios().subscribe(
      folios => this.folios = folios
   );   
  }



  

}


