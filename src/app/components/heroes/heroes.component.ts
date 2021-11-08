import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Hero } from '../../models/hero.model';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  @Output() createEvent = new EventEmitter<Hero>();
  @Output() loseEvent = new EventEmitter();

  private eventsSubscription: Subscription;

  @Input() gameStartEvent: Observable<void>;
  @Input() checkEndConditionHeroes: Observable<void>;

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  @Input() selectedHero: Hero;

  heroList: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.eventsSubscription = this.gameStartEvent.subscribe(() =>
      this.refresh()
    );
    this.eventsSubscription = this.checkEndConditionHeroes.subscribe(() =>
      this.checkHeroUses()
    );
    this.refresh();
  }

  test() {
    console.log('working');
  }

  refresh() {
    console.log("before: ",this.heroList);
    this.heroService.getHeroes().subscribe((data) => {
      this.heroList = data;
      console.log("after: ",this.heroList);
    });
  }

  selectedCheck(checkedHero: Hero) {
    if (checkedHero == this.selectedHero) {
      return true;
    } else {
      return false;
    }
  }

  checkHeroUses() {
    // console.log("lengh",this.heroList.length);
    let lose = true;
    for (let i = 0; i < this.heroList.length; i++) {
      // console.log(this.heroList[i].usesLeft);
      if (this.heroList[i].usesLeft > 0) {
        lose = false;
      }
    }
    if (lose) {
      this.loseEvent.emit();
    }
  }

  heroClick(clickedHero: Hero) {
    this.createEvent.emit(clickedHero);
  }
}
