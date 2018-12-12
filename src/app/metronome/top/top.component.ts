import {Component, ElementRef, OnInit} from '@angular/core';
import {$e} from 'codelyzer/angular/styles/chars';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  playBeat: boolean;
  mode: string;
  speechText: string;
  speechPlay: boolean;
  soundPlayerName: string;
  soundPlayerURL: string;
  soundPlayerPlay: number;

  private _el: HTMLElement;

  constructor(
    el: ElementRef
  ) {
    this._el = el.nativeElement;
  }

  ngOnInit() {
    this.soundPlayerName = 'open01';
    this.speechPlay = false;
    this.soundPlayerURL = '../../../../assets/sound/staging/open01.mp3';

    window.addEventListener('opening-start-1', () => {
      this.soundPlayerPlay = 1;

      setTimeout(
        () => window.dispatchEvent(new Event('opening-start-2')),
        7500
      );
    });

    window.addEventListener('opening-start-2', (e) => {
      this.soundPlayerPlay = 2;
    });

    window.addEventListener('opening-start-3', (e) => {
      this.soundPlayerPlay = 3;
    });

    window.addEventListener('opening-start-4', (e) => {
      console.log('opening-start-4');
      this.soundPlayerPlay = 4;
    });

    /*
    setTimeout(() => {
      this.speechText = 'あいみょんあいみょん';
      this.speechPlay = true;
    }, 1000);
    */
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

  handleLoadedSound($event): void {

    console.log('handleLoadedSound', $event);

    if ($event.playerName === 'open01') {
      this.soundPlayerName = 'open02';
      setTimeout(() => this.soundPlayerURL = '../../../../assets/sound/staging/open02.mp3', 2000);
    }
    if ($event.playerName === 'open02') {
      console.log('foo1');
      this.soundPlayerName = 'open03';
      this.soundPlayerURL = '../../../../assets/sound/staging/open02.mp3';
    }
    if ($event.playerName === 'open03') {
      console.log('foo2');
      this.soundPlayerName = 'open04';
      this.soundPlayerURL = '../../../../assets/sound/staging/open03.mp3';
    }
  }

  handlePlayEndSound($event): void {

  }

  resetRangeClass(): void {
    const ranges = this._el.querySelectorAll('.range');
    ranges.forEach((range, key, parent) => {
      range.classList.remove('active');
    });
  }

  speechEnd(): void {
  }
}
