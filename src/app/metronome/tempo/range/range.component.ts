import { Component, OnInit } from '@angular/core';
import {TempoService} from '../../../service/tempo.service';

@Component({
  selector: 'app-tempo-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {

  constructor(private service: TempoService) { }

  ngOnInit() {
  }

  public onChange(e: any) {
    this.service.tempo = e.target.value;
  }
}
