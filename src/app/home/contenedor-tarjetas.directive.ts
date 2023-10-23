import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ContenedorTarjetas]',
  standalone: true,
})
export class ContenedorTarjetasDirective {
  constructor(public referenciaView: ViewContainerRef) {}
}
