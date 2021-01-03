import { Router, RouterModule, Routes } from "@angular/router";
import { IngresaesquipoComponent } from "./components/altas/ingresaesquipo/ingresaesquipo.component";
import { ClientesComponent } from "./components/clientes/clientes/clientes.component";
import { FoliosComponent } from "./components/folios/folios/folios.component";
import { HomeComponent } from "./components/home/home.component";

const APP_ROUTES: Routes = [
{ path: 'home', component:HomeComponent},
{ path: 'folios', component:FoliosComponent},
{ path: 'clientes', component:ClientesComponent},
{ path: 'ingresaEquipo', component:IngresaesquipoComponent},
{path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});