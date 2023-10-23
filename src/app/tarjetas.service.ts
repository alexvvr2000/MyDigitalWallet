import { Injectable } from '@angular/core';
import { Tarjeta } from './tarjeta/Tarjeta';
import { faker } from '@faker-js/faker';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TarjetasService {
  private ultimoInsert = 0;
  private mensajeria: Subject<number> = new Subject();
  public static readonly bancosPermitidos: string[] = [
    'american express',
    'carnet',
    'mastercard',
    'visa',
  ];
  constructor() {
    this.ultimoInsert = this.obtenerUltimoIndex();
  }
  mandarID(id: number): void {
    this.mensajeria.next(id);
  }
  borrarID(): void {
    this.mensajeria.next(-1);
  }
  obtenerSuscripcionIDS(): Observable<number> {
    return this.mensajeria.asObservable();
  }
  obtenerUltimoIndex(): number {
    const ultimoInsert = localStorage.getItem('ultimoInsert');
    if (ultimoInsert === null) throw new Error('No existe nada en base');
    return Number(ultimoInsert);
  }
  obtenerTarjetaMock(): number {
    var tarjetaNueva: Tarjeta = {
      numeroTarjeta: faker.finance.creditCardNumber(),
      fechaVencimiento: faker.date.future({ years: 10 }),
      marca: faker.helpers.arrayElement(TarjetasService.bancosPermitidos),
      titular: faker.person.fullName(),
    };
    localStorage.setItem(
      this.obtenerUltimoIndex().toString(),
      JSON.stringify(tarjetaNueva)
    );
    localStorage.setItem('ultimoInsert', (this.ultimoInsert + 1).toString());
    return this.ultimoInsert++;
  }
  obtenerObjeto(index: number): Tarjeta {
    const jsonString = localStorage.getItem(index.toString());
    if (jsonString === null) {
      throw new Error(`tarjeta ${index} no existe`);
    }
    const objetoNuevo = JSON.parse(jsonString);
    const nuevaTarjeta: Tarjeta = {
      numeroTarjeta: objetoNuevo.numeroTarjeta,
      fechaVencimiento: new Date(objetoNuevo.fechaVencimiento),
      marca: objetoNuevo.marca,
      titular: objetoNuevo.titular,
    };
    return nuevaTarjeta;
  }
  eliminarBase() {
    const nuevaCabeza = this.obtenerUltimoIndex();
    localStorage.clear();
    localStorage.setItem('ultimoInsert', nuevaCabeza.toString());
    this.ultimoInsert = nuevaCabeza;
  }
  obtenerCantidadTarjetas(): number {
    return localStorage.length - 1;
  }
  agregarTarjeta(nuevaTarjeta: Tarjeta): number {
    const jsonTarjeta = JSON.stringify(nuevaTarjeta);
    const nuevaCabeza = this.obtenerUltimoIndex() + 1;
    localStorage.setItem('ultimoInsert', nuevaCabeza.toString());
    localStorage.setItem(nuevaCabeza.toString(), jsonTarjeta);
    return nuevaCabeza;
  }
}
