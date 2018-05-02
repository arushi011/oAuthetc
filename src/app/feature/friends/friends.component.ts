import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataManagementService } from '../shared/data-management.service';
import { Subscription } from 'rxjs/Subscription';
import { Friend } from './friends.model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  private token: string;
  private subscription: Subscription;
  private friends: Friend[];
  constructor(private http: HttpClient, private dataManager: DataManagementService) { }

  ngOnInit() {
    this.dataManager.getFriendList();
    this.subscription = this.dataManager.friendsFetched.subscribe((friends) => {
      this.friends = friends;
    });
  }

}
