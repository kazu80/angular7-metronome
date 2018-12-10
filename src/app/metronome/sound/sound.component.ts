import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.scss']
})
export class SoundComponent implements OnInit {
  @Output() activeSound: EventEmitter<any> = new EventEmitter();
  isActive: boolean;

  private _el: HTMLElement;

  constructor(
    el: ElementRef
  ) {
    this._el = el.nativeElement;
  }

  ngOnInit() {
    this.isActive = false;
  }

  public onClick($event) {
    this.isActive = !this.isActive;
    this.activeSound.emit();

    const button = this._el.querySelector('#sound-button');
    button.classList.toggle('active');
  }
}
