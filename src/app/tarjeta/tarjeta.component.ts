import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Tarjeta } from './Tarjeta';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class TarjetaComponent {
  @Input() tarjeta: Tarjeta = {
    numeroTarjeta: '#### #### #### ####',
    fechaVencimiento: new Date(),
    marca: 'default',
    titular: 'Lorem Ipsum',
  };
  constructor() {}
  obtenerFechaVencimiento(): string {
    const mes: number = this.tarjeta.fechaVencimiento.getMonth();
    const year: string = this.tarjeta.fechaVencimiento
      .getUTCFullYear()
      .toString();
    return `${mes}/${year.substring(2, 4)}`;
  }
  urlLogoMarca(): string {
    return `../../assets/marcas/${this.tarjeta.marca}.svg`;
  }
}
