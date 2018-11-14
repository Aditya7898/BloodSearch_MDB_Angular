import { Component, OnInit, OnChanges } from '@angular/core';
import { DataService } from '../services/data.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any;
  userData: any;

  constructor(
    private dataService: DataService,
    private router: Router,
    public afAuth: AngularFireAuth,
    private spinner: NgxSpinnerService
  ) {}

  async ngOnInit() {
    await this.dataService.isLoggedIn().subscribe(user => {
      if (user) {
        this.user = user;
        this.dataService.GetUser(user).subscribe(userData => {
          this.userData = userData[0];
          console.log(this.user);
        });
      }
    });
  }

  logout() {
    this.spinner.show();
    this.afAuth.auth.signOut();
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(['/']);
    }, 1500);

    this.checkUser();
  }

  checkUser() {
    console.log('check User');
    this.dataService.isLoggedIn().subscribe(user => {
      this.user = user;
    });
  }
}
