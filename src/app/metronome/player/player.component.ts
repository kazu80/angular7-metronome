import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-player',
  template: ``,
  styleUrls: []
})
export class PlayerComponent implements OnInit, OnChanges {
  context: AudioContext;
  soundSource: AudioBufferSourceNode;
  soundGain: GainNode;
  analyser: AnalyserNode;
  loop: boolean;
  volume: number;

  soundArray: Array<any>;

  @Input() playerName: string;
  @Input() url: string;
  @Input() play: number;

  @Output() loadedURL: EventEmitter<any> = new EventEmitter();
  @Output() playEnd: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.volume = 5;
    this.soundArray = [];
  }

  ngOnInit() {
    // @ts-ignore
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();

    const sounds = [
      '../../../../assets/sound/staging/open01.mp3',
      '../../../../assets/sound/staging/open02.mp3',
      '../../../../assets/sound/staging/open03.mp3',
      '../../../../assets/sound/staging/open03.mp3'
    ];

    sounds.forEach((url, key) => this._loadBufferFromURL(url, (buffer) => {
      this.initialSound (key, buffer, this.volume * 0.1);
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('play') && changes.play.currentValue) {
      this._play(changes.play.currentValue);
    }
  }

  private initialSound (name, buffer, gain) {
    this.soundSource = this.context.createBufferSource ();
    this.soundGain   = this.context.createGain ();
    this.analyser    = this.context.createAnalyser ();

    this.soundSource.buffer = buffer;
    this.soundSource.loop = false;
    this.soundGain.gain.value = gain;

    this.analyser.connect (this.context.destination);
    this.soundGain.connect (this.analyser);
    this.soundSource.connect (this.soundGain);

    this.soundSource.onended = (e) => {
      this.initialSound (name, buffer, this.volume * 0.1);
    };

    this.soundArray.push(this.soundSource);
  }

  private _loadBufferFromURL (url, callback) {
    const request = new XMLHttpRequest ();
    request.open ('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
      this.context.decodeAudioData (request.response,
        (buffer) => {
          if (!buffer) {
            alert ('error decoding file data: ' + url);
            return;
          }

          this.loadedURL.emit({'playerName': this.playerName});

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

  private _play (num) {

    let sound;
    switch (num) {
      case 1:
        sound = this.soundArray[3];
        break;
      case 2:
        sound = this.soundArray[2];
        break;
      case 3:
        sound = this.soundArray[1];
        break;
      case 4:
        sound = this.soundArray[0];
        break;
    }

    sound.start (0);
  }
}
