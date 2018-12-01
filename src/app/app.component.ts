import {Component, Injector} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {TopComponent} from './metronome/top/top.component';

@Component({
  selector: 'app-metronome',
  template: ``
})
export class AppComponent {
  constructor(private injector: Injector) {
    const AppMetronomeElement = createCustomElement(TopComponent, {
      injector: this.injector
    });
    customElements.define('app-metronome', AppMetronomeElement);
  }
}
