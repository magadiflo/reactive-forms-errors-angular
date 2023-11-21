import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-control-error',
  standalone: true,
  imports: [],
  templateUrl: './control-error.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlErrorComponent {
  public textError: string = '';

  @Input() set error(value: string) {
    if (value !== this.textError) {
      this.textError = value;
      this.cdr.detectChanges();
    }
  }

  constructor(private cdr: ChangeDetectorRef) { }
}
