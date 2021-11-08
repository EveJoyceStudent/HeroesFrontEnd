import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../../models/result.model';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  @Input() latestResult: Result;
  resultList: Result[] = [];

  constructor(private resultService: ResultService) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.resultService.getResults().subscribe((data) => {
      this.resultList = data;
    });
  }
}
