import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

//To import a class in another module, prepend export to the class
export class AppComponent {
  title = 'app';
}

//in the component you can also change the templateUrl to be template and add html tags.
//Example: template: `<h1>{{title}}</h1>` #Note the backtikcs '`'
//This is an inline template

//Same applies to styles
