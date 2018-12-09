import { Injectable } from '@angular/core';

export class Beat {
  id: number;
  beat: number;
}

const BEATS: Beat[] = [
  {id: 1, beat: 1},
  {id: 2, beat: 2},
  {id: 3, beat: 3},
  {id: 4, beat: 4},
  {id: 5, beat: 5},
  {id: 6, beat: 6},
  {id: 7, beat: 7},
  {id: 8, beat: 8}
];

@Injectable({
  providedIn: 'root'
})
export class BeatService {
  private _selectedValue: Beat;
  private _min: number;
  private _max: number;
  private _beat: number;

  constructor() {
    this._min = 1;
    this._max = 8;
    this._selectedValue = BEATS[3];
  }

  getValues(): Beat[] {
    return BEATS;
  }

  get selectedValue(): number {
    return this._selectedValue.beat;
  }

  set selectedValue(beat: number) {
    this._selectedValue = BEATS[beat - 1];
  }

  get min(): number {
    return this._min;
  }

  get max(): number {
    return this._max;
  }
}
