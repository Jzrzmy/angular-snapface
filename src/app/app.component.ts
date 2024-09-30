import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {RouterOutlet} from "@angular/router";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
