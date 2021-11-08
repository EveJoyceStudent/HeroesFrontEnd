import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Hero } from '../../models/hero.model';
import { Result } from '../../models/result.model';
import { Villain } from '../../models/villain.model';
import { ResultService } from '../../services/result.service';
import { HeroesComponent } from '../heroes/heroes.component';
import { ResultsComponent } from '../results/results.component';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  // this uses the angular ViewChild to access a child element via a decorator (#resultsComponent) as in the HTML:
  // <app-results #resultsComponent [latestResult]="latestResult"></app-results>
  // this allows methods from within the Result component to be called directly here
  @ViewChild('resultsComponent') resultsComponent: ResultsComponent;

  // this uses the rxjs library to create a Subject which creates an observable wich can be accessed in child elements hero/villain as in the HTML:
  // [gameStartEvent]="gameStartButtonPressed.asObservable()"
  // this is legacy and replaced by using decorators as in '@ViewChild('resultsComponent') resultsComponent: ResultsComponent;' above.
  gameStartButtonPressed: Subject<void> = new Subject<void>();
  emitGameStartButtonPressed() {
    this.gameStartButtonPressed.next();
  }

  checkEndCondition: Subject<void> = new Subject<void>();
  emitCheckEndCondition() {
    this.checkEndCondition.next();
  }
  checkWinCondition: Subject<void> = new Subject<void>();
  emitCheckWinCondition() {
    this.checkWinCondition.next();
  }
  checkLoseCondition: Subject<void> = new Subject<void>();
  emitCheckLoseCondition() {
    this.checkLoseCondition.next();
  }

  gameStarted: boolean = true;
  selectedHero: Hero;
  selectedVillain: Villain;

  attackHero: Hero;
  attackVillain: Villain;
  attackDamage: number;

  latestResult: Result = null;

  heroClick(clickedHero: Hero) {
    if (clickedHero == this.selectedHero) {
      this.selectedHero = null;
    } else {
      if (clickedHero.usesLeft > 0) {
        this.selectedHero = clickedHero;
      }
    }
  }

  VillainClick(clickedVillain: Villain) {
    if (clickedVillain == this.selectedVillain) {
      this.selectedVillain = null;
    } else {
      if (clickedVillain.health > 0) {
        this.selectedVillain = clickedVillain;
      }
    }
    // console.log(clickedVillain.name);
  }

  startGame() {
    this.gameStarted = true;
    this.emitGameStartButtonPressed();
    this.attackHero = null;
    this.attackVillain = null;
    this.attackDamage = null;
    this.selectedHero = null;
    this.selectedVillain = null;
  }

  constructor(private resultService: ResultService) {}

  Attack() {
    this.attackHero = this.selectedHero;
    this.attackVillain = this.selectedVillain;
    this.attackDamage =
      Math.floor(
        Math.random() * (this.attackHero.diceMax - this.attackHero.diceMin + 1)
      ) + this.attackHero.diceMin;

    if (this.attackDamage >= this.selectedVillain.health) {
      this.selectedVillain.health = 0;
      this.selectedVillain = null;
      this.emitCheckWinCondition();
    } else {
      this.selectedVillain.health -= this.attackDamage;
    }

    this.selectedHero.usesLeft -= 1;
    if (this.selectedHero.usesLeft == 0) {
      this.selectedHero = null;
      this.emitCheckLoseCondition();
    }
  }

  lose() {
    if (this.gameStarted) {
      window.alert('the heroes lose :(');
      this.gameStarted = false;
      this.saveResult('Heroes Lose');
    }
  }

  win() {
    if (this.gameStarted) {
      window.alert('the heroes win');
      this.gameStarted = false;
      this.saveResult('Heroes Win');
    }
  }

  saveResult(result: string) {
    this.resultService
      .postResult({
        endTime: null,
        winner: result,
      })
      .subscribe((data) => {
        console.log(data);
        this.latestResult;
        console.log(this.latestResult);
      });
    this.resultsComponent.refresh();
  }

  ngOnInit() {}
}
