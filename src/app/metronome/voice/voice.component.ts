import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-voice',
  template: ``,
  styleUrls: []
})
export class VoiceComponent implements OnInit, OnChanges {
  @Input() autoplay: boolean;
  @Input() accent: string;
  @Input() text: string;
  @Input() isSpeech: Boolean;
  @Input() fireEvent: string;

  @Output() start: EventEmitter<any> = new EventEmitter;
  @Output() end: EventEmitter<any> = new EventEmitter;
  @Output() error: EventEmitter<any> = new EventEmitter;
  // @Output() pause: EventEmitter<any> = new EventEmitter;
  // @Output() resume: EventEmitter<any> = new EventEmitter;

  speech: SpeechSynthesisUtterance;

  constructor() {
    if ('speechSynthesis' in window) {
      this.speech = new SpeechSynthesisUtterance();
    } else {
      console.error ('Your browser does not support the Web Speech API');
    }
  }

  ngOnInit() {
    this.autoplay = false;
    this.accent = 'ja-JP';
    this.text = '全力メトロノームはじめるよ';
    this.isSpeech = false;
    this.fireEvent = '';

    // Initialize attributes
    this._textChanged();
    this._accentChanged();

    // set Event
    this._propagateEvent();

    if (this.autoplay) {
      this.speak ();
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('autoplay') && changes.autoplay.currentValue === true ) {
      this.speak ();
    }

    if (changes.hasOwnProperty('isSpeech') && changes.isSpeech.currentValue === true ) {
      this._textChanged();
      this.speak();
    }

    if (changes.hasOwnProperty('accent') && changes.accent.currentValue !== '' ) {
      this._accentChanged();
    }

    if (changes.hasOwnProperty('fireEvent') && changes.fireEvent.currentValue !== '' ) {
      this._eventChanged(changes.fireEvent.currentValue);
    }
  }

  speak () {
    console.log(this.speech);
    window.speechSynthesis.speak (this.speech);
  }

  cancel () {
    window.speechSynthesis.cancel ();
  }

  pause () {
    window.speechSynthesis.pause ();
  }

  resume () {
    window.speechSynthesis.resume ();
  }

  _accentChanged () {
    this.speech.lang = this.accent;
  }

  _textChanged () {
    this.speech.text = this.text;
  }

  _propagateEvent () {
    this.speech.onstart = () => {
      this.start.emit();
    };

    this.speech.onend = () => {
      this.end.emit();
    };

    this.speech.onerror = () => {
      this.error.emit();
    };
  }

  _eventChanged (event) {
    switch (event) {
      case 'start':
        this.start.emit();
        break;
      case 'end':
        this.end.emit();
        break;
      case 'error':
        this.error.emit();
        break;
    }
  }
}
