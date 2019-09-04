import { Component, OnInit } from '@angular/core';
import { Cell } from './Cell';

@Component({
  selector: 'app-gol',
  templateUrl: './gol.component.html',
  styleUrls: ['./gol.component.css']
})
export class GOLComponent implements OnInit {
  gm: GameManager;
  constructor() { }

  ngOnInit() {
    this.gm = new GameManager();
    this.gm.CellGanerate();
  }

//  myFunc(){
 //   console.log("function called");
  // this.gm.SetLifeStatus();
 // }
}

export class GameManager {
   arrCells: Array<Cell[]> = []; // Main array.  creating array, wich contained another arrays like rows (or cols)
   Row: HTMLDivElement;
   cont: any;
   rowChild: any;
   cR: any;
   bttnStart: any;
   bttnStop: any;
   eventReborn = new Event('evReborn', {bubbles: true}); // waiting for the ending of checking neighbores summ

  reName(){
   // this.bttnStart.innerText = 'From TS on Event'; // visual effect  for event's testing
    this.bttnStart.style.backgroundColor = 'orange'; // another visual effect  for event's testing
    this.bttnStart.style.color = 'brown'; //one more  visual effect  for event's testing
    console.log('reName() is Run');
  }
   //
  CellGanerate(): void {
  // ----- create col's
    this.bttnStart = document.createElement('button');
    this.bttnStart.classname = ' btn-primary ';
    this.bttnStart.style.backgroundColor = 'orange';
    this.bttnStart.innerText = 'Start';
    this.bttnStart.id = 'btnStart';

    let startStream; // = setInterval(() => this.SetLifeStatus(), 1000);
    //this.startStream = setInterval(() => this.SetLifeStatus(), 1000);
  //  this.bttnStart.addEventListener('click', a => {
  //    this.SetLifeStatus()}); 
      this.bttnStart.addEventListener('click', a => {
        startStream = setInterval(() => this.SetLifeStatus(), 1000);}); // -------  stream --------- stream ---

    this.bttnStop = document.createElement('button');
    this.bttnStop.innerText = 'Stop';// clearInterval
    this.bttnStop.style.backgroundColor = 'blue';
    this.bttnStop.addEventListener('click', a => {
      clearInterval(startStream)});

    document.addEventListener('evCellClick', b => {
        this.reName()});// ------------------- -------------------- Event's testing
    document.addEventListener('evCellClick', b => {
          this.SetLifeStatus()});
     

    this.cont = document.createElement('div'); // creating single container for all rows
    this.cont.className = 'container-fluid';
    let findBasic = document.getElementById ('basic'); // pre-created div by HTML code
    findBasic.insertAdjacentElement ( "afterend" , this.cont);
    findBasic.insertAdjacentElement ( "beforebegin" , this.bttnStart); // adding the button
    findBasic.insertAdjacentElement('beforebegin', this.bttnStop);
// ---------------------------------------------------------------------------------------
    for (let i = 0; i < 20; i++) {
        this.Row = document.createElement('div'); // creating of row
        this.Row.className = 'row';
        this.Row.id = 'row' + String(i); // save ID of current row
        //
        this.cont.appendChild (this.Row); // adding current row to the container
        let arrRow: Cell[] = [];
        for (let j = 0; j < 10; j++)
          {
           let randomLife = Boolean( Math.round( Math.random())); // every single Cell's life status at the begining
            randomLife = false; 
            arrRow[j] = new Cell(i, j, this.Row.id, randomLife ); // creating array of the row
            arrRow[j].showCell();
          }
        this.arrCells[i] = arrRow; // put down array of row into the cell of Main array
      }

      
  }
  //
  SetLifeStatus():  void {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 10; j++) {
        this.arrCells[i][j].myNeibSumm = this.SummNeighborsLifes(i, j);// runing  void of checking neighbors lives for this one cell
    }
}
 document.dispatchEvent(this.eventReborn);// ---- EVENT --------- EVENT 
  }
  
  // length
 // collecting statuses of neighbors lifes                 [ i - 1, j - 1 ]       [ i - 1, j ]      [ i - 1, j + 1 ]
  //                                                         [ i, j - 1 ]           [ i, j ]          [ i, j + 1 ]  
  //                                                       [ i + 1, j - 1 ]       [ i + 1, j ]      [ i + 1, j + 1 ]
  SummNeighborsLifes (row: number, col: number) {
    let summ: number = 0;
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if((i >= 0) && (j >= 0) && (i <= 19) && (j <= 9))
        { 
         if (this.arrCells[i][j].myLifeStatus == true)
         {
          summ += 1;
          //console.log('after ' + summ);
         }
        }
      }

    }
    if (this.arrCells[row][col].myLifeStatus == true){
      summ = summ - 1;// without by self

    }
    console.log(row + '-' + col + '   after ' + summ);
    return summ;
   }
}




