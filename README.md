# [Reactive Forms Avanzado - Errores de Validación, el poder de las directivas](https://www.youtube.com/watch?v=ALhaqz32WpM)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.0.

## Validators con Mensajes (NgxValidator)

Para poder ejemplificar las validaciones vamos a crear un nuevo formulario con componentes reutilizables, es decir, vamos a agrupar en un nuevo componente, un grupo de campos que reutilizaremos. Este ejemplo lo hemos visto en el proyecto [reactive-forms-angular](https://github.com/magadiflo/reactive-forms-angular.git) del mismo canal de LogiDev, por lo que tomaremos como referencia el de `advanced-one-page`. 

A continuación se muestra el formulario con reutilización de componentes que vamos a trabajar:

Lo primero que haremos será crear nuestros modelos para poder tipar los fomularios:

````typescript
import { FormControl } from "@angular/forms";

export interface IPersonDataForm {
  names: FormControl<string>;
  lastNames: FormControl<string>;
}

export interface IStudentMiddleForm {
  doYouPayAttentionToClasses: FormControl<boolean>,
  doYouSubmitYourAssignmentsOnTime: FormControl<boolean>,
  missingClasses: FormControl<boolean>,
  observations: FormControl<string>,
}
````

Continuamos creando un nuevo componente que será el que reutilizaremos y con el que aplicaremos el concepto de `ControlContainer`. Ese componente será `person-data-middle`:

`person-data-middle.component.html`
````html
<h6>{{ title }}</h6>
<div class="row" [formGroupName]="formGroupName">
  <div class="col-6">
    <div class="mb-3">
      <label for="names" class="form-label">Nombres</label>
      <input type="text" class="form-control" id="names" formControlName="names">
    </div>
  </div>
  <div class="col-6">
    <div class="mb-3">
      <label for="lastName" class="form-label">Apellidos</label>
      <input type="text" class="form-control" id="lastName" formControlName="lastNames">
    </div>
  </div>
</div>
````

`person-data-middle.component.ts`
````typescript
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
````

Finalmente, implementamos el formulario principal:

````html
<form [formGroup]="formGroup" (ngSubmit)="saveData()">
  <div class="section-check">
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked1"
        formControlName="doYouPayAttentionToClasses">
      <label class="form-check-label" for="flexSwitchCheckChecked1">¿Presta atención a las clases?</label>
    </div>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked2"
        formControlName="doYouSubmitYourAssignmentsOnTime">
      <label class="form-check-label" for="flexSwitchCheckChecked2">¿Presenta sus tareas a tiempo?</label>
    </div>
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked3"
        formControlName="missingClasses">
      <label class="form-check-label" for="flexSwitchCheckChecked3">¿Falta a clases?</label>
    </div>
  </div>
  <hr>
  <div class="mb-3">
    <label for="name-father" class="form-label">Observaciones:</label>
    <input type="text" class="form-control" id="name-father" formControlName="observations">
  </div>
  <hr>
  <div class="section-parents">
    <person-data-middle title="Datos del padre" formGroupName="dataFather" />
    <hr>
    <person-data-middle title="Datos de la madre" formGroupName="dataMother" />
  </div>
  <div class="col-auto">
    <button type="submit" class="btn btn-primary">Guardar</button>
  </div>
</form>
````

````typescript
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
````

Luego de eso, veremos que el formulario está funcionando correctamente, pero obviamente aún falta manejar las validaciones:

![middle page](./src/assets/01.middle-form.png)
