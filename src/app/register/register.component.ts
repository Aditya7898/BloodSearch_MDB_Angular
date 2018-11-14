import { Component, OnInit } from '@angular/core';
import { SampleService } from '../services/sample.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
declare const $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  cities = [];
  bloodGroups = [];
  registerRespError: any;
  registerRespTrue: any;
  registerForm: FormGroup;

  constructor(
    private sampleService: SampleService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private dataService: DataService,
    private router: Router
  ) {
    this.cities = sampleService.cities;
    this.bloodGroups = sampleService.bloodGroups;
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      bloodgrp: ['', [Validators.required]],
      city: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }

  register() {
    this.spinner.show();
    this.dataService.Register(this.registerForm.value).then(
      data => {
        if (data.user) {
          this.dataService
            .SaveData(data.user.uid, this.registerForm.value)
            .then(
              res => {
                this.registerRespTrue = true;
                this.registerForm.reset();
                this.spinner.hide();
                $('#register').modal();
              },
              err => {
                this.registerRespError = err;
                this.spinner.hide();
                $('#register').modal();
              }
            );
        }
      },
      err => {
        this.registerRespError = err;
        this.spinner.hide();
        $('#errorModal').modal();
      }
    );
  }

  GoToHome() {
    this.router.navigate(['/']);
  }
}
