import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'basic-page',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent {

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

  public get observationsField() {
    return this.formGroup.controls['observations'];
  }

  public get dataFatherField() {
    return this.formGroup.controls['dataFather'] as FormGroup;
  }

  public get dataMotherField() {
    return this.formGroup.controls['dataMother'] as FormGroup;
  }

}
