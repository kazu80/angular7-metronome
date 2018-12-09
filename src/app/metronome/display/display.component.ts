import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {TempoService} from '../../service/tempo.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  @Input() beat: boolean;
  @Output() playedBeat: EventEmitter<any> = new EventEmitter();

  private _el: HTMLElement;

  constructor(
    el: ElementRef,
    private tempoService: TempoService
    ) {
    this._el = el.nativeElement;
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.beat.currentValue === true ) {

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
}
