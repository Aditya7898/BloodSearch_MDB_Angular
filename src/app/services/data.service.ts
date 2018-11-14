import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  requestList: any;
  LoggedInUser$: any;
  user: any;
  user$: any;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.user$ = afAuth.authState;
  }

  // IsLoggedIn
  isLoggedIn() {
    return this.afAuth.authState;
  }

  // on search get Users or Data
  GetData(data): Observable<any> {
    console.log(data);
    return this.db
      .list('users', ref => ref.orderByChild('City').equalTo(data.city))
      .valueChanges();
  }

  // request sending
  request(data) {
    return this.db.list('requests').push({
      Pname: data.Pname,
      Pbloodgroup: data.Pbloodgrp,
      Pcity: data.Pcity,
      Pdoctor: data.Pdoctor,
      Address: data.Hospital,
      Cname: data.Cname,
      Ccontact: data.Cphone,
      Cemail: data.Cemail,
      Cdate: data.Cdate
    });
  }

  // Get all requests
  GetAllRequests() {
    return this.db.list('requests', ref => ref.limitToLast(50)).valueChanges();
  }

  // Login
  async Login(data) {
    return await this.afAuth.auth.signInWithEmailAndPassword(
      data.email,
      data.password
    );
  }

  // Register
  Register(data) {
    return this.afAuth.auth.createUserWithEmailAndPassword(
      data.email,
      data.password
    );
  }

  // Get User to update profile
  GetUser(user) {
    return this.db
      .list('users', ref => ref.orderByKey().equalTo(user.uid))
      .valueChanges();
  }

  // save data
  SaveData(userId, data) {
    return this.db.object('/users/' + userId).update({
      Name: data.name,
      BloodGroup: data.bloodgrp,
      Phone: data.phone,
      Email: data.email,
      City: data.city
    });
  }

  // password reset
  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
}
