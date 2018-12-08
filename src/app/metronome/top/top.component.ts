import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
  playBeat: boolean;

  constructor() { }

  ngOnInit() {
  }

  handlePlayBeat($event): void {
    this.playBeat = true;
  }

  handlePlayedBeat($event): void {
    setTimeout(() => this.playBeat = false);
  }
}
