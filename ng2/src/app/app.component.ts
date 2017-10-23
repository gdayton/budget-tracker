import { Component, OnInit } from '@angular/core';
import { SpreadsheetService } from './spreadsheet.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  glennConf;
  glennValues;
  glennDebt;

  joseConf;
  joseValues;
  joseDebt;

  currentDay;

  counter = 30;
  countDown;

  constructor(private ss: SpreadsheetService){ }
  
  ngOnInit(){
    this.refresh();

    this.timeout();
  }

  timeout() {
    setTimeout(() => {
        // Do Something Here
        // Then recall the parent function to
        // create a recursive loop.
        if(this.counter === 0){
          this.counter = 30;
          this.refresh();
        }
        --this.counter;

        this.timeout();
    }, 1000);
  }


  refresh(){
    this.ss.getDebt("glenn").subscribe(val => this.glennDebt = JSON.parse(val._body));
    this.ss.getValues("glenn").subscribe(val => this.glennValues = JSON.parse(val._body));
    this.ss.getConf("glenn").subscribe(val => this.glennConf = JSON.parse(val._body));

    this.ss.getDebt("jose").subscribe(val => this.joseDebt = JSON.parse(val._body));
    this.ss.getValues("jose").subscribe(val => this.joseValues = JSON.parse(val._body));
    this.ss.getConf("jose").subscribe(val => this.joseConf = JSON.parse(val._body));

    this.ss.getCurrentDay().subscribe(val => this.currentDay = JSON.parse(val._body));
  }
  
}
