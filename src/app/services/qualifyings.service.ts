import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QualifyingsService {

  private _qualifyings = ['bruto', 'idiota', 'estupido'];

  checkIfQualifyingExists(value: string) {
    const existsQualifying = this._qualifyings.some(qualifying => value.search(qualifying) > -1);
    return of(existsQualifying).pipe(delay(1000));
  }
}
