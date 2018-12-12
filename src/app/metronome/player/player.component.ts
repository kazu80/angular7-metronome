import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

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

  @Input() url: string;
  @Input() play: boolean;

  constructor() {
    this.volume = 5;
  }

  ngOnInit() {
    // @ts-ignore
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('url') && changes.url.currentValue !== '' ) {
      this._loadBufferFromURL(changes.url.currentValue, (buffer) => {
        this.initialSound (buffer, this.volume * 0.1);
      });
    }

    if (changes.hasOwnProperty('play') && changes.play.currentValue === true ) {

      this._play();
    }
  }

  private initialSound (buffer, gain) {
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
      console.log('onended!');
      this.initialSound (buffer, this.volume * 0.1);
    };
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

  private _play () {
    this.soundSource.start (0);
  }
}
