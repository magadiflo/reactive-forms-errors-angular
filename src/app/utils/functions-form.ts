import { AbstractControl, ValidationErrors } from "@angular/forms";

const ERRORS_DEFAULT: ValidationErrors = {
  required: 'Este campo es requerido',
  email: 'Ingrese un email válido',
}

export const getFormControlError = (abstractControl: AbstractControl): string => {
  if (!abstractControl.errors || !abstractControl.touched) return '';

  const firstErrorKey = Object.keys(abstractControl.errors)[0];

  if (abstractControl.errors[firstErrorKey] === true) { // Por ejemplo: { "required": true } que es el mensaje por defecto de Angular
    return ERRORS_DEFAULT[firstErrorKey];
  }
  return abstractControl.errors[firstErrorKey] ?? '';
}
