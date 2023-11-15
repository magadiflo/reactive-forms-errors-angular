import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { PersonDataMiddleComponent } from './person-data-middle/person-data-middle.component';
import { IStudentMiddleForm } from '../../../model/person-data.model';

@Component({
  selector: 'middle-page',
  standalone: true,
  imports: [ReactiveFormsModule, PersonDataMiddleComponent],
  templateUrl: './middle-page.component.html',
  styles: ``
})
export class MiddlePageComponent {

  private _formBuilder = inject(NonNullableFormBuilder);

  public formGroup: FormGroup = this._formBuilder.group<IStudentMiddleForm>({
    doYouPayAttentionToClasses: this._formBuilder.control(false),
    doYouSubmitYourAssignmentsOnTime: this._formBuilder.control(false),
    missingClasses: this._formBuilder.control(false),
    observations: this._formBuilder.control('', { validators: [Validators.required] })
  });

  public saveData(): void {
    console.log(this.formGroup.value);
    console.log("Formulario válido?", this.formGroup.valid);
  }

}
