import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit {
  context: AudioContext;

  constructor() { }

  ngOnInit() {
    this.context = new AudioContext();

    const url = '../../../assets/sound/s_01.mp3';

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

          console.log('sound loaded.');
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

  private onClick() {
    console.log('click');
  }
}
