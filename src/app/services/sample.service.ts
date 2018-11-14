import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SampleService {
  constructor() {}
  bloodGroups: any[] = [ 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  cities: any[] = [ 'Indore', 'Bhopal', 'Jabalpur'];
}
