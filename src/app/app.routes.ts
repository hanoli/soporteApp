import { Router, RouterModule, Routes } from "@angular/router";
import { IngresaclienteComponent } from "./components/altas/ingresaCliente/ingresacliente.component";
import { IngresaesquipoComponent } from "./components/altas/ingresaEquipo/ingresaesquipo.component";
import { ClientesComponent } from "./components/clientes/clientes/clientes.component";
import { FoliosSeleccionadosComponent } from "./components/folios/folios-seleccionados/folios-seleccionados.component";
import { FoliosComponent } from "./components/folios/folios/folios.component";
import { HomeComponent } from "./components/home/home.component";

const APP_ROUTES: Routes = [
{ path: 'home', component:HomeComponent},
{ path: 'folios', component:FoliosComponent},
{ path: 'clientes', component:ClientesComponent},
{ path: 'ingresaEquipo', component:IngresaesquipoComponent},
{ path: 'ingresaCliente', component:IngresaclienteComponent},
{ path: 'foliosSeleccionados', component:FoliosSeleccionadosComponent},
{ path: 'ingresaCliente/:id', component:IngresaclienteComponent},
{path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});