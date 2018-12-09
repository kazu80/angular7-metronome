import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-beat',
  templateUrl: './beat.component.html',
  styleUrls: ['./beat.component.scss']
})
export class BeatComponent implements OnInit {
  @Output() activeBeat: EventEmitter<any> = new EventEmitter();
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
    this.activeBeat.emit();

    const button = this._el.querySelector('#beat-button');
    button.classList.toggle('active');
  }
}
