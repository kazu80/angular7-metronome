import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {TempoService} from '../../service/tempo.service';
import {BeatService} from '../../service/beat.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit, OnChanges {
  @Input() beat: boolean;
  @Input() mode: string;
  @Output() playedBeat: EventEmitter<any> = new EventEmitter();

  private _el: HTMLElement;

  constructor(
    el: ElementRef,
    private tempoService: TempoService,
    private beatService: BeatService
    ) {
    this._el = el.nativeElement;
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('beat') && changes.beat.currentValue === true ) {

      // 波紋
      const ripple = document.createElement('div');
      ripple.classList.add('circle');
      ripple.addEventListener('animationend', (e: any) => {
        e.target.parentNode.removeChild(e.target);
      });
      this._el.appendChild(ripple);

      //
      const display = this._el.querySelector('#display');
      display.classList.add('active');
      display.addEventListener('animationend', (e: any) => {
        e.target.classList.remove('active');
      });

      // beatのvalueをfalseにする
      this.playedBeat.emit({ value: 'foo'});
    }
  }

  getTempo(): number {
    return this.tempoService.tempo;
  }

  getBeat(): number {
    return this.beatService.selectedValue;
  }

  displayNumber(): number {
    switch (this.mode) {
      case 'tempo':
        return this.getTempo();
      case 'beat':
        return this.getBeat();
      default:
        return this.getTempo();
    }
  }
}
