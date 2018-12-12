import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

@Component({
  selector: 'app-voice',
  template: ``,
  styleUrls: []
})
export class VoiceComponent implements OnInit, OnChanges {
  @Input() autoplay: boolean;
  @Input() accent: string;
  @Input() text: string;
  @Input() isSpeech: boolean;
  @Input() fireEvent: string;

  @Input() isRecognition: boolean;

  @Output() start: EventEmitter<any> = new EventEmitter;
  @Output() end: EventEmitter<any> = new EventEmitter;
  @Output() error: EventEmitter<any> = new EventEmitter;
  // @Output() pause: EventEmitter<any> = new EventEmitter;
  // @Output() resume: EventEmitter<any> = new EventEmitter;
  @Output() detect: EventEmitter<any> = new EventEmitter;

  speech: SpeechSynthesisUtterance;
  recognition: any;

  constructor() {
    if ('speechSynthesis' in window) {
      this.speech = new SpeechSynthesisUtterance();
    } else {
      console.error ('Your browser does not support the Web Speech API');
    }

    //
    const { webkitSpeechRecognition }: IWindow = <IWindow>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'ja-JP';
    this.recognition.interimResults = false;
    this.recognition.continuous = true;
    this.recognition.maxAlternatives = 10;


    this.recognition.onresult = (event) => {
      const results = event.results;
      for (let i = event.resultIndex; i < results.length; i++) {
        const transcript = results[i][0].transcript;
        this.detect.emit({transcript: transcript});
      }
    };

    this.recognition.start();
  }

  ngOnInit() {
    this.autoplay  = false;
    this.accent    = 'ja-JP';
    this.text      = '';
    this.isSpeech  = false;
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
    if (changes.hasOwnProperty('isSpeech') && changes.isSpeech.currentValue === false ) {
      console.log('isSpeech!!', 'NO');
    }

    if (changes.hasOwnProperty('accent') && changes.accent.currentValue !== '' ) {
      this._accentChanged();
    }

    if (changes.hasOwnProperty('fireEvent') && changes.fireEvent.currentValue !== '' ) {
      this._eventChanged(changes.fireEvent.currentValue);
    }

    if (changes.hasOwnProperty('isRecognition')) {
      switch (changes.isRecognition.currentValue) {
        case true:
          this.recognition.start();
          break;
        case false:
          this.recognition.stop();
          break;
      }
    }
  }

  speak () {
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
      this.isSpeech = false;
      this.text = undefined;
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
