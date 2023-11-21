import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormSubmitDirective } from '../../../directives/form-submit.directive';
import { ControlErrorsDirective } from '../../../directives/control-errors.directive';
import { qualifyingValidator } from '../../../utils/custom-validators';
import { QualifyingsService } from '../../../services/qualifyings.service';

@Component({
  selector: 'advanced-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormSubmitDirective,
    ControlErrorsDirective,
  ],
  templateUrl: './advanced-page.component.html',
  styles: ``
})
export class AdvancedPageComponent {

  private _formBuilder = inject(FormBuilder);
  private _qualifyingsService = inject(QualifyingsService);

  public formGroup: FormGroup = this._formBuilder.group({
    doYouPayAttentionToClasses: [false],
    doYouSubmitYourAssignmentsOnTime: [false],
    missingClasses: [false],
    observations: ['', [Validators.required], [qualifyingValidator(this._qualifyingsService)]], //qualifyingValidator, es una validación asíncrona. Las validaciones asíncronas van en otro array.
    dataFather: this._formBuilder.group({
      names: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    }),
    dataMother: this._formBuilder.group({
      names: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    }),
  });

  public saveData(): void {
    console.log(this.formGroup.value);
    this.formGroup.markAllAsTouched();
  }

}
