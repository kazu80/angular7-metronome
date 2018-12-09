import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempoService {
  private _min: number;
  private _max: number;
  private _tempo: number;
  private _animation: string;

  constructor() {
    this._min = 60;
    this._max = 240;
    this._tempo     = 120;
    this._animation = 'stop';
  }

  get tempo(): number {
    return this._tempo;
  }

  set tempo(value: number) {
    this._tempo = value;
  }

  get animation(): string {
    return this._animation;
  }

  set animation(value: string) {
    this._animation = value;
  }

  get min(): number {
    return this._min;
  }

  get max(): number {
    return this._max;
  }

  public inclementTempo(): void {
    this._tempo = this._tempo + 1;
  }

  public declementTempo(): void {
    this._tempo = this._tempo - 1;
  }
}
