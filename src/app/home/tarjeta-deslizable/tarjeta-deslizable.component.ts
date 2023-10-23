import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Tarjeta } from 'src/app/tarjeta/Tarjeta';
import { TarjetaComponent } from 'src/app/tarjeta/tarjeta.component';

@Component({
  selector: 'app-tarjeta-deslizable',
  standalone: true,
  imports: [IonicModule, TarjetaComponent],
  template: `
    <ion-item-sliding>
      <ion-item>
        <app-tarjeta [tarjeta]="nuevaTarjeta"></app-tarjeta>
      </ion-item>
      <ion-item-options>
        <ion-item-option color="danger">Borrar</ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  `,
})
export class TarjetaDeslizableComponent implements OnInit {
  @Input() nuevaTarjeta: Tarjeta = {
    numeroTarjeta: '#### #### #### ####',
    fechaVencimiento: new Date(),
    marca: 'default',
    titular: 'Lorem Ipsum',
  };
  constructor() {}

  ngOnInit() {}
}
