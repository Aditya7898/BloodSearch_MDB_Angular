import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
declare const $: any;

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.scss']
})
export class AllRequestsComponent implements OnInit {
  requestList: any[];
  requestUser: any;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.GetAllRequests().subscribe(data => {
      this.requestList = data;
      console.log(this.requestList);
    });
  }

  view(request) {
    this.requestUser = request;
    $('#ViewProfile').modal();
  }
}
