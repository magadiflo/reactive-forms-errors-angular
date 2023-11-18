import { Directive } from '@angular/core';

@Directive({
  selector: '[formControl], [formControlName]',
  standalone: true
})
export class ControlErrorsDirective {

  constructor() { }

}
