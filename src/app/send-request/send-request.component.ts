import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { SampleService } from '../services/sample.service';
import { DataService } from '../services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierModule } from 'angular-notifier';
declare const $: any;
@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.scss']
})
export class SendRequestComponent implements OnInit, OnDestroy {
  requestForm: FormGroup;
  bloodGroups: any[] = [];
  cities: any[] = [];
  requestError: any;
  userObs: any;
  user: any;

  constructor(
    private fb: FormBuilder,
    private sampleService: SampleService,
    private dataService: DataService,
    private spinner: NgxSpinnerService
  ) {
    this.cities = this.sampleService.cities;
    this.bloodGroups = this.sampleService.bloodGroups;
  }

  ngOnInit() {
    this.init();
    this.userObs = this.dataService.isLoggedIn().subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
  }

  init() {
    this.requestForm = this.fb.group({
      Pname: ['', [Validators.required]],
      Pbloodgrp: ['', [Validators.required]],
      Pcity: ['', [Validators.required]],
      Pdoctor: ['', [Validators.required]],
      Hospital: ['', [Validators.required]],
      Cname: ['', [Validators.required]],
      Cphone: ['', [Validators.required]],
      Cemail: ['', [Validators.required]],
      Cdate: ['', [Validators.required]]
    });
  }

  request() {
    this.spinner.show();
    this.dataService.request(this.requestForm.value).then(
      res => {
        if (res) {
          setTimeout(() => {
            this.spinner.hide();
            $('#register').modal();
          }, 500);
        }
      },
      err => {
        this.requestError = err;
        setTimeout(() => {
          this.spinner.hide();
          $('#errorModal').modal();
        }, 500);
      }
    );
  }

  ngOnDestroy() {
    console.log('Unsubscribed');
    this.userObs.unsubscribe();
  }
}
