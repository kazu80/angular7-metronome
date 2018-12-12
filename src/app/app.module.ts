import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopComponent } from './metronome/top/top.component';
import { RunComponent } from './metronome/run/run.component';
import { DisplayComponent } from './metronome/display/display.component';
import { TempoComponent } from './metronome/tempo/tempo.component';
import { BeatComponent } from './metronome/beat/beat.component';
import { SoundComponent } from './metronome/sound/sound.component';
import { RangeComponent } from './metronome/tempo/range/range.component';
import { RangeBeatComponent } from './metronome/beat/range/range.component';
import { RangeSoundComponent } from './metronome/sound/range/range.component';
import { VoiceComponent } from './metronome/voice/voice.component';
import { PlayerComponent } from './metronome/player/player.component';


@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    RunComponent,
    DisplayComponent,
    TempoComponent,
    BeatComponent,
    SoundComponent,
    RangeComponent,
    RangeBeatComponent,
    RangeSoundComponent,
    VoiceComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TopComponent]
})
export class AppModule { }
