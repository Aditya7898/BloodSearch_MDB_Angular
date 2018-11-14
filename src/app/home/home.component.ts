import { Component, OnInit } from '@angular/core';
import { SampleService } from '../services/sample.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bloodGroups: any[];
  cities: any[];
  searchForm: FormGroup;
  searchResults: any[] = [];
  requestUser: any;

  constructor(
    private sample: SampleService,
    private dataService: DataService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    this.bloodGroups = sample.bloodGroups;
    this.cities = sample.cities;
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.searchForm = this.fb.group({
      bloodgrp: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
  }

  search() {
    this.spinner.show();
    this.dataService.GetData(this.searchForm.value).subscribe(data => {
      this.searchResults = data.filter(
        user => user.BloodGroup === this.searchForm.controls.bloodgrp.value
      );
      console.log(this.searchResults);
      setTimeout(() => {
        this.spinner.hide();
        if (this.searchResults.length <= 0) {
          console.log('called');
          $('#errorModal').modal();
        }
      }, 250);
    });
  }

  view(request) {
    this.requestUser = request;
    $('#ViewProfile').modal();
  }
}
