import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'advanced-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './advanced-page.component.html',
  styles: ``
})
export class AdvancedPageComponent {

  private _formBuilder = inject(FormBuilder);

  public formGroup: FormGroup = this._formBuilder.group({
    doYouPayAttentionToClasses: [false],
    doYouSubmitYourAssignmentsOnTime: [false],
    missingClasses: [false],
    observations: ['', Validators.required],
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
