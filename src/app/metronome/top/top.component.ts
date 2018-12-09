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
    this.resetClass();
    const content = this._el.querySelector('#content-tempo');
    content.classList.toggle('active');
  }

  handleBeatActive($event): void {
    this.resetClass();
    const content = this._el.querySelector('#content-beat');
    content.classList.toggle('active');
  }

  resetClass(): void {
    const ranges = this._el.querySelectorAll('.range');
    console.log(ranges);
    ranges.forEach((range, key, parent) => {
      range.classList.remove('active');
    });
  }
}
