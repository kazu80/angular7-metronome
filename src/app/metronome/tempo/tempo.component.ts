import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tempo',
  templateUrl: './tempo.component.html',
  styleUrls: ['./tempo.component.scss']
})
export class TempoComponent implements OnInit {
  @Output() activeTempo: EventEmitter<any> = new EventEmitter();
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
    this.activeTempo.emit();

    const button = this._el.querySelector('#tempo-button');
    button.classList.toggle('active');
  }
}
