import { Component, OnInit } from '@angular/core';
import {BeatService} from '../../../service/beat.service';

@Component({
  selector: 'app-beat-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeBeatComponent implements OnInit {

  constructor(private service: BeatService) { }

  ngOnInit() {
  }

  public onChange(e: any) {
    this.service.selectedValue = e.target.value;
  }
}
