import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { VillainsComponent } from './components/villains/villains.component';
import { GameComponent } from './components/game/game.component';

import { HttpClientModule } from '@angular/common/http';

import { HeroService } from './services/hero.service';
import { VillainService } from './services/villain.service';
import { ResultsComponent } from './components/results/results.component';
import { ResultService } from './services/result.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    HeroesComponent,
    VillainsComponent,
    GameComponent,
    ResultsComponent,
  ],
  bootstrap: [AppComponent],
  providers: [HeroService, VillainService, ResultService],
})
export class AppModule {}
