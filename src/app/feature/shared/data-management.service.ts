import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Friend } from '../friends/friends.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataManagementService {
    constructor(private http: HttpClient, private authService: AuthService) {
    }
    friends: Friend[];
    friendsFetched = new Subject<Friend[]>();
    getFriendList() {
        const token = this.authService.getFacebookToken();
        console.log('https://graph.facebook.com/v2.12/me/friends?access_token=' + token);
        return this.http.get('https://graph.facebook.com/v2.12/me/friends?access_token=' + token).subscribe((res) => {
            if (res['data'].length > 0) {
                this.friends.push.apply(res['data']);
                this.friendsFetched.next(this.friends.slice());
            }
          }); // this is an observable
    }
}
