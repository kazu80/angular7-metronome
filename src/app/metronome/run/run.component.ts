import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit {
  context: AudioContext;
  soundSource: AudioBufferSourceNode;
  soundGain: GainNode;
  analyser: AnalyserNode;
  loop: boolean;
  volume: number;

  @Output() playBeat: EventEmitter<{ value: string }> = new EventEmitter();

  constructor() {
    this.volume = 5;
  }

  ngOnInit() {
    this.context = new AudioContext();
  }

  private onClick() {
    const url = '../../../assets/sound/s_02.mp3';

    this.playBeat.emit({ value: 'foo'});

    this._loadBufferFromURL(url, (buffer) => {
      this.initialSound (buffer, this.volume * 0.1);

      this.soundSource.start (0);
    });
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

  private initialSound (buffer, gain) {
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

      this.initialSound (buffer, this.volume * 0.1);
    };

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
