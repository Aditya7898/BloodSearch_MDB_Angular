import { Component, OnInit } from '@angular/core';
import { SampleService } from '../services/sample.service';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  bloodGroups: any[];
  cities: any[];
  user: any;

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
    this.editForm = this.fb.group({
      name: [''],
      email: [''],
      bloodgrp: [''],
      city: [''],
      phone: ['']
    });
  }

  editProfile() {
    console.log(this.editForm.value);
  }
}
