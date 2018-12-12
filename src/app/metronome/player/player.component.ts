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
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.hasOwnProperty('url'));
    if (changes.hasOwnProperty('url') && changes.url.currentValue !== '' ) {
      this._loadBufferFromURL(changes.url.currentValue, (buffer) => {
        this.initialSound (this.playerName, buffer, this.volume * 0.1);
      });
    }

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

      this.playEnd.emit({'name': name});
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

          console.log('emit', this.playerName);
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
        sound = this.soundArray[0];
        break;
      case 2:
        sound = this.soundArray[1];
        break;
      case 3:
        sound = this.soundArray[2];
        break;
    }

    sound.start (0);
  }
}
