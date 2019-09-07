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
   bttnClear: any;
   eventReborn = new Event('evReborn', {bubbles: true}); // waiting for the ending of checking neighbores summ
    eventClear = new Event('evClear', {bubbles: true});

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
    this.bttnStart.addEventListener('click', a => {
      this.SetLifeStatus()}); 
      // this.bttnStart.addEventListener('click', a => {
     //    startStream = setInterval(() => this.SetLifeStatus(), 400);}); // -------  stream --------- stream ---
     
     // this.bttnStart.addEventListener('click', a => {
      //  this.SetLifeStatus();}); // -------  stream --------- stream ---


    this.bttnStop = document.createElement('button');
    this.bttnStop.innerText = 'Stop';// clearInterval
    this.bttnStop.style.backgroundColor = 'blue';
    this.bttnStop.addEventListener('click', a => {
      clearInterval(startStream)});

    this.bttnClear = document.createElement('button');// ClearLifeStatus()
    this.bttnClear.innerText ='Clear';
    this.bttnClear.style.backgroundColor = 'red';
    this.bttnClear.style.color = 'white';
    this.bttnClear.addEventListener('click', a => {
          this.ClearLifeStatus(); }); 

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
    findBasic.insertAdjacentElement('beforebegin', this.bttnClear);
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

  ClearLifeStatus():  void {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 10; j++) {
        this.arrCells[i][j].myLifeStatus = false;// runing  void of checking neighbors lives for this one cell
    }
  }
 document.dispatchEvent(this.eventClear);// ---- EVENT --------- EVENT 
  }
  
  // length
 // collecting statuses of neighbors lifes                 [ i - 1, j - 1 ]       [ i - 1, j ]      [ i - 1, j + 1 ]
  //                                                         [ i, j - 1 ]           [ i, j ]          [ i, j + 1 ]  
  //                                                       [ i + 1, j - 1 ]       [ i + 1, j ]      [ i + 1, j + 1 ]
  SummNeighborsLifes (row: number, col: number) {
    let summ: number = 0;
    let neighbors: Cell[] = [];
    if (col > 0 && col < 9 && row > 0 && row < 19 )
    {
      for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
          if((i >= 0) && (j >= 0) && (i <= 19) && (j <= 9))
          { 
           if(!neighbors.includes(this.arrCells[i][j])){
            neighbors.push(this.arrCells[i][j]);
           }
          }
        }
      }
    }
    if (col == 9 && row > 0 && row < 19)//-------------------------------------
    {
      summ = 0;
      for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col; j++) {
          if((i >= 0) && (i <= 19) )
          { 
            if(!neighbors.includes(this.arrCells[i][j])){
              neighbors.push(this.arrCells[i][j]);
             }
            // if (this.arrCells[i][j].myLifeStatus == true)
            //   {
            //     summ += 1;
            //   }
            
          }
        }
        if((i >= 0) && (i <= 19) ){
          if(!neighbors.includes(this.arrCells[i][0])){
            neighbors.push(this.arrCells[i][0]);
           }
        }
      }
    }
    if (col == 0 && row > 0 && row < 19)// --------------------------------------
    {
      summ = 0;
      for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col; j <= col + 1; j++) {
          if((i >= 0) && (i <= 19) )
          { 
            if(!neighbors.includes(this.arrCells[i][j])){
              neighbors.push(this.arrCells[i][j]);
             }
          }
        }
        if((i >= 0) && (i <= 19) ){
          if(!neighbors.includes(this.arrCells[i][9])){
            neighbors.push(this.arrCells[i][9]);
           }
        }
      }
    }
 //----------------------------------------------------------------------------------------------   
//-------------------------------- vert ------------------------
    if (row == 0)
    {
      summ = 0;
//------------------------------------------------------ step 1 ------------------------
     if (col != 9 && col != 0)
     {
      for (let i = row ; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
          if(j >= 0 && j <= 9 )
          { 
            if(!neighbors.includes(this.arrCells[i][j]))
            {
              neighbors.push(this.arrCells[i][j]);
            }
          }
        }
      }
     }
      //------------------------------------------------------ step 2 ------------------------
      if (col != 9 && col != 0){
        for (let j = col - 1; j <= col + 1; j++){
              if(j >= 0 && j <= 9 ){
                if(!neighbors.includes(this.arrCells[19][j]))
                  {
                  neighbors.push(this.arrCells[19][j]);
                  }
                }
            }
      }
      if (col == 9)//------------------------------------------ col == 9 ----- step 1 ------------------------
      {
        for (let i = row ; i <= row + 1; i++) {
          for (let j = col - 1; j <= col + 1; j++) {
            if(j >= 0 && j <= 9 )
            { 
              if(!neighbors.includes(this.arrCells[i][j]))
              {
                neighbors.push(this.arrCells[i][j]);
              }
              if(!neighbors.includes(this.arrCells[i][10]))
              {
              this.arrCells[i][10] = this.arrCells[i][0];
              neighbors.push(this.arrCells[i][10]);
              }
            }
          }
        }

//------------------------------------------ col == 9 ----- step 2 ------------------------
        for (let j = col - 1; j <= col ; j++){
          
          if (!neighbors.includes(this.arrCells[19][0]))
            {
              neighbors.push(this.arrCells[19][0]);
            }
          if(!neighbors.includes(this.arrCells[19][j]))
            {
              neighbors.push(this.arrCells[19][j]);
            }
        }
    }

    if (col == 0)//------------------------------------------ col == 0 ----- step 1 ------------------------
    {
      summ = 0;
      for (let i = row ; i <= row + 1; i++) {
        for (let j = col; j <= col + 1; j++) {
          if(j >= 0 && j <= 9 )
          { 
            if(!neighbors.includes(this.arrCells[i][j]))
            {
              neighbors.push(this.arrCells[i][j]);
            }
            if(!neighbors.includes(this.arrCells[i][9]))
            {
              neighbors.push(this.arrCells[i][9]);
            }
          }
        }
      }
      
      for (let j = col ; j <= col + 1 ; j++)//-------------------------- col == 0 ----- step 2 -------------------
      {
        
        if (!neighbors.includes(this.arrCells[19][9]))
          {
            neighbors.push(this.arrCells[19][9]);
          }
        if(!neighbors.includes(this.arrCells[19][j]))
          {
            neighbors.push(this.arrCells[19][j]);
          }
      }
  }
  }
//--------------------------------------------------------------------------------------------
if (row == 19)
{
  summ = 0;
//------------------------------------------------------ step 1 ------------------------
 if (col != 9 && col != 0)
 {
  for (let i = row - 1; i <= row; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if(j >= 0 && j <= 9 )
      { 
        if(!neighbors.includes(this.arrCells[i][j]))
        {
          neighbors.push(this.arrCells[i][j]);
        }
      }
    }
  }
 }
  //------------------------------------------------------ step 2 ------------------------
  if (col != 9 && col != 0){
    for (let j = col - 1; j <= col + 1; j++){
          if(j >= 0 && j <= 9 ){
            if(!neighbors.includes(this.arrCells[0][j]))
              {
              neighbors.push(this.arrCells[0][j]);
              }
            }
        }
  }
  if (col == 9)//------------------------------------------ col == 9 ----- step 1 ------------------------
  {
    for (let i = row - 1 ; i <= row; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if(j >= 0 && j <= 9 )
        { 
          if(!neighbors.includes(this.arrCells[i][j]))
          {
            neighbors.push(this.arrCells[i][j]);
          }
          if(!neighbors.includes(this.arrCells[i][10]))
          {
          this.arrCells[i][10] = this.arrCells[i][0];
          neighbors.push(this.arrCells[i][10]);
          }
        }
      }
    }

//------------------------------------------ col == 9 ----- step 2 ------------------------
    for (let j = col - 1; j <= col ; j++){
      
      if (!neighbors.includes(this.arrCells[0][0]))
        {
          neighbors.push(this.arrCells[0][0]);
        }
      if(!neighbors.includes(this.arrCells[0][j]))
        {
          neighbors.push(this.arrCells[0][j]);
        }
    }
}

if (col == 0)//------------------------------------------ col == 0 ----- step 1 ------------------------
{
  summ = 0;
  for (let i = row -1; i <= row; i++) {
    for (let j = col; j <= col + 1; j++) {
      if(j >= 0 && j <= 9 )
      { 
        if(!neighbors.includes(this.arrCells[i][j]))
        {
          neighbors.push(this.arrCells[i][j]);
        }
        if(!neighbors.includes(this.arrCells[i][9]))
        {
          neighbors.push(this.arrCells[i][9]);
        }
      }
    }
  }
  
  for (let j = col ; j <= col + 1 ; j++)//-------------------------- col == 0 ----- step 2 -------------------
  {
    
    if (!neighbors.includes(this.arrCells[0][9]))
      {
        neighbors.push(this.arrCells[0][9]);
      }
    if(!neighbors.includes(this.arrCells[0][j]))
      {
        neighbors.push(this.arrCells[0][j]);
      }
  }
}
}


  //  ---------------------- counting SUMM --------------------------------
    for (let i = 0; i < neighbors.length; i++) {
      if ( neighbors[i].myLifeStatus){
        summ += 1;
      }
      
      
    }

    if (this.arrCells[row][col].myLifeStatus == true){
      summ = summ - 1;// without by self
    }
     if (row == 19 && col == 0) {
       console.log(row +' ' + col +' : ' + summ);
       console.log(neighbors);
     }
    return summ;
   }
}




