export class Cell {
    Col: HTMLDivElement;
    eventV = new Event('evCellClick', {bubbles: true}); // own EVENT for call SetLifeStatus() at the Cell by onClick
    eventReborn = new Event('evReborn', {bubbles: true}); // waiting for the ending of checking neighbores summ
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
         //                                          // ---- EVENT --------- EVENT --------- EVENT --------- EVENT -----
         document.addEventListener('evReborn', b => {
          this.setMyLife();
          this.reShowCell(); 
        }); 
  
        
      //   this.Col.innerText = this.myCountI + '-' + this.myCountJ + ' Neib: ' + this.myNeibSumm + '   ' + this.myLifeStatus;
          this.Col.innerText = 'Neib: ' + this.myNeibSumm + '   ' + this.myLifeStatus;
         if (this.myLifeStatus == true) {
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
     // this.Col.dispatchEvent(this.eventV);// -- we are ringing all the bells by own EVENT// ---- EVENT --------- EVENT
      this.myLifeStatus = true;
      this.Col.style.backgroundColor = 'green';
    //  this.Col.innerText = this.myCountI + '-' + this.myCountJ +  '  ' + 'Neib: ' + '  ' +   this.myNeibSumm;
      this.Col.innerText = 'Neib: ' + this.myNeibSumm + '   ' + this.myLifeStatus;
    }
  }