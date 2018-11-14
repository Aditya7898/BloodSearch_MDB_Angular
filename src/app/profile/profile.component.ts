import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SampleService } from '../services/sample.service';
declare const $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  userId: any;
  editForm: FormGroup;
  cities: any;
  bloodGroups: any;

  constructor(
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private sampleService: SampleService
  ) {
    this.cities = sampleService.cities;
    this.bloodGroups = sampleService.bloodGroups;
  }

  ngOnInit() {
    this.spinner.show();
    this.dataService.isLoggedIn().subscribe(user => {
      this.userId = user.uid;
      this.dataService.GetUser(user).subscribe(userData => {
        this.user = userData[0];
        this.spinner.hide();
        this.editForm = this.fb.group({
          name: [this.user.Name],
          email: [this.user.Email],
          bloodgrp: [this.user.BloodGroup],
          city: [this.user.City],
          phone: [this.user.Phone]
        });
        console.log(this.editForm.value);
      });
    });
  }

  editProfile() {
    $('#editProfile').modal();
  }

  update() {
    this.spinner.show();
    setTimeout(() => {
      this.dataService.SaveData(this.userId, this.editForm.value).then(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
          this.spinner.hide();
        }
      );
      this.spinner.hide();
    }, 3500);
  }
}
