import { Injectable } from '@angular/core';

export class Sound {
  id: number;
  file: string;
}

const SOUNDS: Sound[] = [
  {id: 1, file: '../../../assets/sound/s_01.mp3'},
  {id: 2, file: '../../../assets/sound/s_02.mp3'},
  {id: 3, file: '../../../assets/sound/s_03.mp3'},
  {id: 4, file: '../../../assets/sound/s_04.mp3'}
];

@Injectable()
export class SoundService {
  private _selectedValue: Sound;
  private _selectedValueBeat: Sound;
  private _audio: HTMLAudioElement;
  private _recording: string;
  private _sound: number;
  private _min: number;
  private _max: number;

  constructor() {
    this._sound = 1;
    this._min = 1;
    this._max = 4;
    this._selectedValue     = SOUNDS[1];
    this._selectedValueBeat = SOUNDS[3];
  }

  get selectedValue(): Sound {
    return this._selectedValue;
  }

  get selectedValueBeat(): Sound {
    return this._selectedValueBeat;
  }

  set selectedValue(value: Sound) {
    this._selectedValue = value;
  }

  get recording(): string {
    return this._recording;
  }

  set recording(value: string) {
    this._recording = value;
  }

  get sound(): number {
    return this._sound;
  }

  set sound(value: number) {
    this._sound = value;
    this._selectedValue = SOUNDS[value - 1];
  }

  public getValues(): Sound[] {
    return SOUNDS;
  }

  public createAudioInstance(path: string): void {
    this._audio = new Audio(path);
  }

  get min(): number {
    return this._min;
  }

  get max(): number {
    return this._max;
  }
}
