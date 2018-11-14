import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  trueResp: any = false;
  isLogin: any = false;
  respError: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  Login() {
    this.spinner.show();
    this.dataService.Login(this.loginForm.value).then(
      data => {
        if (data) {
          // this.trueResp = true;
          this.isLogin = true;
          this.spinner.hide();
          setTimeout(() => {
            $('#centralModalSuccess').modal();
          }, 800);
        }
      },
      err => {
        this.respError = err;
        this.spinner.hide();
        $('#errorModal').modal();
      }
    );
  }

  GoToHome() {
    this.router.navigate(['/']);
  }

  resetEmail() {
    this.spinner.show();
    this.dataService.resetPassword(this.loginForm.controls.email.value).then(
      res => {
        this.trueResp = true;
        this.spinner.hide();
        setTimeout(() => {
          $('#centralModalSuccess').modal();
        }, 800);
      },
      err => {
        this.respError = err;
        this.spinner.hide();
        $('#errorModal').modal();
      }
    );
  }
}
