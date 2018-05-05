import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: string;
  private subscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userName = this.authService.userName;
    this.subscription = this.authService.userNameChanged.subscribe(userName => {
      this.userName = userName;
    });
  }

}
