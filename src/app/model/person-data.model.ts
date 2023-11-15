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
