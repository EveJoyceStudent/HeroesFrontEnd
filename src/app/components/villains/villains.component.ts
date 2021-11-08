import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Villain } from '../../models/villain.model';
import { VillainService } from '../../services/villain.service';

@Component({
  selector: 'villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.css'],
})
export class VillainsComponent implements OnInit {
  @Output() createEvent = new EventEmitter<Villain>();
  @Output() winEvent = new EventEmitter();

  private eventsSubscription: Subscription;

  @Input() events: Observable<void>;
  @Input() checkEndConditionVillains: Observable<void>;

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  @Input() selectedVillain: Villain;
  villainList: Villain[] = [];

  constructor(private villainService: VillainService) {}

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe(() => this.refresh());
    this.eventsSubscription = this.checkEndConditionVillains.subscribe(() =>
      this.checkVillainHealth()
    );
    this.refresh();
  }

  refresh() {
    this.villainService.getVillains().subscribe((data) => {
      this.villainList = data;
    });
  }

  checkVillainHealth() {
    let win = true;
    for (let i = 0; i < this.villainList.length; i++) {
      // console.log("villain",i,"health",this.villainList[i].health);
      if (this.villainList[i].health > 0) {
        win = false;
      }
    }
    if (win) {
      this.winEvent.emit();
    }
  }

  selectedCheck(checkedVillain: Villain) {
    if (checkedVillain == this.selectedVillain) {
      return true;
    } else {
      return false;
    }
  }

  villainClick(clickedVillain: Villain) {
    this.createEvent.emit(clickedVillain);

    // if(clickedVillain==this.selectedVillain){
    //   this.selectedVillain=null;
    // } else {
    //   this.selectedVillain=clickedVillain;
    // }
    // console.log(clickedVillain.name);
  }
}
