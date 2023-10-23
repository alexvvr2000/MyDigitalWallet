import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Tarjeta } from '../tarjeta/Tarjeta';
import { CommonModule } from '@angular/common';
import { ContenedorTarjetasDirective } from './contenedor-tarjetas.directive';
import { TarjetaItem } from './tarjeta-deslizable/TarjetaItem';
import { TarjetaDeslizableComponent } from './tarjeta-deslizable/tarjeta-deslizable.component';
import { TarjetasService } from '../tarjetas.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ContenedorTarjetasDirective,
    RouterModule,
  ],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild(ContenedorTarjetasDirective, { static: true })
  vistaTarjetas!: ContenedorTarjetasDirective;
  suscripcion: Subscription;
  constructor(private servicioTarjeta: TarjetasService) {
    this.suscripcion = this.servicioTarjeta
      .obtenerSuscripcionIDS()
      .subscribe((idNuevo: number) => {
        this.mostrarTarjeta(this.servicioTarjeta.obtenerObjeto(idNuevo));
      });
  }
  ngOnInit(): void {
    const cantidadTarjetas = 4;
    for (var i = 0; i < cantidadTarjetas; i++) {
      const nuevaTarjeta = this.servicioTarjeta.obtenerTarjetaMock();
      this.mostrarTarjeta(this.servicioTarjeta.obtenerObjeto(nuevaTarjeta));
    }
  }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }
  mostrarTarjeta(nuevaTarjeta: Tarjeta): void {
    const nuevoComponente: TarjetaItem = new TarjetaItem(
      TarjetaDeslizableComponent,
      nuevaTarjeta
    );
    const componenteRenderizado =
      this.vistaTarjetas.referenciaView.createComponent<TarjetaItem>(
        nuevoComponente.component
      );
    componenteRenderizado.instance.nuevaTarjeta = nuevoComponente.nuevaTarjeta;
  }
}
