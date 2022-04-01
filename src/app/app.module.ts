import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
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
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { FoliosSeleccionadosComponent } from './components/folios/folios-seleccionados/folios-seleccionados.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    FoliosComponent,
    IngresaesquipoComponent,
    ClientesComponent,
    IngresaclienteComponent,
    FoliosSeleccionadosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    MatSliderModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatCheckboxModule,
    MatFileUploadModule,
    MatIconModule,
    MatProgressBarModule,
    MatTabsModule,
    MatSelectModule,
    

    APP_ROUTING,
    
    BrowserAnimationsModule

  ],
  providers: [
    ClientesService,
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
