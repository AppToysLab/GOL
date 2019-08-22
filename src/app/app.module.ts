import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { AppComponent } from './app.component';
// import { CarComponent } from './components/car/car.component';
import { GOLComponent } from './components/gol/gol.component';

@NgModule({
  declarations: [
    // AppComponent,
   // CarComponent,
    GOLComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
 // bootstrap: [AppComponent]
 // bootstrap: [CarComponent]
  bootstrap: [GOLComponent]
})
export class AppModule { }
