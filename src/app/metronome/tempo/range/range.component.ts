import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tempo-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public onChange(e: any) {
    // this.service.tempo = e.target.value;
  }
}
