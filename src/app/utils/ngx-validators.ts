import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

const VALIDATOR_MESSAGE_DEFAULT = {
  required: 'Este campo es requerido',
  email: 'Ingrese un email válido',
  max: 'Excede el valor máximo, max:${max} valor actual:${current}',
}

export class NgxValidators {

  public static required(message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error = Validators.required(control);
      return error ? { required: this._getMessage('required', message) } : null;
    }
  }

  public static email(message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const error = Validators.email(control);
      return error ? { email: this._getMessage('email', message) } : null;
    }
  }

  public static max(max: number, message?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const maxFunction = Validators.max(max);
      const error = maxFunction(control);
      return error ? { max: this._getMessage('max', message, [{ max: 12, current: 18 }]) } : null;
    }
  }

  private static _getMessage(validator: keyof typeof VALIDATOR_MESSAGE_DEFAULT,
    message?: string, paramsMessage?: { [key: string]: unknown }[]) {

    if (message) return message;

    let messageControl = VALIDATOR_MESSAGE_DEFAULT[validator];
    const existParams = paramsMessage && paramsMessage.length > 0;

    if (existParams) {
      paramsMessage.forEach(params => {
        Object.keys(params)
          .filter(key => params[key])
          .forEach(key => {
            messageControl = messageControl.replace(`\${${key}}`, params[key]!.toString());
          });
      });
    }

    return messageControl;
  }

}
