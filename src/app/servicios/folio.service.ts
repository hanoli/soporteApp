import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Folio } from '../interface/Folio';
import { TipoEquipo } from '../interface/TipoEquipo';


@Injectable({
  providedIn: 'root'
})
export class FolioService {

private httpHeaders = new HttpHeaders({
'Content-Type': 'application/json',
'Accept': 'application/json',
'Access-Control-Allow-Origin': 'http://localhost:8080/'
})

  constructor(private http: HttpClient) {
  }

  getFolios(): Observable<Folio[]> {
    return this.http.get('api/listaFolios').pipe(
      map(response => response as Folio[])
    );
  }

  creaFolio(folio:Folio):Observable<Folio>{
  console.log("JsonFolio: " + folio)
    return this.http.post<Folio>('api/guardarFolio',folio,{headers:this.httpHeaders})

  }
  
}