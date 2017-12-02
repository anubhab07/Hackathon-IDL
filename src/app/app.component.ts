import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  dateNow=new Date()
  footerMessage=`Copyright ${this.dateNow.getFullYear()}. Unauthorized uses restricted`;
}
