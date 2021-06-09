import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdClientesService {
@Output() disparadorIdCliente: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
