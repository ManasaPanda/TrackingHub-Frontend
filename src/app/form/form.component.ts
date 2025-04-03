import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  identity: string;
  description: string;
  name: string;
  email:string;
  phone:string;
  dob:any;
  gender:any;
  address:any;
  constructor() { }

  ngOnInit(): void {
  }
  onsubmit(){
    alert(`Submit button clicked with value ${this.identity},${this.name},${this.description}`);
    this.identity = ""
    this.name = ""
    this.description = ""
  }
}
