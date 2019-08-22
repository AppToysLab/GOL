export class TestSumm {
    firstNumber: number;
    secondNumber: number;
    constructor(a: number, b: number) {
        this.firstNumber = a;
        this.secondNumber = b; 
    }
    Summ() {
     let c = this.firstNumber + this.secondNumber;
       console.log(c);
    }
}