import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { AgregarTarjetaComponent } from './agregar-tarjeta/agregar-tarjeta.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'nuevaTarjeta',
    component: AgregarTarjetaComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
