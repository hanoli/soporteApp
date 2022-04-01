import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { Cliente } from 'src/app/interface/cliente';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080/'
    })

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get('api/lista').pipe(
      map(response => response as Cliente[])
    );
  }

  creaCliente(cliente:Cliente):Observable<Cliente>{
    console.log('Se recibe cliente con apellido parterno ' + cliente.apellidoMat)
    console.log('Se recibe cliente con id ' + cliente.id)
    return this.http.post<Cliente>('api/guardar',cliente,{headers:this.httpHeaders})
  }

  borraCliente(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>('api/eliminar/'+id,{headers:this.httpHeaders})
  }

  getCliente(id:number): Observable<Cliente> {
    return this.http.get<Cliente>('api/idCliente/'+id,{headers:this.httpHeaders})
  }

  updateCliente(cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>('api/actualizar/'+cliente.id,cliente,{headers:this.httpHeaders})

  }
  


}
