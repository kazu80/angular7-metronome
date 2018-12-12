import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoiceService {
  private _play: boolean;

  get play(): boolean {
    return this._play;
  }

  set play(value: boolean) {
    this._play = value;
  }

  constructor() { }
}
