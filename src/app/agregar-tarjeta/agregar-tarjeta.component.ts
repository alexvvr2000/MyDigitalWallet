import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TarjetasService } from '../tarjetas.service';
import { Tarjeta } from '../tarjeta/Tarjeta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-tarjeta',
  templateUrl: './agregar-tarjeta.component.html',
  styleUrls: ['./agregar-tarjeta.component.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class AgregarTarjetaComponent {
  FormTarjeta = new FormGroup({
    numero: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{13,19}'),
    ]),
    year: new FormControl('', [Validators.required]),
    mes: new FormControl('', [Validators.required]),
    ccv: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{3}'),
    ]),
    titular: new FormControl('', [Validators.required]),
    banco: new FormControl('', [Validators.required]),
  });
  meses: string[] = [];
  anios: string[] = [];
  constructor(
    private servicioTarjetas: TarjetasService,
    private router: Router
  ) {
    this.meses = this.obtenerMeses();
    this.anios = this.obtenerAnios();
  }
  obtenerMeses(): string[] {
    var mesesValidos: string[] = [];
    for (let i = 1; i <= 12; i++) {
      const mesActual = i.toString();
      mesesValidos.push(mesActual.padStart(2, '0'));
    }
    return mesesValidos;
  }
  obtenerAnios(): string[] {
    const anioActual: number = new Date().getFullYear();
    const anioMaximo = 30;
    var aniosValidos: string[] = [];
    for (let i = 0; i < anioMaximo; i++) {
      const anioCalculado = anioActual + i;
      aniosValidos.push(anioCalculado.toString());
    }
    return aniosValidos;
  }
  obtenerBancos(): string[] {
    return TarjetasService.bancosPermitidos;
  }
  submit(): void {
    const nuevaTarjeta: Tarjeta = {
      numeroTarjeta: this.FormTarjeta.get('numero')?.value as string,
      marca: this.FormTarjeta.get('banco')?.value as string,
      titular: this.FormTarjeta.get('titular')?.value as string,
      fechaVencimiento: new Date(
        `${this.FormTarjeta.get('year')?.value}-${
          this.FormTarjeta.get('mes')?.value
        }`
      ),
    };
    const nuevoID: number = this.servicioTarjetas.agregarTarjeta(nuevaTarjeta);
    this.servicioTarjetas.mandarID(nuevoID);
    this.router.navigateByUrl('/home');
  }
}
