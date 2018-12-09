import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  playBeat: boolean;

  private _el: HTMLElement;

  constructor(
    el: ElementRef
  ) {
    this._el = el.nativeElement;
  }

  ngOnInit() {
  }

  handlePlayBeat($event): void {
    this.playBeat = true;
  }

  handlePlayedBeat($event): void {
    setTimeout(() => this.playBeat = false);
  }

  handleTempoActive($event): void {
    const content = this._el.querySelector('#content-tempo');
    content.classList.toggle('active');
  }
}
