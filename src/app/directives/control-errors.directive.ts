import { Directive, inject, OnInit, OnDestroy, ElementRef, ComponentRef, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { EMPTY, Subject, fromEvent, merge, takeUntil } from 'rxjs';

import { ControlErrorComponent } from '../components/control-error/control-error.component';
import { FormSubmitDirective } from './form-submit.directive';
import { getFormControlError } from '../utils/functions-form';

@Directive({
  selector: '[formControl], [formControlName]', //estaremos pendientes de aquellos elementos que tienen estos atributos, ya que son precisamente estos atributos los que van a generar el error o no
  standalone: true
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
  //observations -> FormControl

  private readonly ngControl = inject(NgControl); //NgControl, es la clase base del FormControl
  private readonly form = inject(FormSubmitDirective, { optional: true }); //Instancia de la directiva FormSubmitDirectiva que nos permitirá acceder al observable submit$ definido
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly vcr = inject(ViewContainerRef); //Con viewContainerRef creamos el elemento
  private componentRef!: ComponentRef<ControlErrorComponent>;//Para crear componentes en Angular de manera dinámica necesitamos usar el ComponentRef<>

  private readonly destroy$ = new Subject<void>();
  private readonly submit$ = this.form ? this.form.sumit$ : EMPTY;
  private readonly blurEvent$ = fromEvent(this.elementRef.nativeElement, 'blur');

  constructor() {
    console.log('ControlErrorsDirective');
  }

  //merge, convierte múltiples observables en un único observable. El operador merge() es la solución a la que puede recurrir cuando tiene varios observables que producen valores de forma independiente y desea combinar su salida en un único flujo. Piense en ello como en una fusión de autopistas, donde varias carreteras se unen para formar una única carretera unificada: el tráfico (datos) de cada carretera (observable) fluye a la perfección. Ten en cuenta que merge emitirá valores tan pronto como cualquiera de los observables emita un valor.
  ngOnInit(): void {
    //Nos subscribiemos a los tres observables
    merge(this.submit$, this.blurEvent$, this.ngControl.statusChanges!)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const errorControl = getFormControlError(this.ngControl.control!);
        this.setError(errorControl);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setError(text: string) {
    if (!this.componentRef) {
      this.componentRef = this.vcr.createComponent(ControlErrorComponent);
    }
    this.componentRef.instance.error = text;
  }

}
