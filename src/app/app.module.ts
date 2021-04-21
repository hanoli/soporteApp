import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_ROUTING } from './app.routes';

import { ClientesService } from './servicios/clientes.service';
import {HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { FoliosComponent } from './components/folios/folios/folios.component';
import { IngresaesquipoComponent } from './components/altas/ingresaEquipo/ingresaesquipo.component';
import { IngresaclienteComponent } from "./components/altas/ingresaCliente/ingresacliente.component";
import { ClientesComponent } from './components/clientes/clientes/clientes.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    FoliosComponent,
    IngresaesquipoComponent,
    ClientesComponent,
    IngresaclienteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    APP_ROUTING

  ],
  providers: [
    ClientesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
