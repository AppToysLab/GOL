import { Component, OnInit } from '@angular/core';

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

export class Cell {
  Col: HTMLDivElement;
  eventV = new Event('evCellClick', {bubbles: true}); // own EVENT for call SetLifeStatus() at the Cell by onClick
  myCountI: number; // value Row from CellGenerate()
  myCountJ: number; // value Col
    //
  rowId: string;
  myLifeStatus: boolean; // local value takes from CellGenerate() by random
  myNeibSumm: number;
    constructor (globCountI: number, globCountJ: number, yyy: string, globLifeStatus: boolean) {
      this.myCountI = globCountI;
      this.myCountJ = globCountJ;
      this.rowId = yyy;
      this.myLifeStatus = globLifeStatus;
      this.myNeibSumm = 0;
    }

  showCell(): void{
       this.Col = document.createElement('div');
       this.Col.className = 'col-1';
       this.Col.style.cursor =  "pointer";
       this.Col.addEventListener('click', b => {this.setAlive()}); 
      
    //   this.Col.innerText = this.myCountI + '-' + this.myCountJ + ' Neib: ' + this.myNeibSumm + '   ' + this.myLifeStatus;
        this.Col.innerText = 'Neib: ' + this.myNeibSumm + '   ' + this.myLifeStatus;
       if (this.myLifeStatus === true) {
        this.Col.style.backgroundColor = 'green';
       }
        else {
       this.Col.style.backgroundColor = 'yellow';
       }
       let tTT = document.getElementById( this.rowId );
       tTT.appendChild(this.Col);
      }

  reShowCell() {
    this.Col.innerText = 'Neib: ' + this.myNeibSumm + '   ' + this.myLifeStatus;
    this.Col.style.color = 'white'; // white font - as a sign of reShowCell method 
    if (this.myLifeStatus == true) {
      this.Col.style.backgroundColor = 'green';
     }
    if (this.myLifeStatus == false) {
      this.Col.style.backgroundColor = 'yellow';
     }
  }

  setMyLife() {
    if (this.myLifeStatus == true) {
      if (this.myNeibSumm < 2) {
        this.myLifeStatus = false;
      }
      if (this.myNeibSumm > 3) {
        this.myLifeStatus = false;
      }
    }
    else { 
      
      if(this.myNeibSumm == 3) 
        {
        this.myLifeStatus = true;
        }
      }
  }
  
  setAlive()//on Click
  {
    this.Col.dispatchEvent(this.eventV);// -------------- we are ringing all the bells by own EVENT
    this.myLifeStatus = true;
    this.Col.style.backgroundColor = 'green';
  //  this.Col.innerText = this.myCountI + '-' + this.myCountJ +  '  ' + 'Neib: ' + '  ' +   this.myNeibSumm;
    this.Col.innerText = 'Neib: ' + this.myNeibSumm + '   ' + this.myLifeStatus;
    
  }
}

export class GameManager {
   arrCells: Array<Cell[]> = []; // Main array.  creating array, wich contained another arrays like rows (or cols)
   Row: HTMLDivElement;
   cont: any;
   rowChild: any;
   cR: any;
   bttnStart: any;
   

  reName(){
    this.bttnStart.innerText = 'From TS on Event'; // visual effect  for event's testing
    this.bttnStart.style.backgroundColor = 'orange'; // another visual effect  for event's testing
    this.bttnStart.style.color = 'brown'; //one more  visual effect  for event's testing
    console.log('reName() is Run');
  }
   //
  CellGanerate(): void {
  // ----- create col's
    this.bttnStart = document.createElement('button');
    this.bttnStart.classname = ' btn-primary ';
    this.bttnStart.innerText = 'From TS';
    this.bttnStart.id = 'btnStart';
    this.bttnStart.addEventListener('click', a => {
      this.SetLifeStatus()});
    document.addEventListener('evCellClick', b => {
        this.reName()});// ------------------- -------------------- Event's testing
    document.addEventListener('evCellClick', b => {
          this.SetLifeStatus()});  
    
    this.cont = document.createElement('div'); // creating single container for all rows
    this.cont.className = 'container-fluid';
    let findBasic = document.getElementById ('basic'); // pre-created div by HTML code
    findBasic.insertAdjacentElement ( "afterend" , this.cont);
    findBasic.insertAdjacentElement ( "beforebegin" , this.bttnStart);// adding the button
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
           let randomLife = Boolean( Math.round( Math.random()));
         //   let life: boolean = true; // Cell's life status at the begining
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
   //     let singleCell = this.arrCells[i][j];
    //    singleCell.myNeibSumm = this.SummNeighborsLifes(i, j); // runing  void of checking neighbors lives for this one cell
        this.arrCells[i][j].myNeibSumm = this.SummNeighborsLifes(i, j);
      // this.arrCells[i][j].setMyLife();
      //  this.arrCells[i][j].reShowCell();
    }
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 10; j++) {
     this.arrCells[i][j].setMyLife();
     this.arrCells[i][j].reShowCell();
    }
  }
}
  }
  // length
 // collecting statuses of neighbors lifes                 [ i - 1, j - 1 ]       [ i - 1, j ]      [ i - 1, j + 1 ]
  //                                                         [ i, j - 1 ]           [ i, j ]          [ i, j + 1 ]  
  //                                                       [ i + 1, j - 1 ]       [ i + 1, j ]      [ i + 1, j + 1 ]
  SummNeighborsLifes (row: number, col: number) {
    let summ: number = 0;
    
    //   for (let i = row - 1; i < row + 1; i++) {
    //    for (let j = col - 1; j < col + 1; j++) {
    //      if((i >= 0) && (j >= 0) && (i <= 19) && (j <= 9))
    //     { 
    //       console.log(this.arrCells[i][j].myLifeStatus);
    //       if (this.arrCells[i][j].myLifeStatus == true){
    //        summ += 1;
    //       }
    //      }
    //    }
    //  }
    //     summ = summ - 1;// without by self
       
    
    for (let i = row - 1; i < row + 1; i++) {
      for (let j = col - 1; j < col + 1; j++) {
        if((i >= 0) && (j >= 0) && (i <= 19) && (j <= 9))
       { 
         console.log(this.arrCells[i][j].myLifeStatus);
         if (this.arrCells[i][j].myLifeStatus == true)
         {
          summ += 1;
          console.log('after ' + summ);
         }
        }
      }
    }
    if (this.arrCells[row][col].myLifeStatus == true){
      summ = summ - 1;// without by self
    }
       
        
    
    
    console.log(summ);
    return summ;
   }
   

}




