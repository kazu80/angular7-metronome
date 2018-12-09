import {Component, Injector} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {TopComponent} from './metronome/top/top.component';
import {SoundService} from './service/sound.service';
import {TempoService} from './service/tempo.service';

@Component({
  selector: 'app-metronome',
  template: ``,
  providers: [
    SoundService,
    TempoService
  ]
})
export class AppComponent {
  constructor(private injector: Injector) {
    const AppMetronomeElement = createCustomElement(TopComponent, {
      injector: this.injector
    });
    customElements.define('app-metronome', AppMetronomeElement);
  }
}
