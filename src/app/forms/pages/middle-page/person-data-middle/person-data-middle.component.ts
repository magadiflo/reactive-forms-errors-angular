import { Component, Input, inject, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { IPersonDataForm } from '../../../../model/person-data.model';

@Component({
  selector: 'person-data-middle',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './person-data-middle.component.html',
  styles: ``,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class PersonDataMiddleComponent implements OnInit {

  @Input({ required: true }) title: string = '';
  @Input({ required: true }) formGroupName: string = '';

  private _formBuilder = inject(NonNullableFormBuilder);
  private _parentContainer = inject(ControlContainer);

  public get parentFormGroup(): FormGroup {
    return this._parentContainer.control as FormGroup;
  }

  public get formGroupChild(): FormGroup<IPersonDataForm> {
    return this._formBuilder.group<IPersonDataForm>({
      names: this._formBuilder.control('', { validators: [Validators.required] }),
      lastNames: this._formBuilder.control('', { validators: [Validators.required] })
    });
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(this.formGroupName, this.formGroupChild);
  }

}
