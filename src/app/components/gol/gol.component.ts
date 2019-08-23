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
    //gm.SetLifeStatus();
  }
  myFunc(){
    console.log("function called");
   this.gm.SetLifeStatus();
  }
}

export class Cell {
  Col: HTMLDivElement;
  
  globCountI: number;
  globCountJ: number;
    //
  myCountI: number;
  myCountJ: number;
    //
  yyy: string;
  rowId: string;
  myLifeStatus: boolean = true;
  myNeibSumm: number;
  globNeibSumm: number;
    constructor (globCountI: number, globCountJ: number, yyy: string, myLifeStatus: boolean) {
      this.myCountI = globCountI;
      this.myCountJ = globCountJ;
      this.rowId = yyy;
      this.myNeibSumm = this.globNeibSumm;
    }
  showCell(): void{
       this.Col = document.createElement('div');
       this.Col.className = 'col-1';
       this.Col.style.cursor =  "pointer";
       this.Col.addEventListener('click', b => {this.setAlive()});
       this.Col.innerText = this.myCountI + '-' + this.myCountJ + ' Neib: ' + this.myNeibSumm + ' ' + this.myLifeStatus;
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
    this.Col.innerText = this.myCountI + '-' + this.myCountJ + ' Neib: ' + this.myNeibSumm + ' ' + this.myLifeStatus;
    this.Col.style.color = 'white';
    if (this.myLifeStatus === true) {
      this.Col.style.backgroundColor = 'green';
     }
    if (this.myLifeStatus === false) {
      this.Col.style.backgroundColor = 'yellow';
     }
    
  }
  setMyLife() {
    if (this.myLifeStatus === true) {
      if (this.myNeibSumm < 2) {
        this.myLifeStatus = false;
      }
      if (this.myNeibSumm > 3) {
        this.myLifeStatus = false;
      }
    }
    else { 
      if (this.myNeibSumm < 2) 
        {
        this.myLifeStatus = false;
        }
      if(this.myNeibSumm == 3) 
      {
      this.myLifeStatus = true;
      }
      }
  }
  setAlive(){
    this.myLifeStatus = true;
    this.Col.style.backgroundColor = 'green';
    this.Col.innerText = this.myCountI + '-' + this.myCountJ + ' Neib: ' + this.myNeibSumm + ' ' + this.myLifeStatus;
   // this.Col.addEventListener('click', c => {GameManager.SetLifeStatus()});
  }
}

export class GameManager {
   arrCells: Array<Cell[]> = []; // Main array.  creating array, wich contained another arrays like rows (or cols)
   Row: HTMLDivElement;
   cont: any;
   rowChild: any;
   cR: any;
   bttnStart: any;

   //
  CellGanerate(): void {
  // ----- create col's
    this.bttnStart = document.createElement('button');
    this.bttnStart.classname = ' btn-primary ';
    this.bttnStart.innerText = 'From TS';
    this.bttnStart.id = 'btnStart';
    let btn = document.getElementById ('btnStart');
  
    this.bttnStart.addEventListener('click', a => {
      this.SetLifeStatus();
    });
    
    this.cont = document.createElement('div'); // creating single container for all rows
    this.cont.className = 'container-fluid';
    let findBasic = document.getElementById ('basic'); // pre-created div by HTML code
    findBasic.insertAdjacentElement ( "afterend" , this.cont);
    findBasic.insertAdjacentElement ( "beforebegin" , this.bttnStart);// adding the button
// ---------------------------------------------------------------------------------------
    for (let i = 0; i < 10; i++) {
        this.Row = document.createElement('div'); // creating of row
        this.Row.className = 'row';
        this.Row.id = 'row' + String(i); // save ID of current row
        //
        this.cont.appendChild (this.Row); // adding current row to the container
        let arrRow: Cell[] = [];
        for (let j = 0; j < 10; j++)
          {
            let life: boolean = false; // Boolean( Math.round(Math.random()));

            arrRow[j] = new Cell(i, j, this.Row.id, life ); // creating array of the row
            arrRow[j].showCell();
          }
        this.arrCells[i] = arrRow; // put down array of row into the cell of Main array
        
      }
  //console.log(this.arrCells);
  }

  //
 public SetLifeStatus():  void {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let singleCell = this.arrCells[i][j];
        let neighborsLifes: number;// = 0;
        if ((i > 0) && (j > 0)) {
                  neighborsLifes =  this.SummNeighborsLifes(i, j);
                  }
        singleCell.myNeibSumm = neighborsLifes;
        singleCell.setMyLife();
        singleCell.reShowCell();
        console.log('s = ' + neighborsLifes);
    }
  }
  }
  // length
 // collecting statuses of neighbors lifes                 [ i - 1, j - 1 ]       [ i - 1, j ]      [ i - 1, j + 1 ]
  //                                                         [ i, j - 1 ]           [ i, j ]          [ i, j + 1 ]  
  //                                                       [ i + 1, j - 1 ]       [ i + 1, j ]      [ i + 1, j + 1 ]
  SummNeighborsLifes(row: number, col: number) {
    let summ: number = 0;
    for (let i = row - 1; i <= row + 1; i++) {
       for (let j = col - 1; j <= col + 1; j++) {
         console.log('row = ' + i + ' col = ' + j + ' ' + this.arrCells[i][j].myLifeStatus);
      //   if ((i != row) && (j != col)) //exclueded for self ([i][j])
         {
           if (this.arrCells[i][j].myLifeStatus == true){
           summ += 1;
         }
         }
       }
     }
    return summ;
   }

}




