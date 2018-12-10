import { Component, OnInit } from '@angular/core';
import {SoundService} from '../../../service/sound.service';

@Component({
  selector: 'app-sound-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeSoundComponent implements OnInit {

  constructor(private service: SoundService) { }

  ngOnInit() {
  }

  public onChange(e: any) {
    this.service.sound = e.target.value;
  }
}
