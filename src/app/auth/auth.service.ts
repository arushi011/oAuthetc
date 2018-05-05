import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
    constructor(private routes : Router) {
        this.fbProvider = new firebase.auth.FacebookAuthProvider();
        this.fbProvider.addScope('user_friends');
        this.fbProvider.setCustomParameters({'display': 'popup'});
        this.gProvider = new firebase.auth.GoogleAuthProvider();
        this.gProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        this.gProvider.setCustomParameters({
            'login_hint': 'user@example.com'
          });
        this.userName = 'Guest';
        this.authType = null;
        this.token = null;
    }
    userNameChanged = new Subject<string>();
    private token: string;
    userName: string;
    private fbProvider: firebase.auth.FacebookAuthProvider;
    private gProvider: firebase.auth.GoogleAuthProvider;
    private authType: string;
    signUpUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(response => {
            console.log(response);
            this.userName = firebase.auth().currentUser.displayName;
            this.authType = 'email'; // remove hardcoding later
            firebase.auth().currentUser.getToken().then((token: string) => {
                this.token = token;
                this.routes.navigate(['../']);
            }).catch(error => {
                console.log(error);
            });
        }) // this is a promise
        .catch(error => console.log(error));
    }
    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            response => {
                console.log(response);
                this.userName = firebase.auth().currentUser.displayName;
                this.authType = 'email'; // remove hardcoding later
                firebase.auth().currentUser.getToken().then(
                    (token: string) => {
                        this.token = token;
                        this.routes.navigate(['../']);
                    }
                ).catch(
                    error => console.log(error)
                );
            }
        )
        .catch(
            error => console.log(error)
        );
    }
    logout() {
        firebase.auth().signOut();
        this.token = null;
        this.userName = 'Guest';
        this.authType = null;
        this.userNameChanged.next(this.userName);
    }
    getToken() {
        firebase.auth().currentUser.getToken() // this is async and thus is a promise
        .then(
            (token: string) => {
                this.token = token;
            }
        ).catch(
            error => console.log(error)
        );
        return this.token; // this is bad because it returns old token, return statement doesnt waits for promise to complete
    }
    isAuthenticated() {
        return this.token != null;
    }

    signInUserFacebook() {
        firebase.auth().signInWithPopup(this.fbProvider).then(response => {
            console.log(response);
            this.userName = firebase.auth().currentUser.displayName;
            this.authType = 'facebook'; // remove hardcoding later
            this.token = response.credential.accessToken;
            this.routes.navigate(['../']);
            // firebase.auth().currentUser.getIdToken().then((token: string) => {
            //     this.token = token;
            // }).catch(error => {
            //     console.log(error);
            // });
        }).catch(error => {
            console.log(error);
        });
    }
    getFacebookToken() {
        return this.token;
    }

    signInUserGoogle() {
        firebase.auth().signInWithPopup(this.gProvider).then(response=> {
            console.log(response);
            this.userName = firebase.auth().currentUser.displayName;
            this.authType = 'google'; // remove hardcoding later
            this.token = response.credential.accessToken;
            this.routes.navigate([ '../']);
        })
    }

}
