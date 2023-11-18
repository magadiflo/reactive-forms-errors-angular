import { Directive, ElementRef, inject } from '@angular/core';
import { fromEvent, shareReplay } from 'rxjs';

@Directive({
  selector: 'form',
  standalone: true
})
export class FormSubmitDirective {

  private readonly _host: ElementRef<HTMLFormElement> = inject(ElementRef);
  public sumit$ = fromEvent(this.element, 'submit').pipe(shareReplay(1));

  public get element() {
    return this._host.nativeElement;
  }

  constructor() {
    console.log('FormSubmitDirective');
  }

}
