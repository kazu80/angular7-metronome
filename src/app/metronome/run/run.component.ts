import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Sound, SoundService} from '../../service/sound.service';
import {TempoService} from '../../service/tempo.service';
import {BeatService} from '../../service/beat.service';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit {
  context: AudioContext;
  soundSourceBeat: AudioBufferSourceNode;
  soundSourceTempo: AudioBufferSourceNode;
  soundSource: AudioBufferSourceNode;
  soundGain: GainNode;
  analyser: AnalyserNode;
  loop: boolean;
  volume: number;
  sound: Sound;
  interval: any;
  tempo: number;
  button: string;
  beat: number;

  @Output() playBeat: EventEmitter<{ value: string }> = new EventEmitter();

  constructor(
    private soundService: SoundService,
    private beatService: BeatService,
    private tempoService: TempoService
  ) {
    this.volume = 5;
    this.tempo = this.tempoService.tempo;
  }

  ngOnInit() {
    // @ts-ignore
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
    this.button  = 'inactive';
  }

  onClick() {
    // ボタンの表示切り替え
    this.button = this.button === 'active' ? 'inactive' : 'active';

    // 実施
    switch (this.button) {
      case 'active':
        this._metronomePlay();
        break;
      case 'inactive':
        this._metronomeStop();
        break;
    }
  }

  private _metronomePlay() {
    // Sound設定
    const beatSoundURL  = this.soundService.selectedValueBeat.file;
    const tempoSoundURL = this.soundService.selectedValue.file;

    // テンポ設定
    this.tempo = this.tempoService.tempo;

    // ビート設定
    const beatCount: number = this.beatService.selectedValue;

    // 実行
    let count: any = 1;
    this.interval  = setInterval(() => {
      // 再生
      try {
        count % beatCount === 0 ? this._playBeat(beatSoundURL) : this._playTempo(tempoSoundURL);
      } catch (e) {
        this._metronomeStop();
        this.button = 'inactive';
        console.warn('got error!', e);
      }

      count++;

      // tempo counter
      // this.counterService.inclementCount();

      // 波紋エフェクト用のカスタムイベント発火
      this.playBeat.emit({ value: 'foo'});

    }, 60 * 1000 / this.tempo);
  }

  private _metronomeStop() {
    clearInterval(this.interval);

    this.soundSourceTempo = undefined;
  }

  private _playBeat (URL) {
    if (this.soundSourceBeat === undefined) {

      this._loadBufferFromURL(URL, (buffer) => {
        this.initialSound ('beat', buffer, this.volume * 0.1);

        this.soundSourceBeat.start (0);
      });
    } else {
      this.soundSourceBeat.start (0);
    }
  }

  private _playTempo (URL) {
    if (this.soundSourceTempo === undefined) {

      this._loadBufferFromURL(URL, (buffer) => {
        this.initialSound ('tempo', buffer, this.volume * 0.1);

        this.soundSourceTempo.start (0);
      });
    } else {
      this.soundSourceTempo.start (0);
    }
  }

  private _loadBufferFromURL (url, callback) {
    const request = new XMLHttpRequest ();
    request.open ('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
      this.context.decodeAudioData (request.response,
        function (buffer) {
          if (!buffer) {
            alert ('error decoding file data: ' + url);
            return;
          }

          callback (buffer);
        },
        function (error) {
          console.error ('decodeAudioData error', error);
        }
      );
    };

    request.onerror = function (e) {
      console.error ('BufferLoader: XHR error:', e);
    };

    request.send ();
  }

  private initialSound (kind, buffer, gain) {
    this.soundSource = this.context.createBufferSource ();
    this.soundGain   = this.context.createGain ();
    this.analyser    = this.context.createAnalyser ();

    this.soundSource.buffer = buffer;

    if (this.loop) {
      this.soundSource.loop = true;
    }

    this.soundGain.gain.value = gain;

    this.analyser.connect (this.context.destination);
    this.soundGain.connect (this.analyser);
    this.soundSource.connect (this.soundGain);

    this.soundSource.onended = (e) => {
      /*
      this.play = false;
      this.stop = false;

      this.dispatchEvent (new CustomEvent ('ended'));

      // if set callback method
      if (this.onend) {
        this.onend (e);
      }
      */

      this.initialSound (kind, buffer, this.volume * 0.1);
    };

    switch (kind) {
      case 'beat':
        this.soundSourceBeat = this.soundSource;
        break;
      case 'tempo':
        this.soundSourceTempo = this.soundSource;
        break;
    }

    // this.analyser.fftSize = this.fftSize;

    // get buffer length for analyze
    // this.bufferLength = this.bufferLength || this.analyser.frequencyBinCount;

    // create unit array for analyze
    // this.dataWave = new Uint8Array (this.bufferLength);

    // SVG
    // this._drawSVG (this.bufferLength, this.dataWave);

    // Fire Event
    // this._eventSVG ();
  }
}
