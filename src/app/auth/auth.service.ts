import * as firebase from 'firebase';

export class AuthService {
    constructor() {
        this.provider = new firebase.auth.FacebookAuthProvider();
        this.provider.setCustomParameters({'display': 'popup'});
        this.userName = 'Guest';
        this.authType = null;
        this.token = null;
    }
    token: string;
    userName: string;
    provider: firebase.auth.FacebookAuthProvider;
    authType: string;
    signUpUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(response => {
            console.log(response);
            this.userName = firebase.auth().currentUser.displayName;
            this.authType = 'email'; // remove hardcoding later
            firebase.auth().currentUser.getToken().then((token: string) => {
                this.token = token;
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
        firebase.auth().signInWithPopup(this.provider).then(response => {
            console.log(response);
            this.userName = firebase.auth().currentUser.displayName;
            this.authType = 'facebook'; // remove hardcoding later
            firebase.auth().currentUser.getIdToken().then((token: string) => {
                this.token = token;
            }).catch(error => {
                console.log(error);
            });

        }).catch(error => {
            console.log(error);
        });
    }

}
