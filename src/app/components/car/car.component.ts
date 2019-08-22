import { Component, OnInit } from '@angular/core';
//import {TestSumm} from ' ./components/car/car.kukoria';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
export class TestSumm {
  firstNumber: number;
  secondNumber: number;
  constructor(a: number, b: number) {
      this.firstNumber = a;
      this.secondNumber = b; 
  }
  Summ() {
   let c: number = this.firstNumber + this.secondNumber;
     console.log('rrrrrrr = ' + c);
  }
}
let ts = new TestSumm(4, 5);
ts.Summ();

