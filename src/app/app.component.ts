import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyB6ynDPprI54_BKv3S7oPuQyTUHxcr8eUQ',
      authDomain: 'authetc-d7447.firebaseapp.com',
    });
  }
}
