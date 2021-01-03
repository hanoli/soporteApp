import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  fechaCopy:number;

  constructor() { 

    this.fechaCopy = new Date().getFullYear();

  }

  ngOnInit(): void {
  }

}
