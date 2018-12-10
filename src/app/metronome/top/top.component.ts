import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  playBeat: boolean;
  mode: string;

  private _el: HTMLElement;

  constructor(
    el: ElementRef
  ) {
    this._el = el.nativeElement;
  }

  ngOnInit() {
  }

  handlePlayBeat($event): void {
    this.playBeat = true;
  }

  handlePlayedBeat($event): void {
    setTimeout(() => this.playBeat = false);
  }

  handleTempoActive($event): void {
    // modeの切り替え
    this.mode = 'tempo';

    // ボタンの切り替え
    const BeatButton = this._el.querySelector('#beat-button');
    BeatButton.classList.remove('active');
    const SoundButton = this._el.querySelector('#sound-button');
    SoundButton.classList.remove('active');

    // コンテンツ部分の表示切り替え
    this.resetRangeClass();
    const content = this._el.querySelector('#content-tempo');
    content.classList.toggle('active');
  }

  handleBeatActive($event): void {
    // modeの切り替え
    this.mode = 'beat';

    // ボタンの切り替え
    const TempoButton = this._el.querySelector('#tempo-button');
    TempoButton.classList.remove('active');
    const SoundButton = this._el.querySelector('#sound-button');
    SoundButton.classList.remove('active');

    // コンテンツ部分の表示切り替え
    this.resetRangeClass();
    const content = this._el.querySelector('#content-beat');
    content.classList.toggle('active');
  }

  handleSoundActive($event): void {
    // modeの切り替え
    this.mode = 'sound';

    // ボタンの切り替え
    const BeatButton = this._el.querySelector('#beat-button');
    BeatButton.classList.remove('active');
    const TempoButton = this._el.querySelector('#tempo-button');
    TempoButton.classList.remove('active');

    // コンテンツ部分の表示切り替え
    this.resetRangeClass();
    const content = this._el.querySelector('#content-sound');
    content.classList.toggle('active');
  }

  resetRangeClass(): void {
    const ranges = this._el.querySelectorAll('.range');
    ranges.forEach((range, key, parent) => {
      range.classList.remove('active');
    });
  }
}
